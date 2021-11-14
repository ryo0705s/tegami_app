import React, { useState, useContext } from "react";
import "firebase/firestore";
import { postDB } from "../firebase";
import { AppContext, Props } from "../context/PageStates";
import { CommentContext } from "../context/CommentStates";

export interface commentProps {
  id: string;
  commentUid: string;
  commentAvatar: string;
  commented: boolean;
  text: string;
}
export interface commentTextProps {
  comment: string;
  commented: boolean;
}
export interface updateCommentTextProps {
  id: string;
  comment: string;
  edited: boolean;
}

// post.tsxの投稿へのコメントに関するstateをコンポーネント化
export const useCommentAction = () => {
  const createComment = () => {
    postDB.doc(clickedPost.id).collection("comments").doc().set({
      commentUid: users.uid,
      text: commentText.comment,
      commentAvatar: users.avatar,
      commented: true,
    });
    setCommentText({ comment: "", commented: true });
    setSelectedId(clickedPost.id);
  };
  const editComment = (comment) => {
    setUpdateCommentText({
      id: comment.id,
      comment: comment.text,
      edited: true,
    });
  };

  const updateComment = () => {
    postDB
      .doc(clickedPost.id)
      .collection("comments")
      .doc(updateCommentText.id)
      .update({
        text: updateCommentText.comment,
      });
    setUpdateCommentText({
      id: "",
      comment: "",
      edited: false,
    });
    setSelectedId(clickedPost.id);
  };

  const deleteComment = (comment) => {
    postDB
      .doc(clickedPost.id)
      .collection("comments")
      .doc(comment.id)
      .delete()
      .then(() => {
        setSelectedId(clickedPost.id);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  const { users, setSelectedId, clickedPost }: any = useContext(AppContext);
  const {
    commentText,
    setCommentText,
    updateCommentText,
    setUpdateCommentText,
  }: any = useContext(CommentContext);

  return {
    createComment,
    editComment,
    updateComment,
    deleteComment,
  };
};
// export default CommentStates;
