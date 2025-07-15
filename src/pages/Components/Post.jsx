import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

function Post({
  content,
  keey,
  email,
  time,
  postid,
  setPost,
  likes,
  comments,
  user,
}) {
  const { ref, inView } = useInView();

  {
    /* <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow border-dotted border-2 border-gray-300"
            >
              <div className="font-bold text-gray-500 mb-1">{post.user}</div>
              <div className="text-gray-700">{post.content}</div>
            </div> */
  }

  const formatTime = (time) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();
    //const currentTime = currentDate.getTime()

    const postDate = new Date(time);
    const postYear = postDate.getFullYear();
    const postMonth = postDate.getMonth();
    const postDay = postDate.getDate();
    const postHour = postDate.getHours();
    const postMinute = postDate.getMinutes();
    const postSecond = postDate.getSeconds();

    if (currentYear != postYear)
      return `${postDay} ${months[postMonth]} ${postYear}`;
    else if (postMonth == currentMonth && postDate - currentDate < 7 &&  postDay != currentDay)
      return `${postDay - currentDay} `;
    else if (postHour == currentHour && currentMinute != postMinute)
      return `${currentMinute - postMinute}m ago`;
    else if (postMinute == currentMinute)
      return `${currentSecond - postSecond}s ago`;
    else if (currentYear == postYear) return `${postDay} ${months[postMonth]} `;
  };

  console.log(formatTime(time), content);

  const postID = postid;

  function openPostModal(e) {
    e.preventDefault();
    localStorage.setItem(
      "currentPost",
      JSON.stringify({ content, email, time, postID })
    );
    setPost(true);
  }

  return (
    <div className="wrapper" key={keey} ref={ref}>
      {inView && (
        <div
          className="flex w-full flex-col "
          onClick={(e) => openPostModal(e)}
        >
          <div className="flex w-full flex-col pr-2 pl-2 border-b  border-dotted border-gray-300">
            <div className="postMeta-data flex items-center justify-between ">
              <h3 className="text-lg font-semibold text-gray-600 ">{user}</h3>
              <span className="cursor-pointer">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
            </div>
            <div className="content flex pt-[0.5rem] pb-2  ">
              <p className="text-gray-400 leading-7 cursor-pointer w-full ">
                {content}
              </p>
            </div>
            <div className="buttons flex mt-2  justify-around ">
              <div>
                <button className="flex justify-center rounded items-center font-bold ease-in-out duration-150 cursor-pointer text-pink-300 hover:text-gray-950 hover:bg-pink-300 pt-2 pb-2 pr-2 pl-2">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="flex p-2">{likes}</span>
                </button>
              </div>
              <div>
                <button className="flex text-amber-300 hover:text-amber-800 ease-in-out duration-150 rounded hover:bg-amber-200 cursor-pointer justify-center items-center font-bold pt-2 pb-2 pr-2 pl-2">
                  <FontAwesomeIcon icon={faComment} />
                  <span className="flex p-2">{comments}</span>
                </button>
              </div>
              <div className="flex justify-end items-end">
                <p className="text-end text-purple-400 text-sm">{formatTime(time)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
