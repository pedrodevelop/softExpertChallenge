import ColorCard from "./ColorCard";

interface IAnswerProps {
  /** The correct color that should be guessed */
  correctHex?: string;
  /** The correct color that was guessed */
  hex: string;
  /** A bolean to distinguish correct and incorrect answers */
  isCorrect: boolean;
  /** Time (seconds) the user took to respond */
  time: number;
}

const Answer: React.FC<IAnswerProps> = ({
  correctHex,
  hex,
  isCorrect,
  time,
}) => {
  return (
    <div className="w-full h-20 flex items-center odd:bg-gray-300">
      {isCorrect ? (
        <>
          <ColorCard backgroundColor={hex} className="ml-1 mr-1 w-2/3" />
          <div className="w-1/3 text-center font-bold">{`✅ ${time}s`}</div>
        </>
      ) : (
        <>
          <ColorCard backgroundColor={hex} className="ml-1 mr-1 w-1/3" />
          <ColorCard
            backgroundColor={correctHex!}
            className="ml-1 mr-2 w-1/3"
          />
          <div className="w-1/3 text-center font-bold">{`❌ ${time}s`}</div>
        </>
      )}
    </div>
  );
};

export default Answer;
