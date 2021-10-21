import { Button, TextField, IconButton } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, { useState, useEffect, useContext } from "react";
import Layout from "../../../components/layout";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, storage } from "../../../firebase";
import { AppContext } from "../../../components/PageStates";
import { useRouter } from "next/router";
import styles from "../../../components/post.module.scss";

interface commentProps {
  id: string;
  commentUid: string;
  commentAvatar: string;
  commented: boolean;
  text: string;
}
interface commentTextProps {
  comment: string;
  commented: boolean;
}
interface updateCommentTextProps {
  id: string;
  comment: string;
  edited: boolean;
}

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
    db.collection("posts")
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
        const docRef = db.collection("posts").doc(clickedPost.id);
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
    db.collection("posts")
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
    db.collection("posts")
      .doc(clickedPost.id)
      .update({
        image: uploadPicture,
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  const handleLike = () => {
    db.collection("posts")
      .doc(clickedPost.id)
      .update({
        likedUid: firebase.firestore.FieldValue.arrayUnion(users.uid),
      });

    db.collection("posts")
      .doc(clickedPost.id)
      .update({
        likeCount: firebase.firestore.FieldValue.increment(1),
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
        likedUid: firebase.firestore.FieldValue.arrayRemove(users.uid),
      });

    db.collection("posts")
      .doc(clickedPost.id)
      .update({
        likeCount: firebase.firestore.FieldValue.increment(-1),
      });
    db.collection("posts").doc(clickedPost.id).update({
      liked: false,
    });
    setLiked(!liked);
  };

  // const alreadyLiked = () => {
  //   db.collection("posts")
  //     .doc(clickedPost.id)
  //     .update({
  //       likedUid: firebase.firestore.FieldValue.arrayRemove(users.uid),
  //     });

  //   db.collection("posts")
  //     .doc(clickedPost.id)
  //     .update({
  //       likeCount: firebase.firestore.FieldValue.increment(-1),
  //     });
  //   db.collection("posts").doc(clickedPost.id).update({
  //     liked: false,
  //   });
  //   setLiked(liked);
  // };

  const createComment = () => {
    db.collection("posts")
      .doc(clickedPost.id)
      .collection("comments")
      .doc()
      .set({
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
    db.collection("posts")
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
    db.collection("posts")
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

  const {
    message,
    setMessage,
    posts,
    setPosts,
    clickedId,
    setClickedId,
    edited,
    setEdited,
    updated,
    setUpdated,
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
    findPostAvatar,
    setFindPostAvatar,
    findCommentAvatar,
    setFindCommentAvatar,
    findPostLetterName,
    setFindPostLetterName,
    findPostUid,
    setFindPostUid,
    selectedId,
    setSelectedId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

  const selectedPost = () => {
    db.collection("posts")
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
  // const likesRef = db.collection("posts").doc(clickedPost.id);
  // .collection("likes")
  // .doc("djJtq6u4uNhQl3V2q6ns");

  // const commentRef = db
  //   .collection("posts")
  //   .doc(clickedPost.id)
  //   .collection("comments");

  useEffect(() => {
    const targetUrl = location.pathname.split("/")[2];
    setSelectedId(targetUrl);
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
          <span>投稿者：{findPostLetterName} さん</span>
          <img
            src={findPostAvatar}
            alt="prof"
            width="30"
            height="30"
            className={styles.postAvatar}
            onClick={() => router.push(`/posts/${selectedId}/postInfo`)}
          />
        </div>
        <br />
        <h2>説明</h2>
        {clickedPost.uid === users.uid ? (
          <>
            {!edited ? (
              <div>{clickedPost.text}</div>
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
          <div>{clickedPost.text}</div>
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
                  <div>
                    <img
                      src={comment.commentAvatar}
                      alt="prof"
                      onClick={() =>
                        router.push(`/posts/${selectedId}/${comment.id}`)
                      }
                    />
                  </div>
                  <div>{comment.text}</div>
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
