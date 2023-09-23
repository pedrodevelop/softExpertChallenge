interface IAnswerButtonsProps {
  color: string;
  className: string;
  sendAnswer: (color: string) => void;
}

const AnswerButtons: React.FC<IAnswerButtonsProps> = ({
  color,
  className,
  sendAnswer,
}) => {
  return (
    <>
      <button
        onClick={() => sendAnswer(color)}
        className={`w-1/3 h-full border-y-2 border-[#5e676f] hover:bg-gray-100 ${className}`}
      >
        {color}
      </button>
    </>
  );
};

export default AnswerButtons;
