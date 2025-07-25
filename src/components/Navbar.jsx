import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!storedUser?.userName);
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen for login/logout events
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener("userChanged", handleStorageChange);

    return () => window.removeEventListener("userChanged", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userChanged")); // tell others
    navigate("/");
  };

  return (
    <header className="flex justify-between align-middle py-8 px-6 bg-red-300">
      <Link to="/" className="text-2xl font-bold">Notes Manager</Link>
      <ul className="flex gap-10 text-xl font-medium">
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/notes">View Notes</Link></li>
            <li><Link to="/createNotes">Create Notes</Link></li>
            <li><button className="hover:cursor-pointer" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
