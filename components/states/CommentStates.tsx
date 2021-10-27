import React, { useState, useContext, createContext } from "react";
import "firebase/firestore";
import { db, postDB } from "../../firebase";
import { AppContext, Props } from "./PageStates";
import { useRouter } from "next/router";

export const CommentContext = createContext({});

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

const CommentStates = ({ children }: Props) => {
  const router = useRouter();
  const [comments, setComments] = useState<Partial<commentProps[]>>([
    {
      id: "",
      commentUid: "",
      commentAvatar: "",
      commented: false,
      text: "",
    },
  ]);
  const [commented, setCommented] = useState<boolean>(false);
  const [commentEdited, setCommentEdited] = useState<boolean>(false);
  const [commentUid, setCommentUid] = useState<string>("");
  const [commentText, setCommentText] = useState<commentTextProps>({
    comment: "",
    commented: false,
  });
  const [
    updateCommentText,
    setUpdateCommentText,
  ] = useState<updateCommentTextProps>({
    id: "",
    comment: "",
    edited: false,
  });

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

  const value = {
    comments,
    setComments,
    commented,
    setCommented,
    commentEdited,
    setCommentEdited,
    commentUid,
    setCommentUid,
    commentText,
    setCommentText,
    updateCommentText,
    setUpdateCommentText,
    createComment,
    editComment,
    updateComment,
    deleteComment,
  };
  return (
    <div>
      <CommentContext.Provider value={value}>
        {children}
      </CommentContext.Provider>
    </div>
  );
};
export default CommentStates;
