// src/pages/GameSelection.test.js
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import GameSelection from "./GameSelection";

// Mock Navbar
jest.mock("./Navbar", () => () => <div data-testid="navbar">Mock Navbar</div>);

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ to, children }) => <div data-testid={`link-${to}`}>{children}</div>,
}));

describe("GameSelection Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders Navbar and header", () => {
    render(<GameSelection />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Hello! Welcome back")).toBeInTheDocument();
    expect(screen.getByText("Build your foundation in logic and observation while enjoying games.")).toBeInTheDocument();
  });

  test("clicking back button calls navigate(-1)", () => {
    render(<GameSelection />);
    const backButton = screen.getByText("←");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("renders background div with blur style", () => {
    const { container } = render(<GameSelection />);
    const backgroundDiv = container.querySelector('div[style*="blur(2px)"]');
    expect(backgroundDiv).toBeInTheDocument();
    expect(backgroundDiv).toHaveStyle({
      filter: "blur(2px)",
      opacity: "0.4",
    });
  });

  test("renders all game cards with correct info", () => {
    render(<GameSelection />);

    const games = [
      {
        title: "Family Tree",
        description: "Sharpen your logic and master the art of quick decisions. -description for family tree",
        status: "Level Completed",
      },
      {
        title: "Sequence Maze",
        description: "Solve puzzles to unlock the correct path through the maze.",
        status: "Continue Learning",
      },
      {
        title: "Jigsaw Intelligence",
        description: "Assemble the pieces to uncover the bigger picture.",
        status: "Start Learning",
      },
    ];

    const cardLinks = screen.getAllByTestId(/link-/);

    expect(cardLinks).toHaveLength(games.length);

    cardLinks.forEach((link, index) => {
      const game = games[index];
      const card = link;
      expect(within(card).getByText(game.title)).toBeInTheDocument();
      expect(within(card).getByText(game.description)).toBeInTheDocument();
      expect(within(card).getByText(game.status)).toBeInTheDocument();
    });
  });
});
