import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ note: { title: '', description: '' } });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      note: {
        ...prev.note,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await API.put(`notes/update/${id}`, {
        title: note.note.title,
        description: note.note.description,
      });

      alert("Note updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while updating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      {isLoading ? (
        <div className="text-center text-2xl text-gray-600 mt-40">Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl space-y-6"
        >
          <input
            type="text"
            name="title"
            className="w-full text-3xl font-semibold text-gray-800 border-b pb-3 focus:outline-none focus:border-blue-500"
            value={note?.note?.title || ""}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            rows="10"
            className="w-full max-h-[70vh] text-gray-700 leading-7 whitespace-pre-wrap break-words border p-3 rounded-md focus:outline-none focus:border-blue-500 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            value={note?.note?.description || ""}
            onChange={handleChange}
            required
          ></textarea>

          <div className="mt-8 flex justify-between items-center border-t pt-4 text-sm text-gray-500">
            <span>
              Created at:{" "}
              <strong>{new Date(note?.note?.createdAt).toLocaleString()}</strong>
            </span>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                {isSubmitting ? "Updating..." : "Update Note"}
              </button>

              <Link
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                to="/notes"
              >
                ⬅ Back to Notes
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ViewNote;
