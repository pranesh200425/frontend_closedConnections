import { useInView } from 'react-intersection-observer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function Post({content, keey, email, time, postid, setPost}) {

    const { ref, inView } = useInView()

 {/* <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow border-dotted border-2 border-gray-300"
            >
              <div className="font-bold text-gray-500 mb-1">{post.user}</div>
              <div className="text-gray-700">{post.content}</div>
            </div> */}
  const postID = postid;

 function openPostModal(e)  {
    e.preventDefault()
    localStorage.setItem('currentPost', JSON.stringify({ content, email, time, postID }))
    setPost(true)
  }

  return (
    <div className="wrapper" key={keey}  ref={ref} >
    {inView && (
    <div className='flex w-full flex-col ' onClick={(e) => openPostModal(e)}  >
        <div  className='flex w-full flex-col pr-2 pl-2 border-b  border-dotted border-gray-300'  >
        <div className="postMeta-data flex items-center justify-between ">
            <h3 className='text-lg font-semibold text-gray-600 ' >{email}</h3>
            <span className='cursor-pointer' ><FontAwesomeIcon icon={faEllipsisVertical} /></span>
        </div>
        <div className="content flex pt-[0.5rem] pb-2  ">
            <p className='text-gray-400 leading-7 cursor-pointer w-full ' >
                {content}
            </p>
        </div>
        <div className="buttons flex mt-2  justify-around ">
            <div><button className='flex justify-center rounded items-center font-bold ease-in-out duration-150 cursor-pointer text-pink-300 hover:text-gray-950 hover:bg-pink-300 pt-2 pb-2 pr-2 pl-2' >
              <FontAwesomeIcon icon={faHeart} />
              </button></div>
            <div><button className='flex text-amber-300 hover:text-amber-800 ease-in-out duration-150 rounded hover:bg-amber-200 cursor-pointer justify-center items-center font-bold pt-2 pb-2 pr-2 pl-2' >
              <FontAwesomeIcon icon={faComment} />
              </button></div>
            <div className='flex justify-end items-end' >
              <p className='text-end text-purple-400 text-sm' >{time}</p>
            </div>
      </div>
    </div>

    </div>
  )}
    </div>
  )
}

export default Post