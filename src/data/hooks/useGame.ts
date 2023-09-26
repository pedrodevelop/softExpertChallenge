import { generateRandomColor } from "@/logic/utils/RandomColor";
import { useCallback, useEffect, useRef, useState } from "react";

interface IGameAnswer {
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
      isPlaying: true,
      hasGameStarted: true,
    }));
  };

  /** Ends the game when the timer reaches 0, or when
   *  the user clicks on the restart button. */
  const handleStopGame = useCallback(() => {
    if (state.score > 0 && state.score > state.highScore && state.time == 0) {
      setState(() => ({
        ...initialState,
        highScore: state.score,
      }));
    } else {
      setState(() => ({
        ...initialState,
        highScore: state.highScore,
      }));
    }
    progressBarTime.current = 10;
  }, [state.score, state.highScore, state.time]);

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
      let _result: string;
      let _answer: IGameAnswer;
      if (answer) {
        _result = answer == state.currentColor ? "correct" : "incorrect";
      }
      switch (_result) {
        case "correct":
          _score += 5;
          break;
        case "incorrect":
          if (state.score > 0) {
            _score -= 1;
          }
          _answer = { ..._answer, correctHex: state.currentColor };
          break;
        default:
          if (state.score > 0) {
            _score -= 2;
          }
          _answer = { ..._answer, correctHex: state.currentColor };
          break;
      }
      _answer = {
        ..._answer,
        correct: answer == state.currentColor,
        hex: answer ?? null,
        time: state.isLastRound
          ? state.lastRoundTimeRemaining - progressBarTime.current
          : 10 - progressBarTime.current,
      };
      setState((prev) => ({
        ...prev,
        score: _score,
        answers: [...state.answers, _answer],
      }));
      setTimeout(() => {
        if (state.time - 1 != 0) {
          handleCreateRound();
          setState((prev) => ({
            ...prev,
            isPlaying: true,
          }));
          if (state.time - 1 >= 10) {
            progressBarTime.current = 10;
          } else {
            setState((prev) => ({
              ...prev,
              isLastRound: true,
              lastRoundTimeRemaining: state.time,
            }));
            progressBarTime.current = state.time;
          }
        } else {
          setState((prev) => ({
            ...prev,
            isPlaying: false,
          }));
        }
      }, 1500);
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
  };
};

export default useGame;
