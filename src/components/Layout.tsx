import GameList from "@/components/gameList";
import GameContainer from "./gameContainer";
import useGame from "@/data/hooks/useGame";

const Layout: React.FC = () => {
  const {
    state,
    progressBarTime,
    handleCheckAnswer,
    handleStartGame,
    handleStopGame,
  } = useGame();

  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <GameList state={state} />
      <GameContainer
        state={state}
        progressBarTime={progressBarTime}
        handleCheckAnswer={handleCheckAnswer}
        handleStartGame={handleStartGame}
        handleStopGame={handleStopGame}
      />
      <div className="w-1/12 mt-auto mb-10">
        <p className="w-fit underline cursor-pointer">Reset all data</p>
      </div>
    </div>
  );
};

export default Layout;
