import React from "react";

const EditForm = ({ setName, setFunction, width }) => {
    return(
        <div className='font-extrabold flex justify-center items-center'>
            <input
                type='text'
                aria-rowcount={1}
                className={`flex bg-white rounded-2xl p-2 w-[${width}px] text-black border-2 border-black resize-none font-extralight justify-center`}
                placeholder='Enter task'
                value={setName}
                onChange={(e) => setFunction(e.target.value)}
            />
        </div>
    )
}

export default EditForm