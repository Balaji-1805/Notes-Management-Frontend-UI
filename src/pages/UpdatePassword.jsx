import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';

const UpdatePassword = () => {
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const {token}=useParams();
    const updatePassword=async(e)=>{
        e.preventDefault();
        try {
            const res=await API.post(`user/reset-password/${token}`,
                {newPassword:password})
            console.log(res);
            if(res.status===200)
            {
                alert("Password Updated Successfully!");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert('Error Occured Please Enter password again');
        }
        setPassword('');
    }
  return (
    <div>
        <div className="login-field bg-gray-100 w-[40%] m-auto my-10">
                <div className="flex min-h-full flex-1 flex-col justify-center px-1 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
                      Reset Password
                    </h2>
                  </div>
        
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
                    <form  className="space-y-6" onSubmit={updatePassword}>
                      <div>
                        <label htmlFor="password" className="block text-sm leading-6 font-medium text-gray-900">
                          New Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="text"
                            required
                            autoComplete="new-pasword"
                            value={password}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm leading-6"
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                          />
                        </div>
                      </div>
        
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >  
                        Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default UpdatePassword