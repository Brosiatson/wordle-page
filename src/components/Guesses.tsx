import React from "react";
import '../css/Guesses.css'

interface GuessesType {
    guesses: string[][]
    word: string[]
    checkedGuesses: (string | null)[][]
}

export const Guesses: React.FC<GuessesType> = ({guesses, word, checkedGuesses}) => {
    const guessesMap = guesses.map((guess, i) =>
        <div key={i} className="div-guess">
            {guess.map((letter, j) =>
                <div
                    key={String(i) + String(j)}
                    className={checkedGuesses[i][j] ? `div-letter ${checkedGuesses[i][j]}` : "div-letter"} 
                >
                {letter}
                </div>
            )}
        </div>
    )

    return (
        <div className="div-guesses">
            {guessesMap}
        </div>
    )
}