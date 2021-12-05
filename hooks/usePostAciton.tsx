import React, { useContext } from "react";
import "firebase/firestore";
import { storage, postDB } from "../firebase";
import { AppContext } from "../context/PageStates";

// post.tsxの投稿に関するstateを抽出
export const usePostAction = () => {
  const editText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClickedPost({
      id: clickedPost.id,
      image: clickedPost.image,
      text: e.target.value,
      uid: clickedPost.uid,
      likeCount: clickedPost.likeCount,
      liked: clickedPost.liked,
      likedUid: clickedPost.likedUid,
    });
  };
  const updateText = () => {
    postDB
      .doc(clickedPost.id)
      .set({
        id: clickedPost.id,
        image: clickedPost.image,
        text: clickedPost.text,
        uid: clickedPost.uid,
        likeCount: clickedPost.likeCount,
        liked: clickedPost.liked,
        likedUid: clickedPost.likedUid,
      })
      .then(() => {
        const docRef = postDB.doc(clickedPost.id);
        docRef
          .get()
          .then((doc) => {
            setClickedPost({
              id: doc.id,
              image: doc.data().image,
              text: doc.data().text,
              uid: doc.data().uid,
              likeCount: doc.data().likeCount,
              liked: doc.data().liked,
              likedUid: doc.data().likedUid,
            });
          })
          .catch((error: any) => {
            alert(error.message);
          });
      });
    setEdited(!edited);
    setUpdated(!updated);
  };

  const handleDelete = () => {
    postDB
      .doc(clickedPost.id)
      .delete()
      .then(() => {
        router.push("/posts/postLists");
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };
  const handlePicture = async (e: any) => {
    try {
      // storageからURLを取得
      await storage
        .ref(`/images/${e.target.files[0].name}`)
        .put(e.target.files[0]);

      // storageから画像のURLを取得し、clickedPostに保存
      const uploadPicture = await storage
        .ref()
        .child(`/images/${e.target.files[0].name}`)
        .getDownloadURL();

      setClickedPost({
        id: clickedPost.id,
        image: uploadPicture,
        text: clickedPost.text,
        uid: clickedPost.uid,
        likeCount: clickedPost.likeCount,
        liked: clickedPost.liked,
        likedUid: clickedPost.likedUid,
      });

      // firebaseStorageに写真をアップロード
      postDB
        .doc(clickedPost.id)
        .update({
          image: uploadPicture,
        })
        .catch((error: any) => {
          alert(error.message);
        });
    } catch {
      alert("画像の投稿に失敗しました");
    }
  };

  const {
    router,
    edited,
    setEdited,
    updated,
    setUpdated,
    selectedId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

  const selectedPost = () => {
    postDB
      .doc(selectedId)
      .get()
      .then((doc) => {
        setClickedPost({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          uid: doc.data().uid,
          likeCount: doc.data().likeCount,
          liked: doc.data().liked,
          likedUid: doc.data().likedUid,
        });
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };
  // return [editText, updateText, handleDelete, handlePicture, selectedPost];
  return { editText, updateText, handleDelete, handlePicture, selectedPost };
};
