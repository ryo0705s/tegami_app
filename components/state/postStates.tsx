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

const postStates = (props) => {
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

  return (
    <Layout>
      
    </Layout>
  );
};

export default postStates;
