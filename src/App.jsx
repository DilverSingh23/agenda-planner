import React from 'react'
import Header from './components/Header'

const App = () => {
  return (
    <main>
      <div className='flex h-screen bg-[url(./citybackground.gif)] bg-cover bg-center justify-center'>
        <Header/>
      </div>
    </main>
  )
}

export default App