import React from "react";
import "../../App.css";
import CommentModal from "./CommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";
import { formatTime } from "./Post";
import { supabase } from "../../../supa_auth";
import { Context } from "../../Context";

function PostModal({ setPost, change }) {
  const [input, setInput] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [userdata, setuserdata] = React.useState({});
  const [displayPost, setCurrentPost] = React.useState({});
    const { post, updatePost } = useContext(Context);
  

  const postData = JSON.parse(localStorage.getItem("currentPost"));

  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", post);
      
      const thisPost = data[0];
      setCurrentPost(thisPost);
    };
        getPost();
  }, [post]);


  const [like, updateLike] = React.useState(displayPost.likes);
  const handleLike = async () => {

    const { data, error } = await supabase
      .from("posts")
      .update({ likes: like + 1 })
      .eq("id", post)
      .select()

    updateLike(like + 1);
  };

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setuserdata(user);
  }
  
  const postComment = async () => {
    if (input === "") return null;
    const { data, error } = await supabase.from("comments").insert({
      post_id: post,
      user_id: userdata.id,
      content: input,
      likes: 0,
      user: userdata.user_metadata.username,
    });

    const { data: getpostdata, error: getposterror } = await supabase
      .from("posts")
      .select("*")
      .eq("id", post);
    const postComments = getpostdata[0].comments;
    const { data: postdata, error: posterror } = await supabase
      .from("posts")
      .update({ comments: postComments + 1 })
      .eq("id", post)
      .select();

    console.log(postData, posterror);
    change(false);
    setInput("");
    getComments();
  };

  const getComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post)
      .order('id', { ascending: false })
    setComments(data);
    updateLike(displayPost.likes);
  };

  useEffect(() => {
    getComments();
    getUser();
  }, []);

  return (
    <div className="flex flex-col w-full justify-start items-end h-full relative ">

      <div
        className="flex w-full justify-start "
        onClick={() => {
          setPost(false);
        }}
      >
        <p className="text-lg font-bold text-center align-center cursor-pointer pt-[0.25rem] pb-[0.25rem] pl-4 pr-4 rounded-2xl rounded-tr-2xl hover:text-gray-400 hover:bg-gray-100 duration-150 ease-in-out">
          <FontAwesomeIcon icon={faBackward} />
        </p>
      </div>
      <div className="post flex flex-col w-full sticky shadow-[0_2px_2px_rgba(0,0,0,0.15)] pr-2 pl-2 pb-2">
        <div className="post-data flex justify-between items-center  ">
          <div className="username flex text-xl"> {displayPost.username}</div>
          <div className="time flex p-2 text-purple-400 font-semibold text-sm">
            {post.created_at && formatTime(displayPost.created_at)}
          </div>
        </div>
        <div className="content flex mt-2 mb-2">
          <p className="text-gray-400 leading-7 ">{displayPost.content ? displayPost.content : 'Loading...'}</p>
        </div>
        <div className="other flex justify-between items-center ">
          <div
            className="flex  text-pink-300 rounded  p-2 "
            onClick={handleLike}
          >
            <button className="flex justify-center items-center  text-pink-300 hover:bg-pink-300 cursor-pointer hover:text-gray-950 p-2 rounded-md ">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <span className="flex p-2">{like}</span>
          </div>
        </div>
      </div>
      <div
        className="comments flex flex-col flex-11/12  w-full pr-4  overflow-y-scroll "
        id="comments"
      >
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentModal
              content={comment.content}
              key={comment.create_at}
              time={formatTime(comment.created_at)}
              likes={comment.likes}
              post_id={comment.post_id}
              user_id={comment.user_id}
              user={comment.user}
            />
            //console.log(comment)
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <p className="text-3xl text-gray-400 text-center">
              No comments yet! :\
            </p>
          </div>
        )}
      </div>
      <div className="comment-box flex items-center justify-center shadow-2xl shadow-black border-t-gray-300 w-full ">
        <input
          type="text"
          className="flex w-[75%] p-3  outline-none "
          placeholder="Write a comment..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") postComment();
          }}
        />
        <button
          className="flex w-[25%] justify-center h-full items-center hover:cursor-pointer tex-xl font-bold  bg-amber-100 hover:bg-amber-200 ease-in-out duration-300 transition-all border-2 "
          onClick={(e) => postComment(e)}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostModal;
