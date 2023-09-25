import { changeTextColor } from "@/logic/utils/TextColor";

interface IColorCardProps {
  /** Additional styles that can be inserted */
  className: string;
  /** The card background color */
  backgroundColor: string;
}

const ColorCard: React.FC<IColorCardProps> = ({
  className,
  backgroundColor,
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        color: changeTextColor(backgroundColor!),
      }}
      className={`h-12 rounded flex justify-center items-center sm:text-xs lg:text-base ${className}`}
    >
      {backgroundColor}
    </div>
  );
};

export default ColorCard;
