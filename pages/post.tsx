import { Button, TextField, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";
import styles from "../components/post.module.scss";

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
interface clickedPostProps {
  id: string;
  image: string;
  text: string;
  uid: string;
  likeCount: number;
  liked: boolean;
  likedUid: string[];
}
const post = () => {
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

  const [clickedPost, setClickedPost] = useState<clickedPostProps>({
    id: "",
    image: "",
    text: "",
    uid: "",
    likeCount: 0,
    liked: false,
    likedUid: [""],
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
        router.push("/postLists");
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
    setClickedId(clickedPost.id);
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
    setClickedId(clickedPost.id);
  };

  const deleteComment = (comment) => {
    db.collection("posts")
      .doc(clickedPost.id)
      .collection("comments")
      .doc(comment.id)
      .delete()
      .then(() => {
        setClickedId(clickedPost.id);
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
  }: any = useContext(AppContext);

  // const likesRef = db.collection("posts").doc(clickedPost.id);
  // .collection("likes")
  // .doc("djJtq6u4uNhQl3V2q6ns");

  // const commentRef = db
  //   .collection("posts")
  //   .doc(clickedPost.id)
  //   .collection("comments");

  useEffect(() => {
    if (clickedId)
      db.collection("posts")
        .doc(clickedId)
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
          setClickedId("");
        })
        .catch((error: any) => {
          alert(error.message);
        });
  }, [clickedId]);

  useEffect(() => {
    if (clickedPost.id)
      (async () => {
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
    console.log(liked, "呼ばれてますか？");
  }, [liked]);
  useEffect(() => {
    console.log(clickedPost.likedUid, "ポストクラブ");
  }, [clickedPost]);

  const targetUid: string = clickedPost.likedUid.find((clickedFoundUid) => {
    return clickedFoundUid == users.uid;
  });

  return (
    <Layout>
      <img
        src={findPostAvatar}
        alt="prof"
        width="30"
        height="30"
        onClick={() => router.push("./userInfo")}
      />
      <img src={clickedPost.image} width="400" height="500" />
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
      <div>{clickedPost.likeCount}</div>
      <p>説明</p>
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEdited(!edited);
              setUpdated(!updated);
            }}
          >
            編集
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            削除
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={updateText}>
          完了
        </Button>
      )}

      <br />
      {!commentText.commented ? (
        <>
          <div>コメントする</div>
          <TextField
            multiline
            variant="outlined"
            fullWidth
            value={commentText.comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
          comments.map((comment) => {
            return (
              <li>
                <img
                  src={comment.commentAvatar}
                  alt="prof"
                  width="30"
                  height="30"
                  onClick={() => router.push("./userInfo")}
                />
                <div>{comment.text}</div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editComment(comment)}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteComment(comment)}
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
