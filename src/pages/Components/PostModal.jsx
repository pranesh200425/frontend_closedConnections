import React from 'react'
import '../../App.css'
import CommentModal from './CommentModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { formatTime } from './Post'
import { supabase } from '../../../supa_auth'

function PostModal({ setPost }) {

    const [input, setInput] = React.useState('')
    const [comments, setComments] = React.useState([])

const postData = JSON.parse(localStorage.getItem('currentPost'))
function handleEnter(e) {
    e.preventDefault()
    
    if (e.key === 'Enter') {
        if (input.trim() === '') return
        postComment()
        setInput('')
    }
}

const postComment = async () => {
    const {data: commentData, error:commentError} = await supabase
    .from('posts')
    .select('comments')
    .eq('id', postData.postid)
    
    commentData[0].comments.push('haha nothing')
    console.log(commentData[0]);
    
    const comment = {
        user : postData.user,
        createdAt: new Date(),
        replies : [],
        likes : 0,
        content : input
    }
    const { data, error } = await supabase
    .from('posts')
    .update({comments : commentData[0]})
    .eq('id', postData.postid)
    console.log('commented', error); 
    
}

const getComments = async () => {
    const {data, error} = await supabase
    .from('posts')
    .select('comments')
    .eq('id', postData.postid)
    setComments(data[0].comments)
    console.log(comments);
}

useEffect(()=> {
    getComments()
}, [])
//console.log(postData);
//console.log(comments);

  return (
    <div className='flex flex-col w-full justify-start items-end h-full relative ' >
            <div className='flex w-full justify-start ' onClick={() => {setPost(false)}} >
                <p className='text-lg font-bold text-center align-center cursor-pointer pt-[0.25rem] pb-[0.25rem] pl-4 pr-4 rounded-2xl rounded-tr-2xl hover:text-gray-400 hover:bg-gray-100 duration-150 ease-in-out' ><FontAwesomeIcon icon={faBackward} /></p>
            </div>
        <div className="post flex flex-col w-full sticky shadow-[0_2px_2px_rgba(0,0,0,0.15)] pr-2 pl-2 pb-2">
            <div className="post-data flex justify-between items-center  ">
                <div className="username flex text-xl"> {postData.user}</div>
                <div className="time flex p-2 text-purple-400 font-semibold text-sm">{formatTime(postData.time)}</div>
            </div>
            <div className="content flex mt-2 mb-2">
                <p className='text-gray-400 leading-7 ' >
                   {postData.content}
                </p>
            </div>
            <div className="other flex justify-between items-center ">
                <div className='flex  text-pink-300 rounded  p-2 ' ><button className='flex justify-center items-center  text-pink-300 hover:bg-pink-300 cursor-pointer hover:text-gray-950 p-2 rounded-md ' ><FontAwesomeIcon icon={faHeart} />
                  </button>
                  <span className="flex p-2">{postData.likes}</span>
                </div>
            </div>
        </div>
        <div className="comments flex flex-col flex-11/12  w-[92%] pr-4  overflow-y-scroll " id="comments">
            {
            comments.length > 0 ? comments.map(comment => (
                <CommentModal content={comment} key={comment.createdAt} time={comment.createdAt} email={comment.email} />
                //console.log(comment)
            )) 
             : <div className='flex flex-col items-center justify-center h-full w-full' >
                <p className='text-3xl text-gray-400 text-center' >No comments yet! :\</p>
             </div> 
            } 
        
        </div>
        <div className="comment-box flex items-center justify-center shadow-2xl shadow-black border-t-gray-300 w-full ">
            <input type="text" className='flex w-[75%] p-3  outline-none ' placeholder="Write a comment..." value={input}  onChange={(e) => {setInput(e.target.value)}}  /* onKeyDown={(e) => handleEnter(e)} */ />
            <button className='flex w-[25%] justify-center h-full items-center hover:cursor-pointer tex-xl font-bold  bg-amber-100 hover:bg-amber-200 ease-in-out duration-300 transition-all border-2 '  onClick={postComment}  >Post</button>
        </div>
    </div>
  )
}

export default PostModal