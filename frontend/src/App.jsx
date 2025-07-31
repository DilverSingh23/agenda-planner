import { useEffect, useState } from 'react'
import { FaPencil, FaCircleCheck } from "react-icons/fa6";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import TaskForm from "./TaskForm"
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [complete, setComplete] = useState({})
  const [editing, setEditing] = useState({})

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks")
    const data = await response.json()
    const sorted = data.tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
    setTasks(sorted)
  }

  const deleteTask = async (id) => {
    const url = `http://127.0.0.1:5000/delete_task/${id}`
    const options = {
      method: "DELETE"
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.status != 200) {
      alert(data.message)
    }
    else {
      fetchTasks()
    }
  }

  const handleEdit = (id) => {
    setEditing((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
    const task = tasks.find((task) => task.id == id)
    setTaskName(task.taskName)
    setDueDate(new Date(task.dueDate).toISOString().slice(0,10).replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2-$3-$1'))
  }

  const editTask = async(id) => {
    setTaskName("")
    setDueDate("")
    const data = {
      taskName: taskName,
      dueDate: dueDate
    }
    const url = `http://127.0.0.1:5000/update_task/${id}`
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    if (response.status != 200) {
      const data = await response.json()
      alert(data.message)
    }
    else {
      handleEdit(id)
      fetchTasks()
    }
  }

  const handleComplete = (id) => {
    setComplete((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <section className="min-h-screen flex items-center bg-black text-white flex-col gap-2 w-screen overflow-hidden">
        <div className='flex items-center justify-center text-white gap-3 mt-20'>
          <img className="w-[100px] h-[100px]" src="/logo.png" />
          <span className='text-5xl'>|</span>
          <h1 className='font-light text-3xl'>Agenda Planner</h1>
        </div>
        <div className='flex justify-between items-center bg-violet-300 p-5 w-fit rounded-3xl'>
          <TaskForm fetchTasks={fetchTasks}/>
        </div>
        <div className='flex flex-col items-center bg-black rounded-2xl gap-5 p-6 pl-20 pr-20 w-[60em] h-[30em] scroll-smooth overflow-scroll'>
          {tasks.map((task) => (
            <div key={task.id} className=' text-white bg-violet-500 p-4 pl-6 pr-6 rounded-3xl flex gap-5 w-full items-center'>
              <FaCircleCheck className={`h-[30px] w-[30px] ${complete[task.id] ? 'hover:text-green-300 text-green-500' : 'hover:text-green-400 text-white'} hover:cursor-pointer`} onClick={() => handleComplete(task.id)}/>
              { !editing[task.id] ? (
                <>
                  <div className='font-extralight bg-black w-[160px] flex items-center justify-center rounded-3xl p-2'>
                    {task.dueDate.slice(0,16).replace(/^(\w{3}), (\d{2}) (\w{3}) (\d{4})$/, '$1, $3 $2, $4')}
                  </div>
                  <div className='font-extrabold flex justify-center items-center'>
                    {task.taskName}
                  </div>
                  <div className='text-white font-extralight flex gap-3 justify-center items-center ml-auto'>
                    <FaPencil className='hover:text-amber-300 hover:cursor-pointer' onClick={() => {
                      !Object.values(editing).some(task => task === true) ? handleEdit(task.id)  : null
                    }} />
                    <MdDelete className='h-[20px] w-[20px] hover:text-red-500 hover:cursor-pointer' onClick={() => deleteTask(task.id)} />
                  </div>
                </>
              ): (
                <>
                  <div className='font-extralight flex items-center justify-center'>
                    <input
                      type='text'
                      aria-rowcount={1}
                      className='flex bg-white rounded-2xl w-[150px] p-2 text-black border-2 border-black resize-none font-extralight justify-center'
                      placeholder='Enter due date'
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  <div className='font-extrabold flex justify-center items-center'>
                    <input
                      type='text'
                      aria-rowcount={1}
                      className='flex bg-white rounded-2xl p-2 w-[400px] text-black border-2 border-black resize-none font-extralight justify-center'
                      placeholder='Enter task'
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className='text-white font-extralight flex gap-3 justify-center items-center ml-auto'>
                    <button type="submit" onClick={() => editTask(task.id)}>
                        <LuSendHorizontal className='w-fit h-fit rounded-2xl p-3 bg-black ml-3 hover:bg-white hover:text-black hover:cursor-pointer'/>
                    </button>
                    <MdOutlineCancel className='bg-black rounded-3xl w-[2.5em] h-[2.5em] p-2 hover:bg-white hover:text-black hover:cursor-pointer' onClick={() => handleEdit(task.id)} />
                  </div>
                </>
              )
              }
            </div>
          ))}
        </div>

      </section>
    </>
  )
}

export default App
