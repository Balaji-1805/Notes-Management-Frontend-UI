import React from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ note,deleteNote }) => {
  const formattedDate = new Date(note.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="w-full min-h-[16rem] bg-white shadow-md rounded-xl p-4 flex flex-col justify-between transition hover:shadow-xl">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {note.title}
        </h2>

        <p className="text-sm text-gray-700 line-clamp-3 mb-2">
          {note.description}
        </p>
      </div>

      {/* Created Date just above buttons */}
      <div className="text-xs text-gray-500 mt-2">
        Created on: {formattedDate}
      </div>

      <div className="flex justify-between items-center mt-2">
        <Link
          to={`/notes/${note._id}`}
          className="bg-green-500 text-white py-1 px-3 rounded-md text-sm hover:bg-green-600 transition"
        >
          View
        </Link>
        <button
          className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 transition"
          onClick={()=>{deleteNote(note._id)}}
        >Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
