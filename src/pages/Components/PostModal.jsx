import React from 'react'
import '../../App.css'
import CommentModal from './CommentModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'


function PostModal({ setPost }) {
    
    useEffect(() => {
        getComments()
    }, [])
    
    const [input, setInput] = React.useState('')
    const [comments, setComments] = React.useState([])
    function handleInput(e) {
        e.preventDefault()
        setInput(e.target.value)
    }

    let postData = JSON.parse(localStorage.getItem('currentPost'))
    //console.log('postData:', postData);
    const postID = postData.postID;

   // const comments = []
    const localURL = 'http://localhost:5000' 
    const backendURL = 'https://backend-closedconnections-tq1k.onrender.com'
    async function getComments(){
        try {
            const res = await fetch(`${backendURL}/api/getcomments/${postID}`, {
                method : 'GET',
                headers: { 'Content-Type' : 'application/json' }
            })
            const data = await res.json()
            setComments(data)
            //console.log('Comments fetched:', data);
        } catch(err) {
            console.error('Error fetching comments:', err);
            console.log(err.message)
        }
    }
    getComments()

    async function postComment(){
            
        try { 
        const res =  await fetch(`${backendURL}/api/postcomment/${postID}`, {
            method: 'POST', 
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ content: input, email: postData.email })
        })
        const data = await res.json()
        console.log('Comment posted:', data)
        setInput('')
    } catch(err){
        alert(err.message)
    }
}

function handleEnter(e) {
    e.preventDefault()
    //console.log(e.key);
    
    if (e.key === 'Enter') {
        if (input.trim() === '') return
        postComment()
        getComments()
        setInput('')
    }
}

//console.log(comments)
  return (
    <div className='flex flex-col w-full justify-start items-end h-full relative ' >
            <div className='flex w-full justify-start ' onClick={() => {setPost(false)}} >
                <p className='text-lg font-bold text-center align-center cursor-pointer pt-[0.25rem] pb-[0.25rem] pl-4 pr-4 rounded-2xl rounded-tr-2xl hover:text-gray-400 hover:bg-gray-100 duration-150 ease-in-out' ><FontAwesomeIcon icon={faBackward} /></p>
            </div>
        <div className="post flex flex-col w-full sticky shadow-[0_2px_2px_rgba(0,0,0,0.15)] pr-2 pl-2 pb-2">
            <div className="post-data flex justify-between items-center  ">
                <div className="username flex text-xl">{postData.email}</div>
                <div className="time">{postData.time}</div>
            </div>
            <div className="content flex mt-2 mb-2">
                <p className='text-gray-400 leading-7 ' >
                    {postData.content}
                </p>
            </div>
            <div className="other flex justify-between items-center ">
                <div className='flex' ><button className='flex flex-col cursor-pointer text-pink-300 rounded hover:text-gray-950 p-2 hover:bg-pink-300 ' ><FontAwesomeIcon icon={faHeart} /></button></div>
            </div>
        </div>
        <div className="comments flex flex-col flex-11/12  w-[92%] pr-4  overflow-y-scroll " id="comments">
            {
            comments.length > 0 ? comments.map(comment => (
                <CommentModal content={comment.content} key={comment.createdAt} time={comment.createdAt} email={comment.email} />
                //console.log(comment)
            )) 
             : <div className='flex flex-col items-center justify-center h-full w-full' >
                <p className='text-3xl text-gray-400 text-center' >No comments yet! :\</p>
             </div> 
            }
        
        </div>
        <div className="comment-box flex items-center justify-center shadow-2xl shadow-black border-t-gray-300 w-full ">
            <input type="text" className='flex w-[75%] p-3  outline-none ' placeholder="Write a comment..." value={input} onChange={handleInput} /* onKeyDown={(e) => handleEnter(e)} */ />
            <button className='flex w-[25%] justify-center h-full items-center hover:cursor-pointer tex-xl font-bold  bg-amber-100 hover:bg-amber-200 ease-in-out duration-300 transition-all border-2 '  onClick={postComment} >Post</button>
        </div>
    </div>
  )
}

export default PostModal