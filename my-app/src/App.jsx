

import './App.css'
import { languages } from './languages'
import {nanoid} from 'nanoid' 
import { useState } from 'react'
import { clsx } from 'clsx';

function App() {

  const [Word, setWord] = useState("REACT")
  const [letters, setLetters] = useState([])
  const arrWord = Word.split("")
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const arrAlphabet = alphabet.split("")
  

  function handleKeyboardeClick(letter){
   

    setLetters(prevLetter => {
        const letterSet = new Set(prevLetter)
        letterSet.add(letter)
        return Array.from(letterSet)
    }
// using a set to make sure there are no duplicate letters in the letter array
    )

  }

  const displayArray = languages.map((langauge) => { return <span key={nanoid()}  style={{ backgroundColor : langauge.backgroundColor, color : langauge.color}}   className='langBlock'>{langauge.name}</span>})
  const displayArrWord = arrWord.map((letter) =>(<span key={nanoid()}  className='letterBox'>{letter}</span> ))
  const  displayArrAlphabet = arrAlphabet.map((letter) =>(<button key={nanoid()} onClick={() => handleKeyboardeClick(letter)}  className={clsx('alphaButton',{
     correct: letters.includes(letter) && arrWord.includes(letter.toUpperCase()),
    incorrect: letters.includes(letter) && !arrWord.includes(letter.toUpperCase())
  })}>{letter}</button>))
 
 
 
  return (  
    <>

           <header className="title">
            
            
            <h1>Assembly: Endgame</h1> 
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      
           </header>

           <div className='winCard'>
              <h1>You Win!</h1> 
              <p>well done!🎉</p>
           </div>


           <div className='langContainer'>{displayArray}</div>
           <div className="wordContainer">{displayArrWord}</div>
           <div className='keyBoard'>{displayArrAlphabet}</div>
           <div className='newGame'><button>New Game</button></div>
     
    </>
  )
}

export default App
