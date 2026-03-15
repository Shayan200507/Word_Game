

import './App.css'
import { languages } from './languages'
import {nanoid} from 'nanoid' 

function App() {

  const displayArray = languages.map((langauge) => { return <span key={nanoid()}  style={{ backgroundColor : langauge.backgroundColor, color : langauge.color}}   className='langBlock'>{langauge.name}</span>})

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
     
    </>
  )
}

export default App
