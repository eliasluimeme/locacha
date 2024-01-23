'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function page() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  const router = useRouter();

  useEffect(() => {
    // Use navigator.geolocation to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handlePost = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACK_END_URL + "/post", { 
          title, content, location }, {
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
      <h1 className='mb-4 text-2xl'>
        What's on your mind?
      </h1>
      <div className=" bg-gray-900 p-3 rounded-lg shadow-md w-96">
        <input
          type="text"
          name="fullname"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white focus:outline-none focus:border-teal-950'
        />
        <textarea
          name="content"
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white focus:outline-none focus:border-teal-950'
        ></textarea>

        <button
          onClick={handlePost}
          className='w-full mb-4 p-3 bg-teal-950 text-white rounded hover:bg-blue-600'
        >
          Post
        </button>
      </div>
    </main>
  )
}
