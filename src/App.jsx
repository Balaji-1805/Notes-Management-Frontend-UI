import React, { useState } from "react"
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register"
import Navbar from "./components/Navbar";
import Notes from "./pages/Notes";
import NoteCreate from "./pages/NoteCreate"
import ViewNote from "./pages/ViewNote";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
const App = () => {
  //state variable 
  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createNotes" element={<NoteCreate />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/:id" element={<ViewNote  />} />
      <Route path="/forgot-password/" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<UpdatePassword />} />
    </Routes>
    </>
  )
}

export default App