'use client'


// SIGN IN PAGE


import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { sign } from 'crypto'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'


export default function page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACK_END_URL + "/auth/login", { 
          email, password }, {
            withCredentials: true,
        }
      );
      if (response.status === 200) {
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
    <main className='h-screen flex justify-center items-center bg-gray-950 py-6'>
      <div className=" bg-gray-900 p-3 rounded-lg shadow-md w-96">
        <input
          type="email"
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-950'
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
          onClick={handleSignIn}
          className='w-full mb-4 p-3 bg-teal-950 text-white rounded hover:bg-blue-600'
        >
          Sign In
        </button>
        <p className='mb-4 p-3 text-sm text-gray-300'> 
          Don't have an account? <Link href={"/SignUp"} className=' text-base text-white'>Sign Up</Link>
        </p>
      </div>
    </main>
  )
}
