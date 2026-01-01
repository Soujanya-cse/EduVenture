// src/pages/Navbar.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  NavLink: ({ to, children, className }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders logo and nav links", () => {
    render(<Navbar />);
    
    // Check logo
    expect(screen.getByRole("button", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/EduVenture/i)).toBeInTheDocument();

    // Check nav links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test("Learn with AI button calls navigate('/quiz')", () => {
    render(<Navbar />);
    const learnButton = screen.getByText(/Learn with AI/i);
    fireEvent.click(learnButton);
    expect(mockNavigate).toHaveBeenCalledWith("/quiz");
  });

  test("clicking profile icon calls navigate('/dashboard')", () => {
    render(<Navbar />);
    const profileIcon = screen.getByAltText("Profile").closest("div");
    fireEvent.click(profileIcon);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("logo button is rendered and clickable", () => {
    render(<Navbar />);
    const logoButton = screen.getByRole("button", { name: /logo/i });
    expect(logoButton).toBeInTheDocument();
    fireEvent.click(logoButton);
    // No navigation is defined on logo button in current component
  });
});
