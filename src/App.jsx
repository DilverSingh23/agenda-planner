import React from 'react'
import Header from './components/Header'
import AgendaPlanner from './components/AgendaPlanner'

const App = () => {
  return (
    <main>
      <div className='flex h-screen bg-[url(./citybackground.gif)] bg-cover bg-center justify-center'>
        <div className='flex flex-col items-center gap-10  '>
          <Header/>
          <AgendaPlanner/>
        </div>
      </div>
    </main>
  )
}

export default App