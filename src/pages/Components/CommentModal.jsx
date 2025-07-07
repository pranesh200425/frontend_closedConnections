import React from 'react'

function CommentModal() {
  return (
    <div className='flex flex-col mt-2 mb-2 ' >
      <div className="comment flex justify-between items-center mb-2">
                <div className="username font-bold  text-amber-600 p-2 ">Example username</div>
                <div className="time text-sm">2 hours ago</div>
            </div>
            <div className="content flex mt-2 mb-2">
                <p className='text-gray-400 leading-7 ' >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam quibusdam voluptatum rem, veritatis quod obcaecati iure eius similique culpa unde? Placeat fugiat consequuntur in dignissimos at totam obcaecati nobis quia!
                </p>
            </div>
        <div>
          <button className='flex cursor-pointer hover:bg-violet-200 p-2 rounded ease-in-out duration-150 text-purple-400 hover:text-purple-950 font-bold' >reply</button>
        </div>
    </div>
  )
}

export default CommentModal