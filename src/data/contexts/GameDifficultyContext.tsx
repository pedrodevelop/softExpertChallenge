import { createContext, useState } from "react";

export type GameDifficults = "" | "Easy" | "Normal"| "Hard"

interface IGameDifficultyProps {
  difficulty: GameDifficults;
  handleSetDifficulty: (difficulty: GameDifficults) => void;
}

const GameDifficulty = createContext<IGameDifficultyProps>({
  difficulty: "",
  handleSetDifficulty: () => {},
});

// TODO: Add documentation
export const GameDifficultyProvider: React.FC<any> = ({ children }) => {
  const [difficulty, setDifficulty] = useState<GameDifficults>("");

  const handleSetDifficulty = (difficulty: GameDifficults) => {
    setDifficulty(difficulty);
  };

  return (
    <GameDifficulty.Provider
      value={{
        difficulty,
        handleSetDifficulty,
      }}
    >
      {children}
    </GameDifficulty.Provider>
  );
};

export default GameDifficulty;
