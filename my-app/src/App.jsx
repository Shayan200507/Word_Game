

import './App.css'
import { languages } from './languages'
import {getFarewellText} from './utils'
import { getWord } from './utils'
import Confetti from "react-confetti";

import { useState } from 'react'
import { clsx } from 'clsx';

function App() {

  const [Word, setWord] = useState(() => getWord().toUpperCase())// the word that the user has to guess arrow func so it doesnt call fucn for each re render
  console.log(Word)
  const [letters, setLetters] = useState([])// array of letters that the user has guessed

  const wrongguesses = letters.filter((Element) => {  return (!Word.includes(Element.toUpperCase())) }).length// the number of wrong guesses the user has made
 
  
  
  const isGameLost = wrongguesses >= languages.length-1//game is over if wrong guesses is equal to the number of languages -1
 
  const isGameWon = Word.split("").every( (letter) => { return letters.includes(letter.toLowerCase())})// game is won if every letter in the word is included in the letters array

 const isGameOver = isGameLost || isGameWon


 
 
 
  const arrWord = Word.split("")// split the word into an array of letters
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const arrAlphabet = alphabet.split("")// split the alphabet into an array of letters
  console.log(letters)
  
function lastGuessCorrect(){
  if(letters.length === 0){ return true}// if the user has not guessed any letters yet, we can consider the last guess to be correct
  else{ return Word.split("").includes(letters[letters.length-1].toUpperCase())}


}



  function handleKeyboardeClick(letter){
   

    setLetters(prevLetter => {
        const letterSet = new Set(prevLetter)
        letterSet.add(letter)
        return Array.from(letterSet)
    }
// using a set to make sure there are no duplicate letters in the letter array
    )

  }



  function displayWord(letter,index){
    
    if(letters.includes(letter.toLowerCase())){ return <span key={index}  className='letterBox'>{letter}</span> }
    else if(isGameLost){

      return <span key={index} style={{ color: "#E74C3C" }} className='letterBox'>{letter}</span>

    }
    else{ return <span key={index}  className='letterBox'></span> }





  }


  //languages.map dispalys the imported alnguages
  const displayArray = languages.map((langauge,index) => { return <span key={index}  style={{ backgroundColor : langauge.backgroundColor, color : langauge.color}}   className= { clsx('langBlock',{ lostLang : index < wrongguesses})}>{langauge.name}</span>})
  
  //displayArrWord maps through the word and displays the letters that the user has guessed correctly and hides the letters that the user has not guessed yet
  const displayArrWord = arrWord.map((letter,index) =>(<span key={index}  className='letterBox'>{displayWord(letter,index)}</span> ))
  
  const  displayArrAlphabet = arrAlphabet.map((letter,index) =>(<button  disabled={isGameOver}   key={index} onClick={() => handleKeyboardeClick(letter)}  className={clsx('alphaButton',{
     correct: letters.includes(letter) && arrWord.includes(letter.toUpperCase()),
    incorrect: letters.includes(letter) && !arrWord.includes(letter.toUpperCase())
  })}>{letter}</button>))



  function newGame(){

    
    setWord(getWord().toUpperCase())
    setLetters([])


  }
 
 
  function statusDisplay(){


    if(!isGameOver && lastGuessCorrect()){ return <div className='StatCard '></div>}
    
    else if (isGameWon) {    return  (<div className='StatCard winCard'>
              <h1>You Win!</h1> 
              <p>well done!🎉</p>
           </div>)}
    else if(isGameLost){
       return (<div className='StatCard loseCard'>
              <h1>Game Over!</h1> 
              <p>You better start learning assembly!😂</p>
           </div>) }    

    else{
      return <div className='StatCard lang' style={{backgroundColor: languages[wrongguesses-1].backgroundColor, color: languages[wrongguesses-1].color}}>{getFarewellText(languages[wrongguesses-1].name)}</div>


    }

  }
 
  return (  
    <>

           <header className="title">
            
            
            <h1>Assembly: Endgame</h1> 
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      
           </header>

           { 

           statusDisplay()
           
           
           
           
           }


           <div className='langContainer'>{displayArray}</div>
           <div className="wordContainer">{displayArrWord}</div>
           <div className='keyBoard'>{displayArrAlphabet}</div>

           {isGameWon && <Confetti      width={window.innerWidth}
    height={window.innerHeight} />}
           {isGameOver && <div className='newGame'><button onClick={newGame}>New Game</button></div>}
     
    </>
  )
}

export default App
