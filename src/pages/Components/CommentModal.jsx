import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function CommentModal({user, content, time, post_id, user_id}) {
  return (
    <div className='flex flex-col mt-2 mb-2 border-b  border-dotted border-gray-300' >
      <div className="comment flex justify-between items-center ">
                <div className="username font-bold  text-amber-600  ">{user}</div>
                <div className="time font-semibold text-sm">{time}</div>
            </div>
            <div className="content flex pt-[0.25rem] ">
                <p className='text-gray-400 leading-7 ' >
                    {content}
                </p>
            </div>
        <div>
          <button className='flex  w-full pt-[0.25rem] pb-[0.25rem] items-center ' >
            <h3 className='text-center rounded cursor-pointer ease-in-out duration-150  hover:bg-violet-200 p-[0.5rem] text-purple-400 hover:text-purple-950 font-bold' > <FontAwesomeIcon icon={faHeart} /> </h3>
          </button>
        </div>
    </div>
  )
}

export default CommentModal