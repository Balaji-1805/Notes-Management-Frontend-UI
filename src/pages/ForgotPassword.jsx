import React from 'react'
import API from '../api/api';
import { useState } from 'react';

const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const forgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/user/forgot-password', { email });
            console.log(res);
            setEmail('');
            if (res.status === 200) {
            alert('Email Sent Successfully, please check it');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to send reset link. Please try again.');
        }
        };
  return (
    <div>
        <div className="login-field bg-gray-100 w-[40%] m-auto my-10">
                <div className="flex min-h-full flex-1 flex-col justify-center px-1 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
                      Email Verification
                    </h2>
                  </div>
        
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
                    <form  className="space-y-6" onSubmit={forgotPassword}>
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
                            value={email}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm leading-6"
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                          />
                        </div>
                      </div>
        
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >  
                        Send Email Link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default ForgotPassword