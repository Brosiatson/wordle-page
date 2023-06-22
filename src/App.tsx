import React, { useState } from 'react';
import './css/App.css';
import { Header } from './components/Header';
import { Guesses } from './components/Guesses';
import { Keyboard } from './components/Keyboard';
import words from './words.json'
import { Results } from './components/Results';

function App() {
  const [guesses, setGuesses] = useState<string[][]>(
    [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]
  )
  const [checkedGuesses, setCheckedGuesses] = useState<string[][]>(
    [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]
  )
  const [indexGuesses, setIndexGuesses] = useState<number>(0)
  const [indexGuess, setIndexGuess] = useState<number>(0)
  const [word, setWord] = useState<string[]>(words[Math.floor(Math.random() * words.length)].toUpperCase().split(""))
  const [usedLetters, setUsedLetters] = useState<string>("")
  const [isEnded, setIsEnded] = useState<boolean>(false)
  const [isWin, setIsWin] = useState<boolean>(false)

  return (
    <>
      <Header />
      <Guesses
        guesses={guesses}
        word={word}
        checkedGuesses={checkedGuesses}
      />
      <Keyboard
        guesses={guesses}
        setGuesses={setGuesses}
        indexGuesses={indexGuesses}
        setIndexGuesses={setIndexGuesses}
        indexGuess={indexGuess}
        setIndexGuess={setIndexGuess}
        word={word}
        setCheckedGuesses={setCheckedGuesses}
        usedLetters={usedLetters}
        setUsedLetters={setUsedLetters}
        setIsEnded={setIsEnded}
        setIsWin={setIsWin}
      />
      {isEnded ?
        <Results
          isWin={isWin}
          setIsWin={setIsWin}
          setIsEnded={setIsEnded}
          word={word}
          setWord={setWord}
          checkedGuesses={checkedGuesses}
          setCheckedGuesses={setCheckedGuesses}
          setGuesses={setGuesses}
          setIndexGuess={setIndexGuess}
          setIndexGuesses={setIndexGuesses}
          setUsedLetters={setUsedLetters}
        /> : null
      }
    </>
  )
}

export default App;
