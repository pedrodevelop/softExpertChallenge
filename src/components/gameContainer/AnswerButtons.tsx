interface IAnswerButtonsProps {
  /** The color option */
  color: string;
  /** Additional styles that can be inserted */
  className: string;
  /** A boolean to check if the user is in a round or not. */
  isPlaying: boolean;
  /** A function called to send a response
   * based on the button clicked */
  sendAnswer: () => void;
}

const AnswerButtons: React.FC<IAnswerButtonsProps> = ({
  className,
  color,
  isPlaying,
  sendAnswer,
}) => {
  return (
    <>
      <button
        disabled={!isPlaying}
        onClick={() => sendAnswer()}
        className={`w-32 h-full border-l-2 border-y-2 ${
          isPlaying && "hover:bg-gray-100"
        } ${className}`}
      >
        {color}
      </button>
    </>
  );
};

export default AnswerButtons;
