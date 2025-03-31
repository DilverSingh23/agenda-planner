import React from 'react'

const Header = () => {
    return (
        <div className='border-6 h-30 w-150 flex items-center justify-center gap-5 bg-black mt-5 rounded-3xl'>
            <img className = 'h-30 max-w-fit' src = "./logo.png"/>
            <h1 className="font-[DM_Sans] text-white text-5xl">
                Agenda Planner
            </h1>
        </div>
    )
}

export default Header