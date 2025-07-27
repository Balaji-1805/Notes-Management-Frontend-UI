import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ note: { title: "", description: "" } });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    API.get(`notes/note/${id}`)
      .then((res) => {
        setNote(res.data);
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
      alert("Error updating note.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      {isLoading ? (
        <div className="text-center text-xl text-gray-600 mt-20">Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl space-y-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="w-full text-2xl font-bold border-b focus:outline-none focus:border-blue-500 text-gray-800 pb-2"
            value={note.note.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Write your note here..."
            rows={10}
            className="w-full text-base border rounded-lg p-4 leading-6 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            value={note.note.description}
            onChange={handleChange}
            required
          ></textarea>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-4 text-sm text-gray-600 gap-4">
            <p>
              Created at:{" "}
              <strong>{new Date(note.note.createdAt).toLocaleString()}</strong>
            </p>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
              >
                {isSubmitting ? "Updating..." : "Update Note"}
              </button>

              <Link
                to="/notes"
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
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
