import { Button, TextField, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";
import styles from "../components/post.module.scss";
import user from "./user";

const post: React.FC = () => {
  const router = useRouter();
  const [comment, setComment] = useState({ commentUid: "", text: "" });
  const [commentUid, setCommentUid] = useState("");
  const [text, setText] = useState("");
  const editText = (e) => {
    setMessage(e.target.value);
    setPosts([
      {
        id: posts.id,
        image: posts.image,
        text: message,
        uid: posts.uid,
      },
    ]);
    console.log(posts.image, "写真読み込み");
    db.collection("posts")
      .doc(clickedId)
      .update({
        text: e.target.value,
      })
      .then((result) => {
        const docRef = db.collection("posts").doc(clickedId);
        docRef
          .get()
          .then((doc) => {
            setPosts({
              id: doc.id,
              image: doc.data().image,
              text: doc.data().text,
              uid: doc.data().uid,
            });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleDelete = () => {
    db.collection("posts")
      .doc(clickedId)
      .delete()
      .then(() => {
        router.push("/postLists");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handlePicture = (e: any) => {
    const next = function () {
      storage
        .ref()
        .child(`/images/${e.target.files[0].name}`)
        .getDownloadURL()
        .then(function (URL) {
          // const img = document.getElementById("myimg");
          // img.src = URL;
          setPictureUrl(URL);
          setPosts({
            id: posts.id,
            image: URL,
            text: posts.text,
            uid: posts.uid,
          });
          console.log(URL, "アドレス１");
          console.log(posts.image, "アドレス1+");
        })
        .catch(function (error) {
          alert(error.message);
        });
    };
    const error = function (error) {
      alert(error.message);
    };
    const complete = function () {
      db.collection("posts")
        .doc(clickedId)
        .update({
          image: posts.image,
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log(posts.image, "アドレス２");
    };
    const uploadPicture = storage
      .ref(`/images/${e.target.files[0].name}`)
      .put(e.target.files[0]);

    uploadPicture.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };

  const handleLike = () => {
    // setLikeCount((prevCount) => prevCount + 1);
    // setLikedUids(posts.uid);
    // console.log(handleLike, "like呼ばれてます");
    // const washingtonRef = db.collection("posts").doc("djJtq6u4uNhQl3V2q6ns");

    // Atomically add a new region to the "regions" array field.
    likesRef.update({
      likedUid: firebase.firestore.FieldValue.arrayUnion(users.uid),
    });

    // Atomically increment the population of the city by 50.
    likesRef.update({
      likeCount: firebase.firestore.FieldValue.increment(1),
    });
    setLiked(!liked);
    // setLikes(
    likesRef.update({
      liked: true,
    });
    // );
    console.log(likes, "likeの状況教えて！");
  };
  const handleUnLike = () => {
    likesRef.update({
      likedUid: firebase.firestore.FieldValue.arrayRemove(users.uid),
    });

    // Atomically increment the population of the city by 50.
    likesRef.update({
      likeCount: firebase.firestore.FieldValue.increment(-1),
    });
    setLiked(!liked);
    likesRef.update({
      liked: false,
    });
    // setLikeCount((previousCount) => previousCount - 1);
    // const newUids = likedUids.filter((likedUid) => likedUid === userId[0]);
    // setLikedUids(newUids);
    // // console.log(handleUnLike, "unlike呼ばれてます");
    // setLikes(
    //   likesRef.set(
    //     {
    //       likeCount: likeCount,
    //       liked: false,
    //       likedUid: likedUids,
    //     },
    //     { merge: true }
    //   )
    // );
  };

  const createComment = (e) => {
    setText(e.target.value);
    setCommentUid(userId);
    console.log(createComment, "コメントしました");
  };
  const editComment = () => {};
  const {
    message,
    setMessage,
    posts,
    setPosts,
    clickedId,
    setClickedId,
    edited,
    setEdited,
    pictureUrl,
    setPictureUrl,
    likes,
    setLikes,
    likeCount,
    setLikeCount,
    liked,
    setLiked,
    likedUids,
    setLikedUids,
    userId,
    setUserId,
    users,
    setUsers,
  } = useContext(AppContext);

  const likesRef = db
    .collection("posts")
    .doc(posts.id)
    .collection("likes")
    .doc("djJtq6u4uNhQl3V2q6ns");

  const commentRef = db
    .collection("posts")
    .doc(posts.id)
    .collection("comments")
    .doc("1aWxWQcRxYcRJtfzDmai");

  useEffect(() => {
    const docRef = db.collection("posts").doc(clickedId);
    docRef
      .get()
      .then((doc) => {
        setPosts({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          uid: doc.data().uid,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <Layout>
      <img src={posts.image} width="400" height="500" />
      <IconButton>
        <label>
          <PhotoCameraIcon />
          <input
            type="file"
            className={styles.input}
            onChange={handlePicture}
          />
        </label>
      </IconButton>
      <IconButton onClick={!liked ? handleLike : handleUnLike}>
        <label>
          <ThumbUpAltIcon />
        </label>
      </IconButton>
      <p>説明</p>
      {!edited ? (
        <div>{posts.text}</div>
      ) : (
        <TextField
          multiline
          variant="outlined"
          fullWidth
          value={posts.text}
          onChange={editText}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEdited(!edited)}
      >
        編集
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        削除
      </Button>

      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        onChange={(e) => e.target.value}
      />
      <Button variant="contained" color="primary" onClick={createComment}>
        投稿
      </Button>
      <Button variant="contained" color="primary" onClick={editComment}>
        編集
      </Button>
    </Layout>
  );
};

export default post;
