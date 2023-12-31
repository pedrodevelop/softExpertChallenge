import { useContext } from "react";
import GameList from "@/components/gameList";
import GameContainer from "./gameContainer";
import useGame from "@/data/hooks/useGame";
import GameDifficulty from "@/data/contexts/GameDifficultyContext";

const Layout: React.FC = () => {
  const {
    state,
    countDownTime,
    progressBarTime,
    handleCheckAnswer,
    handleStartGame,
    handleRestartGame,
    handleResetGameData,
  } = useGame();

  const { difficulty, handleSetDifficulty } = useContext(GameDifficulty);

  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <GameList state={state} />
      <GameContainer
        state={state}
        countDownTime={countDownTime}
        progressBarTime={progressBarTime}
        handleCheckAnswer={handleCheckAnswer}
        handleStartGame={handleStartGame}
        handleRestartGame={handleRestartGame}
      />
      <div className="w-1/12 mt-auto mb-10">
        {difficulty != "" && (
          <>
            <button
              className="w-fit underline"
              disabled={state.hasGameStarted || state.answers.length == 0}
              onClick={handleResetGameData}
            >
              Reset all data
            </button>
            <button
              className="w-fit underline"
              disabled={state.hasGameStarted}
              onClick={() => handleSetDifficulty("")}
            >
              Choose difficulty
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
