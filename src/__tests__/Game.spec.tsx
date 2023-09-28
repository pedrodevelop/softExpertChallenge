import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../components/Layout";
import { GameDifficultyProvider } from "@/data/contexts/GameDifficultyContext";

describe("Game", () => {
  it("Should start game", () => {
    render(
      <GameDifficultyProvider>
        <Layout />
      </GameDifficultyProvider>
    );

    expect(screen.getByText("Easy")).toBeInTheDocument();
    const difficultyButton = screen.getByText("Easy");

    fireEvent.click(difficultyButton);

    expect(screen.getByText("REMAINING TIME (s)")).toBeInTheDocument();
    expect(screen.getByText("HIGH SCORE")).toBeInTheDocument();

    expect(screen.getByText("START")).toBeInTheDocument();
    const startButton = screen.getByText("START");

    fireEvent.click(startButton);

    const resetDataButton = screen.getByText("Reset all data");
    const chooseDifficultyButton = screen.getByText("Choose difficulty");

    expect(resetDataButton).toHaveProperty("disabled", true);
    expect(chooseDifficultyButton).toHaveProperty("disabled", true);
    expect(screen.getByTestId("answers-buttons")).toBeInTheDocument();

    const firstButton = screen.getByTestId("answers-buttons").children[0];
    fireEvent.click(firstButton);

    expect(screen.getByTestId("answers-list")).toBeInTheDocument();
    const gameList = screen.getByTestId("answers-list");

    expect(gameList.children.length).toBeGreaterThanOrEqual(1);
  });

  it("Should come back to game difficulty", () => {
    render(
      <GameDifficultyProvider>
        <Layout />
      </GameDifficultyProvider>
    );

    expect(screen.getByText("Easy")).toBeInTheDocument();
    const difficultyButton = screen.getByText("Easy");

    fireEvent.click(difficultyButton);

    expect(screen.getByText("REMAINING TIME (s)")).toBeInTheDocument();
    expect(screen.getByText("HIGH SCORE")).toBeInTheDocument();

    expect(screen.getByText("START")).toBeInTheDocument();

    const chooseDifficultyButton = screen.getByText("Choose difficulty");

    expect(chooseDifficultyButton).toBeInTheDocument();
    expect(chooseDifficultyButton).toHaveProperty("disabled", false);

    fireEvent.click(chooseDifficultyButton);

    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();

    expect(screen.queryByTestId("answers-list")).not.toContainHTML(
      '<div className="w-full h-20 flex items-center odd:bg-gray-300"></div>'
    );
    expect(screen.queryByTestId("Choose difficulty")).not.toBeInTheDocument();
  });
});
