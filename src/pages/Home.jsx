import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  const checkUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  useEffect(() => {
    checkUser();
    const handleStorageChange = () => {
      checkUser();
    };
    window.addEventListener("userChanged", handleStorageChange);

    return () => window.removeEventListener("userChanged", handleStorageChange);
  }, []);

  return (
    <div className="main-content">
      {!user ? (
        <center className='mt-10 w-[30%] m-auto flex flex-col gap-3'>
          <h1 className='text-4xl font-bold'>Organize Your Notes Effeciently</h1>
          <p>
            Keep all your notes in one place and access them easily whenever you need.
            Our tools help you to stay organized and productive.
          </p>
          <Link to="/Login" className='bg-sky-500 w-fit m-auto px-4 py-2 rounded-md'>Get Started</Link>
        </center>
      ) : (
        <center className='mt-10 w-[30%] m-auto flex flex-col gap-3'>
          <h1 className='text-5xl font-bold'>Welcome,<br />{user.userName}</h1>
          <p className='w-80 m-auto'>
            Access and manage your notes with ease. Create,
            edit, and organize all your important information 
            in one place.
          </p>
        </center>
      )}
    </div>
  );
};

export default Home;
