import React from 'react'

function PostModal() {
  return (
    <div className='flex flex-col w-full' >
        <div className="post flex flex-col ">
            <div className="post-data flex">
                <div className="username">Example username</div>
                <div className="time">2 hours ago</div>
            </div>
            <div className="content">
                <p className='text-gray-400 leading-7 ' >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam quibusdam voluptatum rem, veritatis quod obcaecati iure eius similique culpa unde? Placeat fugiat consequuntur in dignissimos at totam obcaecati nobis quia!
                </p>
            </div>
            <div className="other">
                <div><button>likes</button></div>
                <div><button>Shares</button></div>
            </div>
        </div>
        <div className="comments">

        </div>
        <div className="comment-box">
            <input type="text" placeholder="Write a comment..." />
            <button>Post</button>
        </div>
    </div>
  )
}

export default PostModal