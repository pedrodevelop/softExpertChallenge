interface IGameColorSquareProps {
  /** The progress bar percentage */
  progressBarPercentage: number;
  /** The current progress bar time */
  progressBarTime: number;
  /** The current square's color */
  currentColor: string | undefined;
  /** A boolean to check if the game was started */
  hasGameStarted: boolean;
  /** A function to start the game */
  handleStartGame: () => void;
}

const GameColorSquare: React.FC<IGameColorSquareProps> = ({
  progressBarPercentage,
  progressBarTime,
  currentColor,
  hasGameStarted,
  handleStartGame,
}) => {
  return (
    <div className="flex flex-col w-2/6 h-1/2">
      <div className="h-3 w-full rounded-t bg-gray-300 ">
        <div
          style={{ width: `${progressBarPercentage}%` }}
          className={`h-full rounded-tl ${
            progressBarTime == 10 && "rounded-t"
          } ${
            progressBarTime > 6
              ? "bg-green-500"
              : progressBarTime < 4
              ? "bg-red-600"
              : "bg-yellow-300"
          }`}
        />
      </div>
      <div
        style={{
          backgroundColor: `${currentColor}`,
        }}
        className={`flex items-center justify-center h-full w-full rounded-b`}
      >
        {!hasGameStarted && (
          <div className="flex items-center justify-center h-full w-full rounded-b bg-white/25">
            <button
              onClick={handleStartGame}
              className="flex items-center justify-center w-2/5 h-12
              rounded bg-[#48525c] text-lg text-white"
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
