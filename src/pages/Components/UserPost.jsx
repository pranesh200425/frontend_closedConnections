import React, { useContext } from 'react'
import { Context } from '../../Context';
import { formatTime } from './Post';

function UserPost({  
  content,
  keey,
  email,
  time,
  postid,
  likes,
  comments,
  user,
  change,
  render,
  userid,
  setPost
}) {

    const { post, updatePost, session } = useContext(Context);

    function openPostModal(e) {
        e.preventDefault();
        const postthis = {
          content,
          postid,
          comments,
          user,
            likes,
            userid,
            email,
            time: formatTime(time),
        };
        updatePost(postthis);
        setPost(true);
        change(!render);
      }
    

  return (
    <div className='flex flex-col border-b border-dotted border-gray-300 cursor-pointer mt-2 mb-2 ' onClick={openPostModal} >
        <div className='text-gray-400' >{content}</div>
    </div>
  )
}

export default UserPost