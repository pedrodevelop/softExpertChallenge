interface IGameColorSquareProps {
  /** The current round's color */
  currentColor: string | undefined;
  /** A boolean to check if the game was started */
  hasGameStarted: boolean;
  /** Indicates that it's the last round of the game */
  isLastRound: boolean;
  /** Indicates the time remaining in last round */
  lastRoundTimeRemaining: number | null;
  /** The current progress bar time */
  progressBarTime: number;
  /** The game remaining time */
  time: number;
  /** A function to start the game */
  handleStartGame: () => void;
}

const GameColorSquare: React.FC<IGameColorSquareProps> = ({
  currentColor,
  hasGameStarted,
  isLastRound,
  lastRoundTimeRemaining,
  progressBarTime,
  time,
  handleStartGame,
}) => {
  // If the game counter is at 10 seconds or more,
  // simply multiply the remaining time on the progress
  // bar by 10 to get the percentage, otherwise the percentage
  // is found by: x = (N*100)/N2, where N is the current second
  // and N2 is the time that represents 100%.
  const progressBarPercentage = !isLastRound
    ? progressBarTime * 10
    : (time * 100) / lastRoundTimeRemaining;

  return (
    <div className="flex flex-col w-2/6 h-1/2">
      <div className="h-3 w-full rounded-t bg-gray-300 ">
        <div
          className={`h-full rounded-tl ${
            progressBarPercentage == 100 && "rounded-t"
          } ${
            progressBarPercentage > 60
              ? "bg-green-500"
              : progressBarPercentage < 40
              ? "bg-red-600"
              : "bg-yellow-300"
          }`}
          style={{ width: `${progressBarPercentage}%` }}
        />
      </div>
      <div
        className={`flex items-center justify-center h-full w-full rounded-b`}
        style={{
          backgroundColor: currentColor,
        }}
      >
        {!hasGameStarted && (
          <div className="flex items-center justify-center h-full w-full rounded-b bg-white/25">
            <button
              className="flex items-center justify-center w-2/5 h-12
              rounded bg-[#48525c] text-lg text-white"
              onClick={() => {
                handleStartGame();
              }}
            >
              <p>START</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameColorSquare;
