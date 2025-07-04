import { useInView } from 'react-intersection-observer'

function Post({content, keey, email, time, postid}) {

    const { ref, inView } = useInView()

 {/* <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow border-dotted border-2 border-gray-300"
            >
              <div className="font-bold text-gray-500 mb-1">{post.user}</div>
              <div className="text-gray-700">{post.content}</div>
            </div> */}
  const postID = postid;

  return (
    <div className="wrapper" key={keey} ref={ref} >
    {inView && (
        <div  className='flex w-full flex-col rounded-2xl border-2 p-2 border-dotted border-gray-300' >
        <div className="postMeta-data flex items-center justify-between mb-2">
            <h3 className='text-xl' >{email || 'user'}</h3>
            <span>options</span>
        </div>
        <div className="content flex p-2  ">
            <p className='text-gray-400 leading-7 ' >
                {content}
            </p>
        </div>
        <div className="buttons flex mt-2  justify-around ">
            <div><button className='flex justify-center rounded-[3rem] items-center bg-pink-300 pt-3 pb-3 pr-4 pl-4' >like</button></div>
            <div><button className='flex bg-amber-200 justify-center items-center pt-3 pb-3 pr-4 pl-4' >comment</button></div>
            <div className='flex justify-end items-end' >
              <p className='text-end text-purple-400 text-sm' >{time}</p>
            </div>
      </div>
    </div>)}
    </div>
  )
}

export default Post