import GameDifficulty, {
  GameDifficultyProvider,
} from "@/data/contexts/GameDifficultyContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { useContext } from "react";

const ContextCustomTest = () => {
  const { difficulty, handleSetDifficulty } = useContext(GameDifficulty);

  return (
    <div>
      <div data-testid="difficulty">{difficulty}</div>
      <button
        onClick={() => handleSetDifficulty("Easy")}
        aria-label="game-difficulty"
      >
        Easy
      </button>
    </div>
  );
};

describe("Game difficulty context", () => {
  it("Should render initial value", () => {
    render(
      <GameDifficultyProvider>
        <ContextCustomTest />
      </GameDifficultyProvider>
    );

    expect(screen.getByTestId("difficulty")).not.toHaveTextContent("Easy");
  });

  it("Should set game difficulty", () => {
    render(
      <GameDifficultyProvider>
        <ContextCustomTest />
      </GameDifficultyProvider>
    );
    const gameDifficulty = screen.getByRole("button", {
      name: "game-difficulty",
    });

    fireEvent.click(gameDifficulty);

    expect(screen.getByTestId("difficulty")).toHaveTextContent("Easy");
  });
});
