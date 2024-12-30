import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { v4 as uuidv4 } from "uuid";

function CommetCompo({ comment, isReply, handleAddComment,handleAddLike }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState({
    autherName: "",
    comment: "",
    date: "",
    time: "",
    likes: 0,
    replies: [],
  });

  const onSubmit = (id) => {
    const newComment = {
      autherName: "Unknown",
      comment: reply.comment,
      date: "2021-09-01",
      time: "12:00",
      likes: 0,
      replies: [],
      id: uuidv4(),
    };
    handleAddComment(newComment, id);
    console.log(newComment);
    setShowReply(false);
    setReply({
      autherName: "",
      comment: "",
      date: "",
      time: "",
      likes: 0,
      replies: [],
    });
  };

  return (
    <div className="w-full     h-fit p-[15px]">
      <div className="w-full  flex items-start gap-[5px]">
        <div className="w-[40px]  h-[40px] ">
          <div
            style={{
              zIndex: 99999,
            }}
            className=" z-50"
          >
            <Avatar name={comment.autherName} />
          </div>

          {isReply && (
            <div
              style={{
                zIndex: -99,
              }}
              className="w-full h-[1px] overflow-visible relative flex justify-center"
            >
              <div className=" w-[2px]  h-[140px] absolute bg-black top-[-150px] left-[-14px]">
                <div className=" w-full h-full relative overflow-visible">
                  <div className=" w-[20px] h-full min-h-[100px] border-t-0 border-b-[2px] absolute bottom-[-0px]  border-black"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-full justify-between px-[12px] py-[12px] rounded-xl bg-green-900  flex-col">
          <p className=" text-gray-100 mt-[2px] font-semibold uppercase leading-none">
            {comment.autherName}
          </p>
          <p className=" text-[12px] mt-[2px] text-gray-200">
            {comment.date} {comment.time}
          </p>
          <div className="w-full ">
            <p className="text-gray-100 text-[16px]">{comment.comment}</p>
          </div>
        </div>
      </div>
      <div className=" ml-[50px] mt-[5px] flex gap-x-[10px] ">
        <button
          onClick={() => {
            setShowReply(!showReply);
          }}
          className=" text-black text-[12px] font-bold"
        >
          Reply
        </button>
        <button 
        onClick={()=>{
          handleAddLike(comment.id)
        }}
         className=" text-black text-[12px] font-bold">
          {comment.likes} Likes
        </button>
      </div>
      {showReply && (
        <div className="w-full flex flex-col ml-[50px] justify-center">
          <input
            type="text"
            placeholder="Reply"
            className="w-full p-2  rounded-lg border-2 border-black"
            value={reply.comment}
            onChange={(e) => setReply({ ...reply, comment: e.target.value })}
          />
          <div className="w-full mt-[5px] justify-start gap-[20px]">
            <button
              onClick={() => {
                onSubmit(comment.id);
              }}
              className="w-[70px] h-[30px] bg-black text-white rounded-lg"
            >
              Submit
            </button>
            <button
              onClick={() => {
                setShowReply(false);
                setReply({
                  autherName: "",
                  comment: "",
                  date: "",
                  time: "",
                  likes: 0,
                  replies: [],
                });
              }}
              className="w-[70px] h-[30px] ml-[1px] bg-black  text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className=" pl-4 w-full ">
          {comment.replies.map((reply, index) => (
            <div key={index} className=" relative ">
              <CommetCompo
                isReply={true}
                comment={reply}
                handleAddComment={handleAddComment}
                handleAddLike={handleAddLike}
              />
              <div className="  " />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommetCompo;
