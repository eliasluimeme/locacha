'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

//HOME PAGE
type questionType = {
  title: string,
  content: string,
  latitude: number,
  longitude: number
}

export default function page() {
  const [questions, setQuestions] = useState<questionType[]>([]);
  const router = useRouter()

  useEffect(( ) => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BACK_END_URL + '/posts', {
          withCredentials: true,
        })
        if (response.status === 200) {
          setQuestions(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchQuestions()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACK_END_URL + '/logout', {
        withCredentials: true,
      })

      if (response.status === 200) {
        router.push('SignIn')
      }
    } catch (err) {

    }
  }



  return (
    <main className='h-full bg-gray-950'>
      <div className='flex flex-col max-w-[47rem] mx-auto px-2'>
        {/* NOTIFICATION */}
        <div className='py-8 flex justify-between items-center'>
          {/* CREATE QUESTION */}
          <div className='w-[300px] md:w-[500px]'>
            <Link
              href='/post'

              className='w-full p-3 border-2 border-gray-800 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-800 cursor-pointer flex items-center text-opacity-25'
            >
              Create question
            </Link>
            {/* <input

              type="post"
              name='post'
              placeholder='Create question'
              // value={question}
              // onChange={(e) => setQuestion(e.target.value)}
              className='w-[500px] mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-800'
            /> */}
          </div>
          <button onClick={handleLogout}>Logout</button>

          {/* <Image
            src='/notif.png'
            alt='notif'
            width={30}
            height={30}
          /> */}
        </div>
        <div className="w-full rounded-lg shadow-md flex flex-col">
          <div className='flex flex-col gap-4'>
            {
              questions.map((question, i) => (
                <div key={i} className='flex flex-col border-2 border-gray-700 rounded bg-gray-900 gap-5 p-6'>
                  <h2 className=' text-2xl capitalize break-words'>{question.title}</h2>
                  <p className='break-words'>{question.content}</p>
                  <p className=''>location: {question.latitude}, {question.longitude} </p>
                  {/* <p className=''>likes: {question.likes}</p>
                  <p className=''>{question.date.toLocaleDateString()}</p> */}
                  <div className='flex flex-col gap-6'>
                  {/* comments:
                    {
                      question.comments.map((comment) => (
                        <div>
                        <p>{comment.date.toLocaleDateString()}</p>
                        <p>{comment.text}</p>
                        <p>{comment.molah}</p>
                        </div>
                      ))
                    } */}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main >
  )
}
