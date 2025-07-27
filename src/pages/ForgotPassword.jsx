import React, { useState } from 'react';
import API from '../api/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isClicked,setIsClicked]=useState(false);

  const forgotPassword = async (e) => {
  e.preventDefault();
  try {
    setIsClicked(true);
    const res = await API.post('/user/forgot-password', { email });
    const data = res.data;

    if (data.message === "Reset link Sent") {
      alert("Password reset link has been sent to your email.");
    } else {
      alert(data.message); // handles "Invalid Email, Please Enter Valid Email"
    }
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    alert('Failed to send reset link. Please try again.');
  }
  finally
  {
    setIsClicked(false);
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

          <button disabled={isClicked}
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition"
          >
            {isClicked? "Sending Email":"Send Email Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
