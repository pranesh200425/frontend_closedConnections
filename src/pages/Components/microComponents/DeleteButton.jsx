import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../Context";
import { supabase } from "../../../../supa_auth";

function DeleteButton({ userid, postid, render, change }) {
  const deletePost = async (isComment = false) => {/* 
    const table = isComment ? "comments" : "posts";
    const id = isComment ? "comments" : postid; */
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq("id", postid)
      .select();
    if (!error) {
      showModal(false);
      change(!render);
    }
  };
  const [show, setShow] = React.useState(false);
  const [modal, showModal] = React.useState(false);
  const { session } = useContext(Context);
  // console.log(session.user.id, userid);
  useEffect(() => {
    if (userid === session.user.id) setShow(true);
  }, []);

  return (
    <span className=" relative ">
      {/* 
      <FontAwesomeIcon icon={faEllipsisVertical} /> */}
      {/* 
      {show && (
        <div className="relative " onClick> */}
      {!modal ? (
        <div className="flex absolute right-0 top-0 p-2 font-semibold">
          <button
            onClick={() => showModal(true)}
            className="cursor-pointer text-red-500"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
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
    </span>
  );
}

export default DeleteButton;
