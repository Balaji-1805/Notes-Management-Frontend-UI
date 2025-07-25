import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/api'
const NoteCreate = () => {
    const Navigate=useNavigate();
    const [noteData,setNoteData]=useState({
        title:"",
        description:""
    })
    const formHandler=async(e)=>
    {
        e.preventDefault();
        const res=API.post('/notes/addNote', {
            title:noteData.title,
            description:noteData.description,
          });
        alert('Note Added Successfully!');
        console.log(res);
        Navigate('/notes')
    }   
  return (
    <div>
        <div className="login-field bg-gray-100 w-[40%] m-auto my-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-1 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900 flex gap-10">
             <span className='text-sm mt-2.5 font-medium'> <Link to="/notes">Back to Notes</Link></span> Create Note
            </h2>
           
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form method="POST" className="space-y-6" onSubmit={formHandler}>
              <div>
                <label htmlFor="title" className="block text-sm leading-6 font-medium text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    autoComplete="title"
                    value={noteData.title}
                    onChange={(e)=>{
                      setNoteData({...noteData,title:e.target.value});
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="description" className="block text-sm leading-6 font-medium text-gray-900">
                    Description
                  </label>
                </div>
                <div className="mt-2">
                  <textarea  rows={5} id="description"
                    name="description"
                    type="textarea"
                    value={noteData.description}
                    required
                    autoComplete="current-description"
                     onChange={(e)=>{
                      setNoteData({...noteData,description:e.target.value});
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm leading-6"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                 Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCreate;