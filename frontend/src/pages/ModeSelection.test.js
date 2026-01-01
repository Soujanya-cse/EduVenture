// src/pages/ModeSelection.test.js
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ModeSelection from "./ModeSelection";

// Mock Navbar
jest.mock("./Navbar", () => () => <div data-testid="navbar">Mock Navbar</div>);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ModeSelection Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    render(
      <MemoryRouter>
        <ModeSelection />
      </MemoryRouter>
    );
  });

  test("renders Navbar and heading", () => {
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(
      screen.getByText(/Start Learning with EduVenture, Pick a Mode and Begin!/i)
    ).toBeInTheDocument();
  });

  test("clicking back button navigates to /category", () => {
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/category");
  });

  test("clicking easy mode start button navigates to /gameselection", () => {
    const easyCard = screen.getByText("Easy").closest(".mode-card");
    const easyButton = within(easyCard).getByRole("button", { name: /start now/i });
    fireEvent.click(easyButton);
    expect(mockNavigate).toHaveBeenCalledWith("/gameselection");
  });

  test("medium and hard mode buttons are disabled", () => {
    const mediumCard = screen.getByText("Medium").closest(".mode-card");
    const hardCard = screen.getByText("Hard").closest(".mode-card");

    const mediumButton = within(mediumCard).getByRole("button", { name: /start now/i });
    const hardButton = within(hardCard).getByRole("button", { name: /start now/i });

    expect(mediumButton).toBeDisabled();
    expect(hardButton).toBeDisabled();
  });

  test("background div with blur style exists", () => {
    const bgDiv = document.querySelector(".mode-selection-container > div");
    expect(bgDiv).toHaveStyle("filter: blur(2px)");
    expect(bgDiv).toHaveStyle("opacity: 0.4");
  });
});
