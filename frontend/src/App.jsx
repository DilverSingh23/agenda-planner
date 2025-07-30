import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState(false)

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks")
    const data = await response.json()
    setTasks(data.tasks)
    console.log(data.tasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [refresh])


  return (
    <>
      <section className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className='flex flex-col justify-center items-center bg-black border-2 border-violet-500 gap-5 p-6'>
          {tasks.map((task) => (
            <div key={task.id} className='w-300 h-200 text-white bg-violet-500 p-4 rounded-3xl flex gap-1'>
              <div className='text-white font-extralight'>
                {task.dueDate.slice(0,16) + "    |    "}
              </div>
              <div className='text-white font-extrabold'>
                {task.task_name}
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  )
}

export default App
