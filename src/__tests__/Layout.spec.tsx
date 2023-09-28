import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../components/Layout";
import { GameDifficultyProvider } from "@/data/contexts/GameDifficultyContext";

describe("Layout", () => {
  it("Should app layout first render be correct", () => {
    render(<Layout />);

    expect(screen.getByText("Current/Latest game")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();

    expect(screen.queryByText("Guessed color")).not.toBeInTheDocument();
    expect(screen.queryByTestId("answers-list")).not.toContainHTML(
      '<div className="w-full h-20 flex items-center odd:bg-gray-300"></div>'
    );
    expect(screen.queryByTestId("reset-data")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Choose difficulty")).not.toBeInTheDocument();
  });

  it("Should render game container and game options after choose a difficulty", async () => {
    render(
      <GameDifficultyProvider>
        <Layout />
      </GameDifficultyProvider>
    );

    expect(screen.getByText("Easy")).toBeInTheDocument();
    const difficultyButton = screen.getByText("Easy");

    fireEvent.click(difficultyButton);

    const resetDataButton = screen.getByText("Reset all data");
    const chooseDifficultyButton = screen.getByText("Choose difficulty");

    expect(resetDataButton).toBeInTheDocument();
    expect(resetDataButton).toHaveProperty("disabled", true);
    expect(chooseDifficultyButton).toBeInTheDocument();
    expect(chooseDifficultyButton).toHaveProperty("disabled", false);
  });
});
