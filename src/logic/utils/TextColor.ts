/** A function to change text color based on parent div background color
 * @param bgColor The color in hex format
 * @returns The text color
 */
export const changeTextColor = (bgColor: string) => {
  const color = bgColor.substring(1, 7);
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  //  R*0.299 + G*0.587 + B*0.114 is the formula to convert rgb to gray
  //  186 is the number used as a basis for measuring whether the color
  //  contrast needs a light or dark text color based on middle gray
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
};
