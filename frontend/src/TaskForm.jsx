import React, { useState } from 'react'
import { LuSendHorizontal } from "react-icons/lu";

const TaskForm = ( { fetchTasks } ) => {
    const [taskInput, setTaskInput] = useState("")
    const [dateInput, setDateInput] = useState("")

    const handleUserInputs = async (e) => {
        e.preventDefault()

        setTaskInput("")
        setDateInput("")

        const data = {
            taskName: taskInput,
            dueDate: dateInput
        }

        const url = 'http://127.0.0.1:5000/create_task'
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status != 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        }
        else {
            fetchTasks()
        }
    }
    return (
        <form onSubmit={handleUserInputs} className='flex gap-10'>
            <textarea
                rows={1}
                className='flex bg-white rounded-3xl w-[20em] p-4 text-black resize-none font-extralight'
                placeholder='Enter task'
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <textarea 
                rows={1}
                className='flex bg-white rounded-3xl w-[20em] p-4 text-black resize-none font-extralight'
                placeholder='Enter due date'
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
            />
            <button type="submit">
                <LuSendHorizontal className='w-fit h-fit rounded-2xl p-3 bg-black ml-3 hover:bg-white hover:text-black hover:cursor-pointer'/>
            </button>
        </form>
    )
}

export default TaskForm