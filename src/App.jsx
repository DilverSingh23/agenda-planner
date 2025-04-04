import React, { useState } from 'react'
import Header from './components/Header'
import AgendaPlanner from './components/AgendaPlanner'


const App = () => {
  const [userInput, setUserInput] = useState('')
  return (
    <main>
      <div className='flex h-screen bg-[url(./citybackground.gif)] bg-cover bg-center justify-center'>
        <div className='flex flex-col items-center gap-10  '>
          <Header/>
          <AgendaPlanner userInput={userInput} setUserInput={setUserInput}/>
          <p className='text-white'>{userInput}</p>
        </div>
      </div>
    </main>
  )
}

export default App