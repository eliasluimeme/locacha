'use client'

import axios from 'axios'
// SIGN UP PAGE

import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullname] = useState('')

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACK_END_URL + "/auth/signup", { 
          fullName, email, password }, {
            withCredentials: true,
        }
      );
      if (response.status === 201) {
        successToast();
        router.push('/');
        return;
      }
    }
    catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  }

  const successToast = () => {
    toast.success('Success');
  };

  return (
    <main className='h-screen flex flex-col justify-center items-center bg-gray-950 py-6'>
      <div className=" bg-gray-900 p-3 rounded-lg shadow-md w-96">
        <input
          type="text"
          name="fullname"
          placeholder='Full Name'
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
          className='w-full mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white focus:outline-none focus:border-teal-950'
        />
        <input
          type="email"
          name="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white focus:outline-none focus:border-teal-950'
        />
        <input
          type="password"
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white focus:outline-none focus:border-teal-950'
        />

        <button
          onClick={handleSignUp}
          className='w-full mb-4 p-3 bg-teal-950 text-white rounded hover:bg-blue-600'
        >
          Sign Up
        </button>
        <p className='mb-4 p-3 text-sm text-gray-300'>
          Have an account? <Link href={"/SignIn"} className=' text-base text-white'>Sign In</Link>
        </p>
      </div>
    </main>
  )
}
