import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/api.js';
const Login = () => {
  const navigate=useNavigate();
  const [inputData,setInputData]=useState({
    email:"",
    password:""
  })
  const formHandle=async(e)=>
  {
    e.preventDefault();
    try
    {
      const res=await API.post("/user/login",
        {
          email:inputData.email,
          password:inputData.password
        }
      );
      localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.dispatchEvent(new Event("userChanged"));
      alert('Login Successful!');
      navigate('/');
    }
    catch(err)
    {
      console.log("Error in login page:",err);
      if(err.response?.data?.message)
      {
        alert(err.response.data.message);
      }
      else
      {
        alert("Login Failed");
      }
      setInputData({...inputData,email:"",password:""});
    }
  }

  return (
    <div>
      <div className="login-field bg-gray-100 w-[40%] m-auto my-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-1 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={formHandle}>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm leading-6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={inputData.email}
                    onChange={(e)=>{
                      setInputData({...inputData,email:e.target.value});
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm leading-6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link className="font-semibold text-indigo-600 hover:text-indigo-500" 
                    to='/forgot-password'
                    >Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={inputData.password}
                    required
                    autoComplete="current-password"
                     onChange={(e)=>{
                      setInputData({...inputData,password:e.target.value});
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm leading-6 text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
