import React, { useContext, createContext } from "react";
import Layout, { Props } from "../layout";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../firebase";
import { AppContext } from "./PageStates";
import { useRouter } from "next/router";

export const LikeContext = createContext({});

const LikeStates = ({ children }: Props) => {
  const router = useRouter();
  const likeArray = firebase.firestore.FieldValue.arrayUnion;
  const likeGood = firebase.firestore.FieldValue.increment(1);
  const likeBad = firebase.firestore.FieldValue.increment(-1);

  const handleLike = () => {
    db.collection("posts")
      .doc(clickedPost.id)
      .update({
        likedUid: likeArray(users.uid),
      });

    db.collection("posts").doc(clickedPost.id).update({
      likeCount: likeGood,
    });
    db.collection("posts").doc(clickedPost.id).update({
      liked: true,
    });
    setLiked(!liked);
  };

  const handleUnLike = () => {
    db.collection("posts")
      .doc(clickedPost.id)
      .update({
        likedUid: likeArray(users.uid),
      });

    db.collection("posts").doc(clickedPost.id).update({
      likeCount: likeBad,
    });
    db.collection("posts").doc(clickedPost.id).update({
      liked: false,
    });
    setLiked(!liked);
  };

  const {
    liked,
    setLiked,
    users,
    setFindPostAvatar,
    setFindPostLetterName,
    clickedPost,
    setFindPostUid,
  }: any = useContext(AppContext);

  const selectedUser = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let userLists = [];
        querySnapshot.forEach((doc) => {
          const restData = { ...doc.data() };
          userLists.push({
            id: doc.id,
            avatar: restData.avatar,
            letterName: restData.letterName,
            otherInfo: restData.otherInfo,
            uid: restData.uid,
          });
        });
        const postNumber: number = userLists.findIndex(
          (userList) => userList.uid === clickedPost.uid
        );
        console.log(postNumber, "ポストナンバぁ");
        const findPostElements = () => {
          setFindPostAvatar(userLists[postNumber].avatar);
          setFindPostUid(userLists[postNumber].uid);
          setFindPostLetterName(userLists[postNumber].letterName);
        };
        postNumber !== -1 ? findPostElements() : "";
        // いいねのロジックを正常に戻す
        setLiked(false);
      });
  };
  const value = {
    handleLike,
    handleUnLike,
    selectedUser,
  };
  return (
    <div>
      <LikeContext.Provider value={value}>{children}</LikeContext.Provider>
    </div>
  );
};

export default LikeStates;