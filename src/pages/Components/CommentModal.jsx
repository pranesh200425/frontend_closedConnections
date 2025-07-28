import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DeleteButton from "./microComponents/DeleteButton";

function CommentModal({
  user,
  content,
  time,
  post_id,
  user_id,
  comment_id,
  change,
  render,
  showModal,
  modal,
}) {

  //console.log(comment_id);

  return (
    <div className="flex flex-col mt-2 mb-2 border-b border-dotted p-2 border-gray-300 relative">
      <div className="comment flex justify-between items-center ">
        <div className="username font-bold  text-amber-600  ">{user}</div>
        <div className="time font-semibold text-sm">{time}</div>
      </div>{/* 
          <DeleteButton /> */}
      <div className="content flex pt-[0.25rem] ">
        <p className="text-gray-400 leading-7 ">{content}</p>
      </div>
    </div>
  );
}

export default CommentModal;
