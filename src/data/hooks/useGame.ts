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
  time: 15,
};

const useGame = () => {
  const [state, setState] = useState<IGameState>(initialState);
  const progressBarTime = useRef<number>(10);

  /** Starts the game */
  const handleStartGame = () => {
    handleCreateRound();
    setState((prev) => ({
      ...prev,
      answers: [],
      isPlaying: true,
      hasGameStarted: true,
    }));
  };

  /** Ends the game when the timer reaches 0 */
  const handleStopGame = useCallback(() => {
    if (state.score > 0 && state.score > state.highScore) {
      setState(() => ({
        ...initialState,
        highScore: state.score,
        answers: state.answers,
      }));
    } else {
      setState(() => ({
        ...initialState,
        highScore: state.highScore,
        answers: state.answers,
      }));
    }
    const gameData = JSON.stringify([
      state.score > 0 && state.score > state.highScore
        ? state.score
        : state.highScore,
      state.answers,
    ]);
    localStorage.setItem("gameData", gameData);

    progressBarTime.current = 10;
  }, [state.score, state.highScore, state.answers]);

  /** Restart the game by deleting all match data */
  const handleRestartGame = () => {
    const gameDataStorage = localStorage.getItem("gameData");
    if (state.highScore > 0 && state.answers && gameDataStorage) {
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
  };

  /** Creates a game round */
  const handleCreateRound = () => {
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
  };

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
      if (state.time - 1 != 0) {
        setTimeout(() => {
          if (state.time >= 10) {
            progressBarTime.current = 10;
          } else {
            setState((prev) => ({
              ...prev,
              isLastRound: true,
              lastRoundTimeRemaining:
                answer == "" ? state.time - 1 : state.time,
            }));
            progressBarTime.current = state.time;
          }
          handleCreateRound();
        }, 1500);
      } else {
        setState((prev) => ({
          ...prev,
          isPlaying: true,
        }));
      }
    },
    [
      state.answers,
      state.currentColor,
      state.isLastRound,
      state.lastRoundTimeRemaining,
      state.score,
      state.time,
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
    if (state.hasGameStarted && state.time > 0) {
      if (state.isPlaying) {
        countdownTimer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            time: state.time - 1,
          }));
          progressBarTime.current -= 1;
          if (progressBarTime.current == 0 && state.time - 1 != 0) {
            handleCheckAnswer("");
          }
        }, 1000);
      }
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
