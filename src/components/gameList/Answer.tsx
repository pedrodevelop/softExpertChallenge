import { changeTextColor } from "./../../logic/utils/TextColor";

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
          <div
            className={`ml-1 mr-1 w-2/3 h-12 rounded bg-[${hex}] flex justify-center items-center text-`}
          >
            {hex}
          </div>
          <div className="w-1/3 text-center font-bold">{`✅ ${time}s`}</div>
        </>
      ) : (
        <>
          <div
            className={`ml-1 mr-1 w-1/3 h-12 rounded bg-[${hex}] flex justify-center items-center`}
          >
            #587ec9
          </div>
          <div
            className={`ml-1 mr-2 w-1/3 h-12 rounded bg-[${correctHex}] flex justify-center items-center`}
          >
            #0a1f4b
          </div>
          <div className="w-1/3 text-center font-bold">{`❌ ${time}s`}</div>
        </>
      )}
    </div>
  );
};

export default Answer;
