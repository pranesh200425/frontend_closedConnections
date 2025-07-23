import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../Context";
import { supabase } from "../../../../supa_auth";

function DeleteButton({ userid, postid, render, change }) {
  const [show, setShow] = React.useState(false);
  const [modal, showModal] = React.useState(false);
  const { session } = useContext(Context);
  // console.log(session.user.id, userid);
  useEffect(() => {
    if (userid === session.user.id) setShow(true);
  }, []);

  const deletePost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postid)
      .select();
    if (error) {
      console.error("Error deleting post:", error);
    } else {
      console.log("Post deleted successfully:", data);
      showModal(false);
      change(!render);
    }
  };

  return (
    <span className="cursor-pointer relative ">
      {/* 
      <FontAwesomeIcon icon={faEllipsisVertical} /> */}
      {/* 
      {show && (
        <div className="relative " onClick> */}
      {!modal ? (
        <div className="flex absolute right-0 top-0 bg-white p-2 font-semibold">
          <button onClick={() => showModal(true)}>Delete</button>
        </div>
      ) : (
        <div className="flex flex-col w-3xs bg-white justify-center z-[10000] items-center absolute right-[50%]  ">
          <p className="flex font-semibold text-xl p-2">
            Are you sure want to delete the post
          </p>
          <div className="flex justify-around items-center w-full p-2">
            <button
              className="border p-2 rounded bg-red-600 text-white hover:bg-white hover:text-red-600 ease-in-out duration-200 "
              onClick={deletePost}
            >
              yes
            </button>
            <button
              className="border p-2 rounded bg-white hover:bg-black hover:text-white ease-in-out duration-200"
              onClick={() => showModal(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      {/* 
        </div>
      )} */}
    </span>
  );
}

export default DeleteButton;
