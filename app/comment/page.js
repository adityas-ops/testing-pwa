"use client";
import Layout from "@/components/common/Layout";
import React, { useState } from "react";
import commentData from "@/data/commentData";
import CommentCompo from "@/components/comments/CommetCompo"
import useCommentTree from "@/hooks/useCommentTree";

function Comment() {
  const [comments, setComments] = useState(commentData);
  const { addComment,addLike } = useCommentTree();


  const handleAddComment = (comment, parentId) => {
    const newComments = addComment(comments, comment, parentId);
    setComments(newComments);
  };

    const handleAddLike = (commentId) => {
    const newComments = addLike(comments, commentId);
    setComments(newComments);
    }

  return (
    <Layout customClass="pt-[20px] flex justify-center w-full h-full  px-[50px]">
      <div className="w-[60%]  h-full">
        {
            comments.map((comment, index) => (
                <CommentCompo key={index} isReply={false} comment={comment} handleAddComment={handleAddComment} handleAddLike={handleAddLike} />
            ))
        }
      </div>
    </Layout>
  );
}

export default Comment;
