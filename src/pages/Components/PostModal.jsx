import React from 'react'
import '../../App.css'
import CommentModal from './CommentModal'

function PostModal() {
  return (
    <div className='flex flex-col w-full justify-end items-end h-full relative' >
        <div className="post flex flex-col sticky shadow-[0_2px_2px_rgba(0,0,0,0.15)] pr-2 pl-2 pb-2">
            <div className="post-data flex justify-between items-center  ">
                <div className="username text-2xl">Example username</div>
                <div className="time">2 hours ago</div>
            </div>
            <div className="content flex mt-2 mb-2">
                <p className='text-gray-400 leading-7 ' >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam quibusdam voluptatum rem, veritatis quod obcaecati iure eius similique culpa unde? Placeat fugiat consequuntur in dignissimos at totam obcaecati nobis quia!
                </p>
            </div>
            <div className="other flex justify-between items-center ">
                <div><button>likes</button></div>
            </div>
        </div>
        <div className="comments flex flex-col h-96 w-[92%] pr-4  overflow-y-scroll " id="comments">
            <CommentModal />
            <CommentModal />
            <CommentModal />
            <CommentModal />
            <CommentModal />

        </div>
        <div className="comment-box flex items-center justify-center shadow-2xl shadow-black border-t-gray-300 w-full ">
            <input type="text" className='flex w-[75%] p-3  outline-none ' placeholder="Write a comment..." />
            <button className='flex w-[25%] justify-center h-full items-center hover:cursor-pointer tex-xl font-bold  bg-amber-100 hover:bg-amber-200 ease-in-out duration-300 transition-all border-2 ' >Post</button>
        </div>
    </div>
  )
}

export default PostModal