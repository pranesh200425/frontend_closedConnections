import React, { useState } from 'react'
import '../App.css'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')

  // Example user info
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const user = {
    username: userInfo.email,
    profilePic: 'https://ui-avatars.com/api/?name=You&background=random',
    bio: 'Just another user.',
    posts: posts.filter(p => p.user === 'You').length,
    joined: 'June 2025'
  }

  const localURL = 'http://localhost:3000'
  const backendURL = 'https://backend-closedconnections-tq1k.onrender.com'
  const getPosts = () => {
    fetch(`${localURL}/api/getpost`)
    .then(res => res.json())
    .then(data => {
      //console.log('Posts fetched:', data)
      setPosts(data)
    })
  }
  getPosts()
  
  const handlePost = (e) => {
    e.preventDefault()

    fetch(`${localURL}/api/getpost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Post created:', data)
    })
    .catch(err => console.error('Error creating post:', err))

    if (input.trim() === '') return
    setPosts([
      { id: Date.now(), user: 'You', content: input },
      ...posts
    ])
    setInput('')
  }

  return (
    <div className="flex p-2 h-screen pt-4 overflow-none bg-white w-[100%] ">
      {/* Sidebar for profile info */}
      <div className="hidden md:flex flex-col items-center w-72 mr-8 bg-white p-6 rounded-lg shadow border-dotted border-2 border-gray-300 h-fit self-start">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-200 object-cover"
        />
        <div className="text-2xl font-bold text-gray-700 mb-1">{user.username}</div>
        <div className="text-gray-500 mb-2 text-center">{user.bio}</div>
        <div className="flex flex-col gap-1 text-sm text-gray-600 w-full">
          <div>
            <span className="font-semibold">Posts:</span> {user.posts}
          </div>
          <div>
            <span className="font-semibold">Joined:</span> {user.joined}
          </div>
        </div>
      </div>
      {/* Main feed */}
      <div className="w-[75%] ">
        <form
          onSubmit={handlePost}
          className="bg-yellow-100 p-6 rounded-lg shadow border-dotted border-2 border-yellow-300 mb-8"
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
              className="border-2 border-dotted bg-white border-yellow-500 text-gray-500 px-4 py-2 hover:border-yellow-500 hover:bg-yellow-400 rounded-4xl hover:text-amber-50 transition"
            >
              Post
            </button>
          </div>
        </form>
        <div className=" flex flex-col h-9/12 space-y-4 overflow-y-scroll" id="feed" >
          {posts.map(post => (
            <div
              key={post._id}
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