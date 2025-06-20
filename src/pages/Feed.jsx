import React, { useState } from 'react'

export default function Feed() {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Alice', content: 'Hello world!' },
    { id: 2, user: 'Bob', content: 'This is my first post.' }
  ])
  const [input, setInput] = useState('')

  const handlePost = (e) => {
    e.preventDefault()
    if (input.trim() === '') return
    setPosts([
      { id: Date.now(), user: 'You', content: input },
      ...posts
    ])
    setInput('')
  }

  return (
     <div className="flex  justify-center min-h-screen pt-4 bg-white">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handlePost}
          className="bg-white p-6 rounded-lg shadow border-dotted border-2 border-gray-300 mb-8"
        >
          
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 outline-none py-2 border-2 border-gray-300 border-dotted rounded-3xl "
              placeholder="What's on your mind?"
              value={input}
              onChange={e => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="border-2 border-dotted border-yellow-500 text-gray-500 px-4 py-2 rounded hover:border-yellow-500 hover:bg-yellow-400 hover:text-amber-50 transition"
            >
              Post
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow border-dotted border-2 border-gray-300"
            >
              <div className="font-bold text-gray-500 mb-1">{post.user}</div>
              <div className="text-gray-700">{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}