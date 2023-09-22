import ColorCard from "./ColorCard";

interface IAnswerProps {
  /** A bolean to distinguish correct and incorrect answers */
  isCorrect: boolean;
  /** The correct color that was guessed */
  hex: string;
  /** The correct color that should be guessed */
  correctHex?: string;
  /** Time (seconds) the user took to respond */
  time: number;
}

const Answer: React.FC<IAnswerProps> = ({
  isCorrect,
  hex,
  correctHex,
  time,
}) => {
  return (
    <div className="w-full h-20 flex items-center odd:bg-gray-300">
      {isCorrect ? (
        <>
          <ColorCard className="ml-1 mr-1 w-2/3" backgroundColor={hex} />
          <div className="w-1/3 text-center font-bold">{`✅ ${time}s`}</div>
        </>
      ) : (
        <>
          <ColorCard className="ml-1 mr-1 w-1/3" backgroundColor={hex} />
          <ColorCard
            className="ml-1 mr-2 w-1/3"
            backgroundColor={correctHex!}
          />
          <div className="w-1/3 text-center font-bold">{`❌ ${time}s`}</div>
        </>
      )}
    </div>
  );
};

export default Answer;
