import React, { useEffect, useContext } from "react";
import "firebase/firestore";
import { db, postDB } from "../../../firebase";
import { AppContext } from "../../../context/PageStates";
import { PostContext } from "../../../context/PostStates";
import { CommentContext } from "../../../context/CommentStates";
import { LikeContext } from "../../../context/LikeStates";
import Layout from "../../../components/layout";
import styles from "../../../components/scss/post.module.scss";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PostComponent from "../../../components/postComponent";
import CommentComponent from "../../../components/commentComponent";
import LikeComponent from "../../../components/likeComponent";
// import {
//   commentProps,
//   commentTextProps,
//   updateCommentTextProps,
// } from "../../../components/states/CommentStates";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Post = () => {
  const classes = useStyles();

  const {
    setClickedId,
    liked,
    selectedId,
    setSelectedId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

  const { handlePicture, selectedPost }: any = useContext(PostContext);

  const { setComments }: any = useContext(CommentContext);

  const { selectedUser }: any = useContext(LikeContext);

  useEffect(() => {
    const targetUrl = location.pathname.split("/")[2];
    setSelectedId(targetUrl);
    setClickedId("");
  }, []);

  useEffect(() => {
    if (selectedId) selectedPost();
  }, [selectedId]);

  useEffect(() => {
    if (clickedPost.id)
      (async () => {
        selectedUser();
        await db
          .collection("posts")
          .doc(clickedPost.id)
          .collection("comments")
          .get()
          .then((querySnapshot) => {
            let commentlists = [];
            querySnapshot.forEach((doc) => {
              commentlists.push({
                id: doc.id,
                commentUid: doc.data().commentUid,
                commented: doc.data().commented,
                commentAvatar: doc.data().commentAvatar,
                text: doc.data().text,
              });
            });
            setComments(commentlists);
          });
      })();
  }, [clickedPost]);

  useEffect(() => {
    if (clickedPost.id)
      postDB
        .doc(clickedPost.id)
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
  }, [liked]);

  return (
    <Layout>
      <div className={styles.post}>
        <img src={clickedPost.image} className={styles.postImage} />
        <span className={styles.iconButton}>
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
        </span>
        <LikeComponent />
        <PostComponent />
        <br />
        <CommentComponent />
      </div>
    </Layout>
  );
};

export default Post;
