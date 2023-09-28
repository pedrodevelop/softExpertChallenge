import { IGameState } from "./../../data/hooks/useGame";
import GameColorSquare from "./GameColorSquare";
import GameInfo from "./GameInfo";
import AnswerButtons from "./AnswerButtons";

interface IGameContainerProps {
  state: IGameState;
  countDownTime: number;
  progressBarTime: number;
  handleCheckAnswer: (answer: string) => void;
  handleStartGame: () => void;
  handleRestartGame: () => void;
}

const GameContainer: React.FC<IGameContainerProps> = ({
  state,
  countDownTime,
  progressBarTime,
  handleCheckAnswer,
  handleStartGame,
  handleRestartGame,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-9/12">
      <div className="font-bold text-5xl mb-5">Guess the color</div>
      {/* Game info with remaining time, and score/highscore */}
      <GameInfo
        handleRestartGame={handleRestartGame}
        hasGameStarted={state.hasGameStarted}
        highScore={state.highScore}
        score={state.score}
        time={countDownTime}
      />
      {/* Game color square with the round's color and the time progress bar */}
      <GameColorSquare
        currentColor={state.currentColor}
        handleStartGame={handleStartGame}
        hasGameStarted={state.hasGameStarted}
        isLastRound={state.isLastRound}
        lastRoundTimeRemaining={state.lastRoundTimeRemaining}
        progressBarTime={progressBarTime}
      />
      {/* Round's answers options */}
      <div className="w-2/6 h-12 font-semibold">
        {state.hasGameStarted &&
          state.options.map((el) => (
            <AnswerButtons
              key={el}
              color={el}
              className={`first:rounded-l-md first:border-x-2 last:rounded-r-md last:border-x-2 ${
                !state.isPlaying
                  ? el == state.currentColor
                    ? "bg-green-500 border-green-600 text-white"
                    : "bg-red-500 border-red-600 text-white"
                  : "border-[#5e676f]"
              }`}
              isPlaying={state.isPlaying}
              sendAnswer={() => {
                handleCheckAnswer(el);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default GameContainer;
