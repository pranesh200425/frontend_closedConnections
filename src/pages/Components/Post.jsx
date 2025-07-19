import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../supa_auth";
import { useEffect, useState } from "react";

export const formatTime = (time) => {
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
  else if (
    postMonth == currentMonth &&
    postDate - currentDate < 7 &&
    postDay != currentDay
  )
    return `${currentDay - postDay}d ago `;
  else if (postHour != currentHour) return `${currentHour - postHour}h ago`;
  else if (postHour == currentHour && currentMinute != postMinute)
    return `${currentMinute - postMinute}m ago`;
  else if (postMinute == currentMinute)
    return `${currentSecond - postSecond}s ago`;
  else if (currentYear == postYear) return `${postDay} ${months[postMonth]} `;
};

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
  change,
  render,
}) {
  const { ref, inView } = useInView();

  // const [like, updateLike] = useState(likes)

  // console.log(formatTime(time), content);

  const postID = postid;

  function openPostModal(e) {
    e.preventDefault();
    localStorage.setItem(
      "currentPost",
      JSON.stringify({
        content,
        keey,
        email,
        time,
        postid,
        setPost,
        likes,
        comments,
        user,
      })
    );
    setPost(true);
  }

  const [like, updateLike] = useState(likes);
  const handleLike = async () => {
    //console.log(like);
    
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: like + 1 })
      .eq("id", postid);
    //console.log(data, error);
    //console.log(like);
    updateLike(like + 1);
    //console.log(error);
    //console.log("works");
    change(!render);
  };

  return (
    <div className="wrapper" key={keey} ref={ref}>
      {inView && (
        <div className="flex w-full flex-col ">
          <div className="flex w-full flex-col pr-2 pl-2 border-b  border-dotted border-gray-300">
            <div className="postMeta-data flex items-center justify-between ">
              <h3 className="text-lg font-semibold text-gray-600 ">{user}</h3>
              <span className="cursor-pointer">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
            </div>
            <div
              className="content flex pt-[0.5rem] pb-2  "
              onClick={(e) => openPostModal(e)}
            >
              <p className="text-gray-400 leading-7 cursor-pointer w-full ">
                {content}
              </p>
            </div>
            <div className="buttons flex mt-2  justify-around ">
              <div className="flex  text-pink-300 rounded  p-2 ">
                <button
                  className="flex justify-center rounded items-center font-bold ease-in-out duration-150 cursor-pointer text-pink-300 hover:text-gray-950 hover:bg-pink-300 p-2"
                  onClick={handleLike}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <span className="flex p-2 font-bold ">{like}</span>
              </div>
              <div className="flex  text-amber-300 rounded  p-2">
                <button
                  className="flex text-amber-300 hover:text-amber-800 ease-in-out duration-150 rounded hover:bg-amber-200 cursor-pointer justify-center items-center font-bold p-2"
                  onClick={(e) => openPostModal(e)}
                >
                  <FontAwesomeIcon icon={faComment} />
                </button>
                <span className="flex p-2 font-bold">{comments}</span>
              </div>
              <div className="flex justify-end items-end p-2">
                <p className="text-end text-purple-400 font-semibold p-2 text-sm">
                  {formatTime(time)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
