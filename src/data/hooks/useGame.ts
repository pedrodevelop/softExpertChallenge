import { generateRandomColor } from "@/logic/utils/RandomColor";
import { useCallback, useEffect, useRef, useState } from "react";

const useGame = () => {
  const [time, setTime] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string | undefined>();
  const [options, setOptions] = useState<string[]>([]);
  const progressBarTime = useRef<number>(10);

  /** Starts the game */
  const handleStartGame = () => {
    setHasGameStarted(true);
    setIsPlaying(true);
  };

  /** Ends the game when the timer reaches 0, or when
   *  the user clicks on the restart button. */
  const handleStopGame = () => {
    setHasGameStarted(false);
    setScore(0);
    setTime(30);
    setCurrentColor(generateRandomColor());
    progressBarTime.current = 10;
  };

  /** Check the answer if it was given, if not, just reduce the score.
   * @param result The answer data
   */
  const handleCheckAnswer = useCallback(
    (result: string) => {
      setIsPlaying(false);
      switch (result) {
        default:
          setScore((prev) => prev - 2);
      }
      setTimeout(() => {
        if (time - 1 != 0) {
          const color = generateRandomColor();
          setCurrentColor(color);
          setIsPlaying(true);
          progressBarTime.current = 10;
        }
      }, 1000);
    },
    [time]
  );

  useEffect(() => {
    const _currentColor: string = generateRandomColor();
    // Creates an array to store both incorrect
    // and the correct answer options
    const _options: string[] = [];
    for (let i = 0; i < 2; i++) {
      _options.push(generateRandomColor());
    }
    _options.push(_currentColor);
    // Shuffles the array
    for (let i = _options.length - 1; i > 0; i--) {
      // Generates a random index between 0 and the array length
      const j = Math.floor(Math.random() * (i + 1));
      // Swaps elements at i and j
      [_options[i], _options[j]] = [_options[j], _options[i]];
    }
    setOptions(_options);
    setCurrentColor(_currentColor);
  }, []);

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (hasGameStarted && time > 0) {
      if (isPlaying) {
        countdownTimer = setTimeout(() => {
          setTime((prev) => prev - 1);
          setScore((prev) => prev + 1);
          progressBarTime.current -= 1;
          if (progressBarTime.current == 0) {
            handleCheckAnswer("notAnswered");
          }
        }, 1000);
      }
    } else {
      if (score > 0 && score > highScore) {
        setHighScore(score);
      }
      handleStopGame();
    }
    return () => clearTimeout(countdownTimer);
  }, [
    time,
    hasGameStarted,
    score,
    highScore,
    progressBarTime,
    isPlaying,
    handleCheckAnswer,
  ]);

  return {
    time,
    score,
    highScore,
    hasGameStarted,
    progressBarTime: progressBarTime.current,
    currentColor,
    options,
    handleStartGame,
    handleStopGame,
  };
};

export default useGame;
