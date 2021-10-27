import React, { useContext, createContext } from "react";
import "firebase/firestore";
import { db, storage, postDB } from "../../firebase";
import { AppContext, Props } from "./PageStates";
import { useRouter } from "next/router";

export const PostContext = createContext({});

const PostStates = ({ children }: Props) => {
  const router = useRouter();
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
  };

  const {
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
        // clickedId→clickedPostIdに渡すことによりバックボタンで前ページに戻れるようにした
        // setClickedPostId(clickedId);
        // setClickedId("");
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  const value = {
    editText,
    updateText,
    handleDelete,
    handlePicture,
    selectedPost,
  };

  return (
    <div>
      <PostContext.Provider value={value}>{children}</PostContext.Provider>
    </div>
  );
};
export default PostStates;
