import React from "react";
import '../css/Keyboard.css'
import words from '../words.json'

interface KeyboardProps {
    guesses: string[][]
    setGuesses: React.Dispatch<React.SetStateAction<string[][]>>
    indexGuesses: number
    setIndexGuesses: React.Dispatch<React.SetStateAction<number>>
    indexGuess: number
    setIndexGuess: React.Dispatch<React.SetStateAction<number>>
    word: string[]
    setCheckedGuesses: React.Dispatch<React.SetStateAction<string[][]>>
    usedLetters: string
    setUsedLetters: React.Dispatch<React.SetStateAction<string>>
    setIsEnded: React.Dispatch<React.SetStateAction<boolean>>
    setIsWin: React.Dispatch<React.SetStateAction<boolean>>
}

export const Keyboard: React.FC<KeyboardProps> = (props) => {
    const {
        guesses,
        setGuesses,
        indexGuesses,
        setIndexGuesses,
        indexGuess,
        setIndexGuess,
        word,
        setCheckedGuesses,
        usedLetters,
        setUsedLetters,
        setIsEnded,
        setIsWin,
    } = props

    const letterTable = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "Z", "X", "C", "V", "B", "N", "M"]

    function handleButtonAdd(pickedLetter: string) {
        if(usedLetters.includes(pickedLetter)) {
            return
        }

        if(guesses[indexGuesses][4]) {
            return
        }

        setGuesses(guesses =>
            guesses.map((guess, i) =>
                i === indexGuesses ? guess.map((letter, j) =>
                    j === indexGuess ? letter = pickedLetter : letter
                ) : guess
            )
        )
        setIndexGuess(value => value + 1)
    }

    function handleButtonEnter() {
        if("".concat(...word) === "".concat(...guesses[indexGuesses])) {
            setCheckedGuesses(checkedGuesses =>
                checkedGuesses.map((checkedWord, i) =>
                    i === indexGuesses ? checkedWord.map((checkedLetter, j) =>
                        guesses[i][j] === word[j] ? checkedLetter = "green" :
                        "".concat(...word).includes(guesses[i][j]) ? checkedLetter = "yellow" : checkedLetter
                    ) : checkedWord
                )
            )
            setUsedLetters("")
            setIsWin(value => !value)
            setIsEnded(value => !value)
            return
        }

        if(indexGuesses === 4 && guesses[indexGuesses][4]) {
            setCheckedGuesses(checkedGuesses =>
                checkedGuesses.map((checkedWord, i) =>
                    i === indexGuesses ? checkedWord.map((checkedLetter, j) =>
                        guesses[i][j] === word[j] ? checkedLetter = "green" :
                        "".concat(...word).includes(guesses[i][j]) ? checkedLetter = "yellow" : checkedLetter
                    ) : checkedWord
                )
            )
            setUsedLetters("")
            setIsEnded(value => !value)
            return
        }

        if(guesses[indexGuesses][4]) {
            if(guesses.some((guess, i) => ("".concat(...guess) === "".concat(...guesses[indexGuesses])) && i < indexGuesses)){return alert("That word already entered")}
            if(!words.some(word => word.toUpperCase() === "".concat(...guesses[indexGuesses]))){return alert("That word doesn't exist")}

            const usedLettersCurrent: string[] = []
            guesses[indexGuesses].map(letter => !"".concat(...word).includes(letter) ? usedLettersCurrent.push(letter) : null)
            
            setCheckedGuesses(checkedGuesses =>
                checkedGuesses.map((checkedWord, i) =>
                    i === indexGuesses ? checkedWord.map((checkedLetter, j) =>
                        guesses[i][j] === word[j] ? checkedLetter = "green" :
                        "".concat(...word).includes(guesses[i][j]) ? checkedLetter = "yellow" : checkedLetter
                    ) : checkedWord
                )
            )
            setUsedLetters(value => value.concat(...usedLettersCurrent))
            setIndexGuesses(value => value + 1)
            setIndexGuess(0)
        }
    }

    function handleButtonRemove() {
        if(!guesses[indexGuesses][0]) {
            return
        }
        
        setGuesses(guesses => 
            guesses.map((guess, i) =>
                i === indexGuesses ? guess.map((letter, j) =>
                    j === indexGuess - 1 ? letter = "" : letter
                ) : guess
            )
        )
        setIndexGuess(value => value - 1)
    }

    const keyboardRender = letterTable.map(letter =>
        <button
            key={letter}
            onClick={() => handleButtonAdd(letter)}
            style={usedLetters.includes(letter) ? {background: "#888"} :
            word.includes(letter) ? {background: "#"} : {}}
        >
        {letter}
        </button>
    )

    const backspaceImg = require('../img/backspace_FILL0_wght400_GRAD0_opsz48.png')
    const enterImg = require('../img/subdirectory_arrow_left_FILL0_wght400_GRAD0_opsz48.png')

    return (
        <div className="div-keyboard">
            {keyboardRender}
            <button onClick={() => handleButtonRemove()}><img src={backspaceImg} alt="backspace"></img></button>
            <button onClick={() => handleButtonEnter()}><img src={enterImg} alt="enter"></img></button>
        </div>
    )
}