interface IGameInfoProps {
  /** A boolean to check if the game has started */
  hasGameStarted: boolean;
  /** The user's highscore */
  highScore: number;
  /** The user's current score */
  score: number;
  /** The game remaining time */
  time: number;
  /** A function called to restart the game */
  handleRestartGame: () => void;
}

const GameInfo: React.FC<IGameInfoProps> = ({
  hasGameStarted,
  highScore,
  score,
  time,
  handleRestartGame,
}) => {
  return (
    <div className="flex flex-row w-2/6">
      <div
        className="flex flex-col items-center justify-center w-2/5 h-24 rounded-l
        border-2 border-[#99a1ab] bg-[#e5e9f0] lg:text-sm font-extrabold sm:text-xs"
      >
        <p>REMAINING TIME (s)</p>
        <p className="my-1 lg:text-2xl sm:text-lg">{time}</p>
      </div>
      <button
        className={`flex items-center justify-center w-1/5 h-24 border-y-2 border-[#99a1ab]
                    text-xs ${!hasGameStarted ? "bg-[#d2d7df] text-[#e2e6ec]": "bg-[#aab1ba] text-white"}
                  `}
        disabled={!hasGameStarted}
        onClick={handleRestartGame}
      >
        <p>RESTART</p>
      </button>
      <div
        className="flex flex-col w-2/5 h-24 rounded-r border-2
      border-[#99a1ab] bg-[#e5e9f0] text-sm font-extrabold"
      >
        <div
          className="flex items-center justify-between h-1/2 border-b-2
        border-[#99a1ab] p-3"
        >
          <p className="sm:text-xs lg:text-base">HIGH SCORE</p>
          <p className="sm:text-lg lg:text-2xl">{highScore}</p>
        </div>
        <div className="flex items-center justify-between h-1/2 p-3">
          <p className="sm:text-xs lg:text-base">SCORE</p>
          <p className="sm:text-lg lg:text-2xl">{score}</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
