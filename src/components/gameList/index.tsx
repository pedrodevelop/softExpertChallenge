import React, { useContext } from "react";
import { IGameState } from "@/data/hooks/useGame";
import Answer from "./Answer";
import GameDifficulty from "@/data/contexts/GameDifficultyContext";

interface IGameListProps {
  state: IGameState;
}

const GameList: React.FC<IGameListProps> = ({ state }) => {
  const { difficulty } = useContext(GameDifficulty);

  return (
    <div className="w-2/12 bg-gameListBackground break-words overflow-y-scroll">
      <div className="text-center text-xl font-black my-5">
        Current/Latest game
      </div>
      {(state.answers.length > 0 || state.hasGameStarted) &&
        difficulty !== "" && (
          <div className="flex flex-row items-center border-y-2 border-gray-300">
            <div className="text-center font-bold p-1 w-1/3 border-r-2 border-gray-300">
              Guessed color
            </div>
            <div className="text-center font-bold p-1 w-1/3 border-r-2 border-gray-300">
              Correct color
            </div>
            <div className="text-center font-bold p-1 w-1/3">Score</div>
          </div>
        )}
      <div className="flex flex-col-reverse">
        {difficulty !== "" &&
          state.answers.map((e) => (
            <Answer
              key={e.id}
              correctHex={e.correctHex}
              hex={e.hex}
              isCorrect={e.correct}
              time={e.time}
            />
          ))}
      </div>
    </div>
  );
};

export default GameList;
