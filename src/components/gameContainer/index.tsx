import useGame from "./../../data/hooks/useGame";
import GameColorSquare from "./GameColorSquare";
import GameInfo from "./GameInfo";
import AnswerButtons from "./AnswerButtons";

const GameContainer: React.FC = () => {
  const {
    time,
    score,
    highScore,
    hasGameStarted,
    progressBarTime,
    currentColor,
    options,
    handleStartGame,
    handleStopGame,
  } = useGame();

  const progressBarPercentage = progressBarTime * 10;

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-9/12">
      <div className="font-bold text-5xl mb-5">Guess the color</div>
      <GameInfo
        time={time}
        highScore={highScore}
        score={score}
        handleStopGame={handleStopGame}
      />
      <GameColorSquare
        currentColor={currentColor}
        hasGameStarted={hasGameStarted}
        progressBarPercentage={progressBarPercentage}
        progressBarTime={progressBarTime}
        handleStartGame={handleStartGame}
      />
      {/* Question answers */}
      {/* Para a borda colorica colocar verificação usando hasgamestarted e isplaying */}
      <div className="w-2/6 h-12 font-semibold">
        {options.map((el) => (
          <AnswerButtons
            key={el}
            color={el}
            className="first:rounded-l-md first:border-x-2 last:rounded-r-md last:border-x-2"
            sendAnswer={(color) => console.log(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameContainer;
