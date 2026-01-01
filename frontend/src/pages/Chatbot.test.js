import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Chatbot from "./Chatbot"; // adjust path if your file is elsewhere

// Mock fetch globally for API calls
global.fetch = jest.fn();

describe("Chatbot Component", () => {
  // Clear mock before each test
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders chatbot button initially", () => {
    render(<Chatbot />);
    const button = screen.getByAltText("Cookoo Bot");
    expect(button).toBeInTheDocument();
  });

  test("opens chatbot panel when button is clicked", () => {
    render(<Chatbot />);
    const button = screen.getByAltText("Cookoo Bot");
    fireEvent.click(button);

    // Check header and input
    expect(screen.getByText("Cookoo Bot")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
  });

  test("closes chatbot panel when close button is clicked", () => {
    render(<Chatbot />);
    fireEvent.click(screen.getByAltText("Cookoo Bot"));

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Cookoo Bot")).not.toBeInTheDocument();
  });

  test("shows initial bot message", () => {
    render(<Chatbot />);
    fireEvent.click(screen.getByAltText("Cookoo Bot"));

    expect(screen.getByText("Hello there! Ready to practice together?")).toBeInTheDocument();
  });

  test("user can type message and send", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ reply: "Hello, user!" }),
    });

    render(<Chatbot />);
    fireEvent.click(screen.getByAltText("Cookoo Bot"));

    const input = screen.getByPlaceholderText("Ask me anything...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "Hi Bot" } });
    expect(input.value).toBe("Hi Bot");

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Hello, user!")).toBeInTheDocument();
    });

    // Input should be cleared
    expect(input.value).toBe("");
  });

  test("shows typing indicator while waiting for response", async () => {
    let resolveFetch;
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    render(<Chatbot />);
    fireEvent.click(screen.getByAltText("Cookoo Bot"));

    const input = screen.getByPlaceholderText("Ask me anything...");
    fireEvent.change(input, { target: { value: "Hi Bot" } });

    fireEvent.click(screen.getByText("Send"));

    // Typing indicator appears
    expect(screen.getByText("Typing...")).toBeInTheDocument();

    // Resolve fetch
    resolveFetch({
      json: async () => ({ reply: "Done typing!" }),
    });

    await waitFor(() => {
      expect(screen.getByText("Done typing!")).toBeInTheDocument();
      expect(screen.queryByText("Typing...")).not.toBeInTheDocument();
    });
  });

  test("shows error message if fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("API error"));

    render(<Chatbot />);
    fireEvent.click(screen.getByAltText("Cookoo Bot"));

    const input = screen.getByPlaceholderText("Ask me anything...");
    fireEvent.change(input, { target: { value: "Hi Bot" } });

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(screen.getByText("⚠ Error: Unable to fetch answer.")).toBeInTheDocument();
    });
  });
});
