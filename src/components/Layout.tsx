import GameList from "@/components/gameList";
import GameContainer from "./gameContainer";
import useGame from "@/data/hooks/useGame";

const Layout: React.FC = () => {
  const {
    state,
    progressBarTime,
    handleCheckAnswer,
    handleStartGame,
    handleRestartGame,
    handleResetGameData,
  } = useGame();

  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <GameList state={state} />
      <GameContainer
        state={state}
        progressBarTime={progressBarTime}
        handleCheckAnswer={handleCheckAnswer}
        handleStartGame={handleStartGame}
        handleRestartGame={handleRestartGame}
      />
      <div className="w-1/12 mt-auto mb-10">
        <button
          className="w-fit underline"
          disabled={state.hasGameStarted || state.answers.length == 0}
          onClick={handleResetGameData}
        >
          Reset all data
        </button>
      </div>
    </div>
  );
};

export default Layout;
