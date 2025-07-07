import React from 'react'
import '../../App.css'
import CommentModal from './CommentModal'

function PostModal({ setPost }) {

    let postData = JSON.parse(localStorage.getItem('currentPost'))
    //console.log('postData:', postData);
    const postID = postData.postID;


  return (
    <div className='flex flex-col w-full justify-start items-end h-full relative' >
            <div className='flex w-full justify-start  ' onClick={() => {setPost(false)}} >
                <p className='text-xl font-bold text-center align-center cursor-pointer pt-[0.25rem] pb-[0.25rem] pl-4 pr-4 rounded-b-2xl rounded-tr-2xl hover:text-orange-300 hover:bg-gray-400 duration-150 ease-in-out' >&lt; --</p>
            </div>
        <div className="post flex flex-col w-full sticky shadow-[0_2px_2px_rgba(0,0,0,0.15)] pr-2 pl-2 pb-2">
            <div className="post-data flex justify-between items-center  ">
                <div className="username text-2xl">{postData.email}</div>
                <div className="time">{postData.time}</div>
            </div>
            <div className="content flex mt-2 mb-2">
                <p className='text-gray-400 leading-7 ' >
                    {postData.content}
                </p>
            </div>
            <div className="other flex justify-between items-center ">
                <div><button>likes</button></div>
            </div>
        </div>
        <div className="comments flex flex-col  w-[92%] pr-4  overflow-y-scroll " id="comments">
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