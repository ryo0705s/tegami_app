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
  const [comments, setComments] = useState([
    {
      id: "",
      commentUid: "",
      commented: false,
      text: "",
    },
  ]);
  const [commented, setCommented] = useState(false);
  const [commentEdited, setCommentEdited] = useState(false);
  const [commentUid, setCommentUid] = useState("");
  const [commentText, setCommentText] = useState({
    comment: "",
    commented: false,
  });
  const [updateCommentText, setUpdateCommentText] = useState({
    id: "",
    comment: "",
    edited: false,
  });
  const editText = (e) => {
    setMessage(e.target.value);
    setPosts([
      {
        id: posts.id,
        image: posts.image,
        text: message,
        uid: posts.uid,
        likeCount: posts.likeCount,
        liked: posts.liked,
        likedUid: posts.likedUid,
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
              likeCount: doc.data().likeCount,
              liked: doc.data().liked,
              likedUid: doc.data().likedUid,
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
          setPictureUrl(URL);
          setPosts({
            id: posts.id,
            image: URL,
            text: posts.text,
            uid: posts.uid,
            likeCount: posts.likeCount,
            liked: posts.liked,
            likedUid: posts.likedUid,
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
    likesRef.update({
      likedUid: firebase.firestore.FieldValue.arrayUnion(users.uid),
    });

    likesRef.update({
      likeCount: firebase.firestore.FieldValue.increment(1),
    });
    setLiked(!liked);
    likesRef.update({
      liked: true,
    });
    // console.log(likes, "likeの状況教えて！");
  };
  const handleUnLike = () => {
    likesRef.update({
      likedUid: firebase.firestore.FieldValue.arrayRemove(users.uid),
    });

    likesRef.update({
      likeCount: firebase.firestore.FieldValue.increment(-1),
    });
    setLiked(!liked);
    likesRef.update({
      liked: false,
    });
  };

  const createComment = () => {
    commentRef.doc().set({
      commentUid: users.uid,
      text: commentText.comment,
      commented: true,
    });
    setCommentText({ comment: "", commented: true });
    // window.location.reload();
  };
  const editComment = (comment, index) => {
    setUpdateCommentText({
      id: comment.id,
      comment: comment.text,
      edited: true,
    });
  };

  const updateComment = () => {
    commentRef.doc(updateCommentText.id).update({
      text: updateCommentText.comment,
    });
    setUpdateCommentText({
      id: "",
      comment: "",
      edited: false,
    });
    // window.location.reload();
  };
  const deleteComment = (comment, index) => {
    commentRef
      .doc(comment.id)
      .delete()
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
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
    // likes,
    // setLikes,
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

  const likesRef = db.collection("posts").doc(posts.id);
  // .collection("likes")
  // .doc("djJtq6u4uNhQl3V2q6ns");

  const commentRef = db
    .collection("posts")
    .doc(posts.id)
    .collection("comments");

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
          likeCount: doc.data().likeCount,
          liked: doc.data().liked,
          likedUid: doc.data().likedUid,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    commentRef.get().then((querySnapshot) => {
      let commentlists = [];
      querySnapshot.forEach((doc) => {
        commentlists.push({
          id: doc.id,
          commentUid: doc.data().commentUid,
          commented: doc.data().commented,
          text: doc.data().text,
        });
      });
      setComments(commentlists);
    });
  }, []);

  useEffect(() => {
    commentRef.get().then((querySnapshot) => {
      let commentlists = [];
      querySnapshot.forEach((doc) => {
        commentlists.push({
          id: doc.id,
          commentUid: doc.data().commentUid,
          commented: doc.data().commented,
          text: doc.data().text,
        });
      });
      setComments(commentlists);
    });
  }, [posts]);

  // デバッグ用
  useEffect(() => {
    console.log(users.uid, "呼ばれてますか？");
  }, [users.uid]);
  useEffect(() => {
    console.log(posts.likeCount, "ポストクラブ");
  }, [posts.likeCount]);

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
      <div>{posts.likeCount}</div>
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
      <br />
      {!commentText.commented ? (
        <>
          <div>コメントする</div>
          <TextField
            multiline
            variant="outlined"
            fullWidth
            value={commentText.comment}
            onChange={(e) =>
              setCommentText({ comment: e.target.value, commented: false })
            }
          />
          <Button variant="contained" color="primary" onClick={createComment}>
            投稿
          </Button>
        </>
      ) : (
        <div></div>
      )}
      <br />
      <p>コメント</p>
      <ul>
        {comments &&
          comments.map((comment, index) => {
            return (
              <li>
                <div>{comment.text}</div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editComment(comment, index)}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteComment(comment, index)}
                >
                  削除
                </Button>
              </li>
            );
          })}
      </ul>
      <br />
      {!updateCommentText.edited ? (
        <div></div>
      ) : (
        <>
          <div>コメントを編集する</div>
          <TextField
            multiline
            variant="outlined"
            fullWidth
            value={updateCommentText.comment}
            onChange={(e) =>
              setUpdateCommentText({
                id: updateCommentText.id,
                comment: e.target.value,
                edited: true,
              })
            }
          />
          <Button variant="contained" color="primary" onClick={updateComment}>
            完了
          </Button>
        </>
      )}
    </Layout>
  );
};

export default post;
