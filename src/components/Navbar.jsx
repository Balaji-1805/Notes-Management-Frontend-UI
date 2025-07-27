import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!storedUser?.userName);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("userChanged", checkLoginStatus);
    return () => window.removeEventListener("userChanged", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  return (
    <header className="bg-red-300 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">Notes Manager</Link>

        <button 
          className="md:hidden text-3xl focus:outline-none z-50" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Signup</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/notes">View Notes</Link></li>
              <li><Link to="/createNotes">Create Notes</Link></li>
              <li><button className="hover:underline" onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-gray-300 shadow-lg transform transition-transform z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col p-6 text-lg font-medium space-y-4 mt-16">
            {!isLoggedIn ? (
              <>
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setMenuOpen(false)}>Signup</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/notes" onClick={() => setMenuOpen(false)}>View Notes</Link></li>
                <li><Link to="/createNotes" onClick={() => setMenuOpen(false)}>Create Notes</Link></li>
                <li><button onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button></li>
              </>
            )}
          </ul>
        </div>

        {/* Background dim when menu is open */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-30 z-30"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
