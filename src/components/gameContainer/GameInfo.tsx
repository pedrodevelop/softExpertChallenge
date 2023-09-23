interface IGameInfoProps {
  /** The game remaining time */
  time: number;
  /** The user's highscore */
  highScore: number;
  /** The user's current score */
  score: number;
  /** A function called when the game is finished,
   *  or to restart the game */
  handleStopGame: () => void;
}

const GameInfo: React.FC<IGameInfoProps> = ({
  time,
  highScore,
  score,
  handleStopGame,
}) => {
  return (
    <div className="flex flex-row w-2/6">
      <div
        className="flex flex-col items-center justify-center w-2/5 h-24 rounded-l
   border-2 border-[#99a1ab] bg-[#e5e9f0] text-sm font-extrabold"
      >
        <p>REMAINING TIME (s)</p>
        <p className="my-1 text-2xl">{time}</p>
      </div>
      <button
        onClick={handleStopGame}
        className="flex items-center justify-center w-1/5 h-24 border-y-2
  border-[#99a1ab] bg-[#aab1ba] text-xs text-white"
      >
        <p>RESTART</p>
      </button>
      <div
        className="flex flex-col w-2/5 h-24 rounded-r border-2
  border-[#99a1ab] bg-[#e5e9f0] text-sm font-extrabold"
      >
        <div
          className="flex items-center justify-between h-1/2 border-b-2
  border-[#99a1ab]"
        >
          <p className="mx-5">HIGH SCORE</p>
          <p className="mx-5 text-2xl">{highScore}</p>
        </div>
        <div className="flex items-center justify-between h-1/2">
          <p className="mx-5">SCORE</p>
          <p className="mx-5 text-2xl">{score}</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
