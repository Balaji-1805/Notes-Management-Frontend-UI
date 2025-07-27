import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`user/reset-password/${token}`, { newPassword: password });
      if (res.status === 200) {
        alert("Password Updated Successfully!");
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert('Error Occurred. Please try again.');
    }
    setPassword('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        <form onSubmit={updatePassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
