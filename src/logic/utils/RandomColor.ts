/** A function to generate a random color hex code
 * @returns A random color hex code
 */
export const generateRandomColor = () => {
  // 16777215 is the number that represents #fffffff
  // padStart is just to ensure that hex string always will have 6 digits
  const color =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  return color;
};
