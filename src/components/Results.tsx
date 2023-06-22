import words from '../words.json'
import '../css/Results.css'

interface ResultsType {
    isWin: boolean
    setIsWin: React.Dispatch<React.SetStateAction<boolean>>
    setIsEnded: React.Dispatch<React.SetStateAction<boolean>>
    word: string[]
    setWord: React.Dispatch<React.SetStateAction<string[]>>
    setIndexGuesses: React.Dispatch<React.SetStateAction<number>>
    setIndexGuess: React.Dispatch<React.SetStateAction<number>>
    checkedGuesses: string[][]
    setCheckedGuesses: React.Dispatch<React.SetStateAction<string[][]>>
    setGuesses: React.Dispatch<React.SetStateAction<string[][]>>
    setUsedLetters: React.Dispatch<React.SetStateAction<string>>
}

export const Results: React.FC<ResultsType> = (props) => {
    const {
        isWin,
        setIsWin, 
        setIsEnded, 
        word, 
        setWord, 
        setIndexGuess, 
        setIndexGuesses, 
        setGuesses, 
        checkedGuesses, 
        setCheckedGuesses, 
        setUsedLetters
    } = props

    function handleButton() {
        setIsEnded(value => !value)
        setUsedLetters("")
        setWord(words[Math.floor(Math.random() * words.length)].toUpperCase().split(""))
        setIsWin(false)
        setIndexGuess(0)
        setIndexGuesses(0)
        setGuesses(guesses => guesses.map(guess => guess.map(letter => letter = "")))
        setCheckedGuesses(checkedGuesses => checkedGuesses.map(checkedWord => checkedWord.map(checkedLetter => checkedLetter = "")))
    }

    return (
        <div className="div-results">
            <div className="div-results-info">
                <h2>You {isWin ? "Won" : "Lost"}</h2>
                <p>Word: {"".concat(...word)}</p>
                <div className="div-results-graph">
                    {checkedGuesses.map((checkedGuess, i) =>
                        <div key={String(i)} className="div-results-graph-guess">
                            {checkedGuess.map((checkedLetter, j) =>
                                <div key={String(i) + String(j)} className={`div-results-graph-letter ${checkedLetter}`}></div>
                            )}
                        </div>
                    )}
                </div>
                <button onClick={handleButton}>Play Again</button>
            </div>
        </div>
    )
}