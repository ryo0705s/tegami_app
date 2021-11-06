import React, { useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { postDB, userDB } from "../../firebase";
import { AppContext, Props } from "./PageStates";
import Post from "../../pages/posts/[postsId]/post";

export const LikeContext = createContext({});

// post.tsxのいいね機能に関するstateをコンポーネント化
const LikeStates = ({ children }: Props) => {
  const likeArray = firebase.firestore.FieldValue.arrayUnion;
  const likeGood = firebase.firestore.FieldValue.increment(1);
  const likeBad = firebase.firestore.FieldValue.increment(-1);

  const handleLike = () => {
    postDB.doc(clickedPost.id).update({
      likedUid: likeArray(users.uid),
    });

    postDB.doc(clickedPost.id).update({
      likeCount: likeGood,
    });
    postDB.doc(clickedPost.id).update({
      liked: true,
    });
    setLiked(!liked);
  };

  const handleUnLike = () => {
    postDB.doc(clickedPost.id).update({
      likedUid: likeArray(users.uid),
    });

    postDB.doc(clickedPost.id).update({
      likeCount: likeBad,
    });
    postDB.doc(clickedPost.id).update({
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
    userDB.get().then((querySnapshot) => {
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
      const findPostElements = () => {
        setFindPostAvatar(userLists[postNumber].avatar);
        setFindPostUid(userLists[postNumber].uid);
        setFindPostLetterName(userLists[postNumber].letterName);
      };
      postNumber !== -1 ? findPostElements() : "";
    });
    // いいねのロジックを正常に戻す
    setLiked(false);
  };
  const value = {
    handleLike,
    handleUnLike,
    selectedUser,
  };
  return (
    <div>
      <LikeContext.Provider value={value}>
        {/* <Post /> */}
        {children}
      </LikeContext.Provider>
    </div>
  );
};

export default LikeStates;
