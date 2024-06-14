import { useEffect, useState } from "react";
import Row from "./Row";
import { valid_words } from "../valid";

const Wordle = ({ solution }: { solution: string }) => {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess]= useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSolutionFound, setIsSolutionFound] = useState(false);

  console.log(solution, currentGuess);

  useEffect(() => {
    const typeLetter = (char: string) => {
      setCurrentGuess(currentGuess + char);
    };
    const handleKeyDown = (event: {key:string}) => {
      if (isGameOver) {
        return;
      }
      const alpha = event.key.toUpperCase().charCodeAt(0);
      if (
        alpha >= 65 &&
        alpha <= 90 &&
        event.key.length == 1 &&
        currentGuess.length < 5
      ) {
        typeLetter(event.key.toUpperCase());
      } else if (event.key === "Enter" && currentGuess.length == 5) {
        const isCorrect = solution === currentGuess;
        const isValid = valid_words.has(currentGuess.toLowerCase());
        if (!isValid) {
          return;
        }
        const newGuesses = [...guesses];
        const currentGuessIndex = guesses.findIndex((val) => val == null);
        newGuesses[currentGuessIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        if (isCorrect) {
          setIsSolutionFound(true);
          setIsGameOver(true);
        }
        if (currentGuessIndex == 5) {
          setIsGameOver(true);
        }
      } else if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess]);
  return (
    <div>
      {guesses.map((guess, index) => {
        const isCurrentGuess =
          index === guesses.findIndex((val) => val == null);
        return (
          <Row
            key={index}
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
      <div>
        {currentGuess.length == 5 &&
        !valid_words.has(currentGuess.toLowerCase())
          ? "Must be a valid word !"
          : isGameOver
          ? isSolutionFound
            ? "Congrats! You win"
            : "Correct answer: " + solution
          : ""}
      </div>
    </div>
  );
};

export default Wordle;
