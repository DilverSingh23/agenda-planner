import React from 'react'


const AgendaPlanner = ({userInput, setUserInput}) => {
    const checkUserInput = (event) => {
        event.preventDefault();
        const userInputValue = document.getElementById("user-input").value
        const form = document.getElementById("form")
        if (userInputValue.length == 0) {
            setUserInput('')
            alert('Cannot create an empty task, please enter a character.')
            console.log(userInput)
        }
        else if (userInputValue.length > 75) {
            setUserInput('')
            alert('Input is too long.')
            console.log(userInput)

        }
        else {
            setUserInput(userInputValue)
            form.reset()
            console.log(userInput)
        }
    }
    return (
        <div className='flex justify-center h-150 w-225 bg-black rounded-4xl'>
            <form onSubmit={checkUserInput} id = "form"> 
                <input className='mt-10 h-10 w-200 bg-white rounded-4xl p-5'
                    type="text"
                    id="user-input"
                    placeholder='Enter the task and deadline'
                >
                </input> 
            </form>
        </div>
    )
}

export default AgendaPlanner