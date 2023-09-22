import Answer from "./Answer";

const answers = [
  { id: 1, correct: true, hex: "#9170c6", time: 5 },
  { id: 2, correct: false, hex: "#587ec9", correctHex: "#0a1f4b", time: 1 },
  { id: 3, correct: true, hex: "#8ad06d", time: 2 },
];

const GameList: React.FC = () => {
  return (
    <div className="w-2/12 bg-gameListBackground break-words overflow-y-scroll">
      <div className="text-center text-xl font-black my-5">
        Current/Latest game
      </div>
      <div className="flex flex-row items-center border-y-2 border-gray-300">
        <div className="text-center font-bold p-1 w-1/3 border-r-2 border-gray-300">
          Guessed color
        </div>
        <div className="text-center font-bold p-1 w-1/3 border-r-2 border-gray-300">
          Correct color
        </div>
        <div className="text-center font-bold p-1 w-1/3">Score</div>
      </div>
      {answers.map((e) => (
        <Answer
          key={e.id}
          isCorrect={e.correct}
          hex={e.hex}
          correctHex={e.correctHex}
          time={e.time}
        />
      ))}
    </div>
  );
};

export default GameList;
