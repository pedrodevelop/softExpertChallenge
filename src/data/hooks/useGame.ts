import { generateRandomColor } from "@/logic/utils/RandomColor";
import { useCallback, useEffect, useRef, useState } from "react";

interface IGameAnswer {
  /** Answer object id */
  id: number;
  /** Indicates whether the answer is correct or not */
  correct: boolean;
  /** If the answer is wrong, indicate which answer is correct */
  correctHex?: string;
  /** Indicates the color that should be guessed */
  hex: string;
  /** Indicates the time taken by the user in that round */
  time: number;
}

export interface IGameState {
  // /** An array of answers */
  answers: IGameAnswer[];
  /** The current round's color */
  currentColor: string;
  /** A boolean to check if the game was started */
  hasGameStarted: boolean;
  /** The user's highscore */
  highScore: number;
  /** Indicates that it's the last round of the game */
  isLastRound: boolean;
  /** A boolean to check if the user is in a round or not. */
  isPlaying: boolean;
  /** Indicates the time remaining in last round */
  lastRoundTimeRemaining: number | null;
  /** The current round's answers options */
  options: string[];
  /** The user's current score */
  score: number;
  /** The game remaining time */
  time: number;
}

const initialState: IGameState = {
  answers: [],
  currentColor: generateRandomColor(),
  hasGameStarted: false,
  highScore: 0,
  isLastRound: false,
  isPlaying: false,
  lastRoundTimeRemaining: null,
  options: [],
  score: 0,
  time: 30,
};

const useGame = () => {
  const [state, setState] = useState<IGameState>(initialState);
  const progressBarTime = useRef<number>(10);
  const countDownTime = useRef<number>(state.time);

  /** Starts the game */
  const handleStartGame = () => {
    handleCreateRound();
    setState((prev) => ({
      ...prev,
      answers: [],
      hasGameStarted: true,
    }));
  };

  /** Ends the game when the timer reaches 0 */
  const handleStopGame = useCallback(() => {
    let _highScore: number;
    if (state.score > 0 && state.score > state.highScore) {
      _highScore = state.score;
    } else {
      _highScore = state.highScore;
    }
    setState(() => ({
      ...initialState,
      highScore: _highScore,
      answers: state.answers,
    }));
    const gameData = JSON.stringify([
      state.score > 0 && state.score > state.highScore
        ? state.score
        : state.highScore,
      state.answers,
    ]);
    localStorage.setItem("gameData", gameData);
    progressBarTime.current = 10;
    countDownTime.current = initialState.time;
  }, [state.score, state.highScore, state.answers]);

  /** Restart the game by deleting all match data */
  const handleRestartGame = () => {
    const gameDataStorage = localStorage.getItem("gameData");
    if (gameDataStorage) {
      const gameData = JSON.parse(gameDataStorage);
      setState(() => ({
        ...initialState,
        highScore: gameData[0],
        answers: gameData[1],
      }));
    } else {
      setState(initialState);
    }
    progressBarTime.current = 10;
    countDownTime.current = initialState.time;
  };

  /** Creates a game round */
  const handleCreateRound = useCallback(() => {
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
      // Swaps elements at i and j indexes
      [_options[i], _options[j]] = [_options[j], _options[i]];
    }
    setState((prev) => ({
      ...prev,
      currentColor: _currentColor,
      options: _options,
      isPlaying: true,
    }));
    console.log(_currentColor);
  }, []);

  /** Check the answer if it was given, if not, just reduce the score.
   * @param result The answer data
   */
  const handleCheckAnswer = useCallback(
    (answer: string) => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
      }));
      let _score = state.score;
      let _answerResult: string | undefined;
      let _answerData: IGameAnswer;
      if (answer) {
        _answerResult = answer == state.currentColor ? "correct" : "incorrect";
      }
      switch (_answerResult) {
        case "correct":
          _score += 5;
          break;
        case "incorrect":
          if (state.score > 0) {
            _score -= 1;
          }
          break;
        default:
          if (state.score > 0) {
            _score -= 2;
          }
          break;
      }
      _answerData = {
        id: state.answers.length + 1,
        correct: answer == state.currentColor,
        hex: answer ?? null,
        correctHex: _answerResult != "correct" ? state.currentColor : undefined,
        time:
          state.isLastRound && state.lastRoundTimeRemaining
            ? state.lastRoundTimeRemaining - progressBarTime.current
            : 10 - progressBarTime.current,
      };
      setState((prev) => ({
        ...prev,
        score: _score,
        answers: [...state.answers, _answerData],
      }));
      if (countDownTime.current > 0) {
        setTimeout(() => {
          if (countDownTime.current >= 10) {
            progressBarTime.current = 10;
            countDownTime.current -= 1;
          } else {
            countDownTime.current -= 1;
            setState((prev) => ({
              ...prev,
              isLastRound: true,
              lastRoundTimeRemaining: countDownTime.current,
            }));
            progressBarTime.current = countDownTime.current;
          }
          handleCreateRound();
        }, 750);
      } else {
        setState((prev) => ({
          ...prev,
          isPlaying: true,
        }));
      }
    },
    [
      handleCreateRound,
      state.answers,
      state.currentColor,
      state.isLastRound,
      state.lastRoundTimeRemaining,
      state.score,
    ]
  );

  const handleResetGameData = () => {
    const gameDataStorage = localStorage.getItem("gameData");
    if (gameDataStorage) {
      localStorage.removeItem("gameData");
    }
    setState(initialState);
  };

  useEffect(() => {
    const gameDataStorage = localStorage.getItem("gameData");
    if (gameDataStorage) {
      const gameData = JSON.parse(gameDataStorage);
      setState((prev) => ({
        ...prev,
        highScore: gameData[0],
        answers: gameData[1],
      }));
    }
  }, []);

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (state.hasGameStarted && countDownTime.current > 0) {
      countdownTimer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          time: state.time - 1,
        }));
        countDownTime.current -= 1;
        if (state.isPlaying) {
          progressBarTime.current -= 1;
        }
        if (progressBarTime.current == 0 && countDownTime.current > 0) {
          handleCheckAnswer("");
        }
      }, 1000);
    } else {
      if (state.isPlaying) {
        handleStopGame();
      }
    }
    return () => clearTimeout(countdownTimer);
  }, [
    handleCheckAnswer,
    handleStopGame,
    progressBarTime,
    state.isPlaying,
    state.hasGameStarted,
    state.time,
  ]);

  return {
    countDownTime: countDownTime.current,
    progressBarTime: progressBarTime.current,
    state,
    handleCheckAnswer,
    handleStartGame,
    handleStopGame,
    handleRestartGame,
    handleResetGameData,
  };
};

export default useGame;
