import { Button, TextField, IconButton } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, { useEffect, useContext } from "react";
import Layout from "../../../components/layout";
import "firebase/firestore";
import { db } from "../../../firebase";
import { AppContext } from "../../../components/states/PageStates";
import { useRouter } from "next/router";
import styles from "../../../components/scss/post.module.scss";
import { PostContext } from "../../../components/states/PostStates";
import { CommentContext } from "../../../components/states/CommentStates";
// import {
//   commentProps,
//   commentTextProps,
//   updateCommentTextProps,
// } from "../../../components/states/CommentStates";
import { LikeContext } from "../../../components/states/LikeStates";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const post = () => {
  const classes = useStyles();
  const router = useRouter();
  const {
    setClickedId,
    edited,
    setEdited,
    updated,
    setUpdated,
    liked,
    users,
    findPostAvatar,
    findPostLetterName,
    findPostUid,
    selectedId,
    setSelectedId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

  const {
    editText,
    updateText,
    handleDelete,
    handlePicture,
    selectedPost,
  }: any = useContext(PostContext);

  const {
    comments,
    setComments,
    commentText,
    setCommentText,
    updateCommentText,
    setUpdateCommentText,
    createComment,
    editComment,
    updateComment,
    deleteComment,
  }: any = useContext(CommentContext);

  const { handleLike, handleUnLike, selectedUser }: any = useContext(
    LikeContext
  );

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
      db.collection("posts")
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

  // デバッグ用
  useEffect(() => {
    console.log(findPostUid, "呼ばれてますか？");
  }, [findPostUid]);
  useEffect(() => {
    console.log(clickedPost, "モンドセレクション");
  }, [clickedPost]);
  useEffect(() => {
    console.log(location.pathname.split("/")[2], "クエっクエ");
  }, []);

  const targetUid: string = clickedPost.likedUid.find((clickedFoundUid) => {
    return clickedFoundUid == users.uid;
  });

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

        {targetUid && clickedPost.liked ? (
          <IconButton onClick={handleUnLike}>
            {/* <IconButton onClick={alreadyLiked}> */}
            <label>
              <ThumbUpAltIcon />
            </label>
          </IconButton>
        ) : (
          <IconButton onClick={!liked ? handleLike : handleUnLike}>
            <label>
              <ThumbUpAltIcon />
            </label>
          </IconButton>
        )}

        <span>{clickedPost.likeCount}</span>
        <div>
          <div className={styles.postMember}>
            <span>投稿者：{findPostLetterName} さん</span>
            <Avatar
              src={findPostAvatar}
              alt="prof"
              className={styles.postAvatar}
              onClick={() => router.push(`/posts/${selectedId}/postInfo`)}
            />
          </div>
        </div>
        <br />
        <h2>説明</h2>
        {clickedPost.uid === users.uid ? (
          <>
            {!edited ? (
              <div className={styles.text}>{clickedPost.text}</div>
            ) : (
              <TextField
                multiline
                variant="outlined"
                fullWidth
                value={clickedPost.text}
                onChange={editText}
              />
            )}
            {!updated ? (
              <>
                <br />
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      setEdited(!edited);
                      setUpdated(!updated);
                    }}
                  >
                    編集
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleDelete}
                  >
                    削除
                  </Button>
                </Stack>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={updateText}>
                完了
              </Button>
            )}
          </>
        ) : (
          <div className={styles.text}>{clickedPost.text}</div>
        )}

        <br />
        {!commentText.commented ? (
          <>
            <div className={styles.textField}>
              <h2>コメント</h2>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-textarea"
                  label="コメント"
                  placeholder="コメントをしてみましょう"
                  multiline
                  variant="outlined"
                  fullWidth
                  value={commentText.comment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCommentText({
                      comment: e.target.value,
                      commented: false,
                    })
                  }
                />
              </form>
            </div>
            <br />
            <Button variant="contained" color="primary" onClick={createComment}>
              投稿
            </Button>
          </>
        ) : (
          <div></div>
        )}
        <ul className={styles.comments}>
          {comments &&
            comments.map((comment) => {
              return (
                <li className={styles.comment}>
                  <Avatar
                    src={comment.commentAvatar}
                    alt="prof"
                    className={styles.commentAvatar}
                    onClick={() =>
                      router.push(`/posts/${selectedId}/${comment.id}`)
                    }
                  />
                  {/* <img
                      src={comment.commentAvatar}
                      alt="prof"
                      onClick={() =>
                        router.push(`/posts/${selectedId}/${comment.id}`)
                      }
                    /> */}
                  <div className={styles.commentText}>{comment.text}</div>
                  {comment.commentUid === users.uid ? (
                    <div>
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => editComment(comment)}
                        >
                          編集
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => deleteComment(comment)}
                        >
                          削除
                        </Button>
                      </Stack>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
        </ul>
        <br />
        {!updateCommentText.edited ? (
          <div></div>
        ) : (
          <>
            {/* <div>コメントを編集する</div> */}
            <div className={styles.textField}>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-textarea"
                  label="コメント編集"
                  placeholder="コメントを編集しましょう"
                  multiline
                  variant="outlined"
                  fullWidth
                  value={updateCommentText.comment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setUpdateCommentText({
                      id: updateCommentText.id,
                      comment: e.target.value,
                      edited: true,
                    })
                  }
                />
              </form>
            </div>
            <Button variant="contained" color="primary" onClick={updateComment}>
              完了
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default post;
