import { changeTextColor } from "@/logic/utils/TextColor";

interface IColorCardProps {
  /** The card background color */
  backgroundColor: string;
  /** Additional styles that can be inserted */
  className: string;
}

const ColorCard: React.FC<IColorCardProps> = ({
  backgroundColor,
  className,
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        color: changeTextColor(backgroundColor!),
      }}
      className={`h-12 rounded flex justify-center items-center ${className}`}
    >
      {backgroundColor}
    </div>
  );
};

export default ColorCard;
