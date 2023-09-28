import { createContext, useContext, useState } from "react";

export type GameDifficults = "" | "Easy" | "Normal"| "Hard"

interface IGameDifficultyProps {
  /** Game difficulty */
  difficulty: GameDifficults;
  /** A function called to set game difficulty */
  handleSetDifficulty: (difficulty: GameDifficults) => void;
}

const GameDifficulty = createContext<IGameDifficultyProps>({
  difficulty: "",
  handleSetDifficulty: () => {},
});

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
