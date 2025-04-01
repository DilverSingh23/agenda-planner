import React from 'react'

const AgendaPlanner = () => {
    return (
        <div className='flex justify-center h-150 w-225 bg-black rounded-4xl'>
            <input className='mt-10 h-10 w-200 bg-white rounded-4xl'
                type="text"
                placeholder='   Enter the task and deadline'
            >

            </input>
        </div>
    )
}

export default AgendaPlanner