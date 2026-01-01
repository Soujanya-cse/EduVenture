// HomePage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Mock localStorage
const mockLocalStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  },
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock Navbar
jest.mock("./Navbar", () => () => <div data-testid="navbar">Navbar</div>);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("HomePage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    mockNavigate.mockClear();
  });

  const renderHomePage = () => {
    return render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  };

  test("renders hero section and feature cards", () => {
    renderHomePage();

    expect(screen.getByText(/Welcome to EduVenture!/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering learning through gamification/i)).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Why to Choose EduVenture?")).toBeInTheDocument();

    // Check all feature titles
    expect(screen.getByText("Interactive Games")).toBeInTheDocument();
    expect(screen.getByText("Quick Glance")).toBeInTheDocument();
    expect(screen.getByText("Company Prep")).toBeInTheDocument();
    expect(screen.getByText("Learn with AI")).toBeInTheDocument();
  });

  test("shows 'Get Started' when not logged in", () => {
    renderHomePage();
    expect(screen.getByRole("button", { name: "▶ Get Started" })).toBeInTheDocument();
  });

  test("shows 'Play' when logged in", () => {
    mockLocalStorage.setItem("isLoggedIn", "true");
    renderHomePage();
    expect(screen.getByRole("button", { name: "▶ Play" })).toBeInTheDocument();
  });

  test("navigates to /login when not logged in and button clicked", () => {
    renderHomePage();
    fireEvent.click(screen.getByRole("button", { name: "▶ Get Started" }));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("navigates to /category when logged in and button clicked", () => {
    mockLocalStorage.setItem("isLoggedIn", "true");
    renderHomePage();
    fireEvent.click(screen.getByRole("button", { name: "▶ Play" }));
    expect(mockNavigate).toHaveBeenCalledWith("/category");
  });

  test("navigates to /aptitude when Quick Glance card is clicked", () => {
    renderHomePage();
    const card = screen.getByText("Quick Glance").closest(".feature-card");
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith("/aptitude");
  });

  test("navigates to /company when Company Prep card is clicked", () => {
    renderHomePage();
    const card = screen.getByText("Company Prep").closest(".feature-card");
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith("/company");
  });

  test("navigates to /quiz when Learn with AI card is clicked", () => {
    renderHomePage();
    const card = screen.getByText("Learn with AI").closest(".feature-card");
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith("/quiz");
  });
});