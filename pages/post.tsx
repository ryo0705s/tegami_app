import { Button, TextField, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import firebase from "firebase/app";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";
import styles from "../components/post.module.scss";

const post: React.FC = () => {
  const router = useRouter();
  const editText = (e) => {
    setPosts([
      {
        id: posts.id,
        image: posts.image,
        text: e.target.value,
        uid: posts.uid,
      },
    ]);
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
    setLiked(!liked);
    setLikeCount((previousCount) => previousCount + 1);
    setLikedUids([...userId, userId[0]]);
    // console.log(handleLike, "like呼ばれてます");
    setLikes(
      likesRef.set(
        {
          likeCount: likeCount,
          liked: true,
          likedUid: likedUids,
        },
        { merge: true }
      )
    );
    console.log(likes, "likeの状況教えて！");
  };
  const handleUnLike = () => {
    setLiked(!liked);
    setLikeCount((previousCount) => previousCount - 1);
    const newUids = likedUids.filter((likedUid) => likedUid === userId[0]);
    setLikedUids(newUids);
    // console.log(handleUnLike, "unlike呼ばれてます");
    setLikes(
      likesRef.set(
        {
          likeCount: likeCount,
          liked: false,
          likedUid: likedUids,
        },
        { merge: true }
      )
    );
  };

  const {
    posts,
    setPosts,
    clickedId,
    setClickedId,
    edited,
    setEdited,
    url,
    setUrl,
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
  } = useContext(AppContext);

  const likesRef = db
    .collection("posts")
    .doc(posts.id)
    .collection("likes")
    .doc(likes.id);

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
      <ThumbUpAltIcon onClick={!liked ? handleLike : handleUnLike} />
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
        value="面白いですね！"
      />
    </Layout>
  );
};

export default post;
