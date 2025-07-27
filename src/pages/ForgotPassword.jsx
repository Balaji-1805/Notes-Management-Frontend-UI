import React, { useState } from 'react';
import API from '../api/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const forgotPassword = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/user/forgot-password', { email });

    if (res.data.message === "Reset link Sent") {
      alert("Reset link sent to your email.");
    } else {
      alert(res.data.message); // shows "Invalid Email, Please Enter Valid Email"
    }

  } catch (err) {
  if (err.response?.status === 400) {
    alert(err.response.data.message); // Invalid email message
  } else {
    alert("Server error. Please try again later.");
  }
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Email Verification
        </h2>
        <form onSubmit={forgotPassword} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition"
          >
            Send Email Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
