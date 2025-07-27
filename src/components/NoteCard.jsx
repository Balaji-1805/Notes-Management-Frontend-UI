import React, { useState } from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ note, deleteNote }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = new Date(note.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition min-h-[16rem]">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">{note.title}</h2>
        <p className="text-sm text-gray-700 line-clamp-3 mb-3">{note.description}</p>
      </div>

      <p className="text-xs text-gray-500 mb-2">Created on: {formattedDate}</p>

      <div className="flex justify-between items-center">
        <Link
          to={`/notes/${note._id}`}
          className="bg-green-500 text-white py-1 px-4 rounded-md text-sm hover:bg-green-600"
        >
          View
        </Link>
        <button
          disabled={isDeleting}
          onClick={() => deleteNote(note._id)}
          className={`bg-red-500 text-white py-1 px-4 rounded-md text-sm hover:bg-red-600 ${isDeleting && "opacity-60 cursor-not-allowed"}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
