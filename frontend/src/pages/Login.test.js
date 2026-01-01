// src/pages/Login.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");

// Mock window.location.assign
delete window.location;
window.location = { assign: jest.fn() };

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders login form with all inputs and buttons", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("updates email and password fields on user input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login and saves data in localStorage", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        jwtToken: "fake-token",
        name: "John Doe",
        email: "john@example.com",
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
      const user = JSON.parse(localStorage.getItem("user"));
      expect(user).toEqual({ name: "John Doe", email: "john@example.com" });

      expect(window.location.assign).toHaveBeenCalledWith("/");
    });
  });

  test("displays error message when login fails", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: "Invalid credentials" },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    const errorMessage = await screen.findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
