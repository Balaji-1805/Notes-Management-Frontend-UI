import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api';

const NoteCreate = () => {
  const navigate = useNavigate();
  const [iscreate, setIsCreate] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", description: "" });

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notes/addNote', noteData);
      alert('Note Added Successfully!');
      navigate('/notes');
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6 sm:p-8 mt-10">
        <div className="mb-6">
          <div className="mb-4">
            <Link
              to="/notes"
              className="inline-block text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              ← Back to Notes
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create Note</h2>
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
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={10}
              required
              value={noteData.description}
              onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm text-base px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              disabled={iscreate}
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition"
            >
              {iscreate ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteCreate;
