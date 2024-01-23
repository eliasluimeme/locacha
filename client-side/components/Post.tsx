import React from 'react'

export default function Post() {
  return (
    <main>
      <input
        type="post"
        name='post'
        placeholder='Create question'
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        className='mb-4 p-3 border-2 border-gray-800 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-800'
      />
    </main>
  )
}
