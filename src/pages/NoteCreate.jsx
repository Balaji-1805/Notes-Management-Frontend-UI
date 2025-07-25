import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/api'

const NoteCreate = () => {
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState({
    title: "",
    description: ""
  });

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notes/addNote', {
        title: noteData.title,
        description: noteData.description,
      });
      alert('Note Added Successfully!');
      navigate('/notes');
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="bg-white shadow-md rounded-lg w-full max-w-5xl p-8 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-sm font-medium text-left  block">
            <Link to="/notes" className="text-white rounded-full bg-blue-500 px-4 py-2">
              ← Back to Notes
            </Link>
          </span>
            <font >Create Note</font>
          </h2>
        </div>

        <form onSubmit={formHandler} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={noteData.title}
              onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base px-3 py-2 outline-1 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={15}
              required
              value={noteData.description}
              onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
              className="mt-1 block w-full min-h-[200px] rounded-md border-gray-300 shadow-sm text-base px-3 py-2  outline-1 focus:outline-indigo-600 resize-y"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteCreate;
