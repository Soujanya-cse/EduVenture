// src/pages/CategoryPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoryPage from "./CategoryPage";

// ✅ Mock Navbar so we don’t test it here
jest.mock("./Navbar", () => () => <div data-testid="navbar">Mock Navbar</div>);

// ✅ Mock useNavigate once at the top
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CategoryPage Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders heading and Navbar", () => {
    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>
    );

    // Navbar should render
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // Heading should render
    expect(screen.getByText("Available Concepts")).toBeInTheDocument();

    // Initial concepts should render
    const concepts = [
      "Blood Relation and coding decoding",
      "Distance and Velocity",
      "Time and Speed",
      "Profit and Loss",
      "Geometry",
      "Statistics",
    ];

    concepts.forEach((concept) => {
      expect(screen.getByText(concept)).toBeInTheDocument();
    });
  });

  test("clicking concept calls navigate", () => {
    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>
    );

    const conceptItem = screen.getByText("Ratios and Percentage");
    fireEvent.click(conceptItem);

    expect(mockNavigate).toHaveBeenCalledWith("/mode", {
      state: { concept: "Ratios and Percentage" },
    });
  });

  test("shows extra concepts when clicking More button", () => {
    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>
    );

    const moreBtn = screen.getByRole("button", { name: /more/i });

    // Extra concept should not exist initially
    expect(screen.queryByText("Physics")).not.toBeInTheDocument();

    // Click "More"
    fireEvent.click(moreBtn);
    expect(screen.getByText("Physics")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show less/i })).toBeInTheDocument();

    // Click "Show Less"
    fireEvent.click(screen.getByRole("button", { name: /show less/i }));
    expect(screen.queryByText("Physics")).not.toBeInTheDocument();
  });
});
