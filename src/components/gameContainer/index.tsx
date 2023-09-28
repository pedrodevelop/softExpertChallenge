import { useContext } from "react";
import { IGameState } from "./../../data/hooks/useGame";
import GameColorSquare from "./GameColorSquare";
import GameInfo from "./GameInfo";
import AnswerButtons from "./AnswerButtons";
import GameDifficulty, {
  GameDifficults,
} from "@/data/contexts/GameDifficultyContext";

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
  const { difficulty, handleSetDifficulty } = useContext(GameDifficulty);

  const gameDifficults: GameDifficults[] = ["Easy", "Normal", "Hard"];

  return (
    <div
      className={`flex flex-col ${
        difficulty !== "" ? "justify-center" : "mt-16"
      } items-center gap-10 w-9/12`}
    >
      <div
        className={`${
          difficulty !== "" ? "mb-5" : "mb-60"
        } font-bold text-5xl `}
      >
        Guess the color
      </div>
      {difficulty == "" ? (
        <>
          <div className="flex flex-col items-center font-bold text-xl gap-5">
            <p>Choose game difficulty</p>
            <p>↓</p>
          </div>
          <div className="flex gap-5 w-2/6 h-12 ">
            {gameDifficults.map((el) => (
              <button
                key={el}
                onClick={() => handleSetDifficulty(el)}
                className="w-1/3 h-full border-2
               hover:bg-gray-100 border-[#5e676f] rounded-md
            "
              >
                {el}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
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
          <div className="flex justify-center w-full h-12 font-semibold">
            {state.hasGameStarted &&
              state.options.map((el) => (
                <AnswerButtons
                  key={el}
                  color={el}
                  className={`first:rounded-l-md last:rounded-r-md last:border-r-2 ${
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
        </>
      )}
    </div>
  );
};

export default GameContainer;
