

import './App.css'
import { languages } from './languages'

import { useState } from 'react'
import { clsx } from 'clsx';

function App() {

  const [Word, setWord] = useState("REACT")// the word that the user has to guess
  const [letters, setLetters] = useState([])// array of letters that the user has guessed

  const wrongguesses = letters.filter((Element) => {  return (!Word.includes(Element.toUpperCase())) }).length// the number of wrong guesses the user has made
  const isGameLost = wrongguesses >= languages.length-1//game is over if wrong guesses is equal to the number of languages -1
 
  const isGameWon = Word.split("").every( (letter) => { return letters.includes(letter.toLowerCase())})// game is won if every letter in the word is included in the letters array

 const isGameOver = isGameLost || isGameWon
 
 
 
 
 
  const arrWord = Word.split("")// split the word into an array of letters
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const arrAlphabet = alphabet.split("")// split the alphabet into an array of letters
  console.log(letters)
  

  function handleKeyboardeClick(letter){
   

    setLetters(prevLetter => {
        const letterSet = new Set(prevLetter)
        letterSet.add(letter)
        return Array.from(letterSet)
    }
// using a set to make sure there are no duplicate letters in the letter array
    )

  }


  //languages.map dispalys the imported alnguages
  const displayArray = languages.map((langauge,index) => { return <span key={index}  style={{ backgroundColor : langauge.backgroundColor, color : langauge.color}}   className= { clsx('langBlock',{ lostLang : index < wrongguesses})}>{langauge.name}</span>})
  
  //displayArrWord maps through the word and displays the letters that the user has guessed correctly and hides the letters that the user has not guessed yet
  const displayArrWord = arrWord.map((letter,index) =>(<span key={index}  className='letterBox'>{letters.includes(letter.toLowerCase()) ?letter : ""}</span> ))
  
  const  displayArrAlphabet = arrAlphabet.map((letter,index) =>(<button key={index} onClick={() => handleKeyboardeClick(letter)}  className={clsx('alphaButton',{
     correct: letters.includes(letter) && arrWord.includes(letter.toUpperCase()),
    incorrect: letters.includes(letter) && !arrWord.includes(letter.toUpperCase())
  })}>{letter}</button>))
 
 
 
  return (  
    <>

           <header className="title">
            
            
            <h1>Assembly: Endgame</h1> 
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      
           </header>

           { !isGameOver ? <div className='StatCard'></div> : isGameWon ? 
            
            
            
            
            <div className='StatCard winCard'>
              <h1>You Win!</h1> 
              <p>well done!🎉</p>
           </div>
           :

            <div className='StatCard loseCard'>
              <h1>Game Over!</h1> 
              <p>You better start learning assembly!😂</p>
           </div>

           
           
           
           }


           <div className='langContainer'>{displayArray}</div>
           <div className="wordContainer">{displayArrWord}</div>
           <div className='keyBoard'>{displayArrAlphabet}</div>
           {isGameOver && <div className='newGame'><button>New Game</button></div>}
     
    </>
  )
}

export default App
