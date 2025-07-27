import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userChanged", handleStorageChange);
    return () => window.removeEventListener("userChanged", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {!user ? (
          <>
            <h1 className="text-4xl font-bold mb-4">Organize Your Notes Efficiently</h1>
            <p className="text-gray-600 mb-6">
              Keep all your notes in one place and access them easily whenever you need.
              Our tools help you to stay organized and productive.
            </p>
            <Link to="/Login" className="inline-block bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-sky-600">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">Welcome,</h1>
            <h2 className="text-4xl text-indigo-600 font-bold mb-4">{user.userName}</h2>
            <p className="text-gray-600">
              Access and manage your notes with ease. Create, edit, and organize all your important information in one place.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
