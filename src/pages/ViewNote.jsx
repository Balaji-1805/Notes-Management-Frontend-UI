import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../api/api';

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get(`notes/note/${id}`)
      .then((result) => {
        setNote(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching note:", err);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      {isLoading ? (
        <div className="text-center text-2xl text-gray-600 mt-40">Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
            {note.note.title}
          </h1>

          <div className="max-h-[70vh] overflow-auto text-gray-700 leading-7 whitespace-pre-wrap break-words scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {note.note.description}
          </div>

          <div className="mt-8 flex justify-between items-center border-t pt-4 text-sm text-gray-500">
            <span>
              Created at: <strong>{new Date(note.note.createdAt).toLocaleString()}</strong>
            </span>
            <Link className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition" to="/notes">
              ⬅ Back to Notes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNote;
