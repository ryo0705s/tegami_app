import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/user.module.scss";
import firebase from "firebase/app";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";
import user from "./user";
import Layout from "../components/layout";
import postLists from "./postLists";

const userInfo: React.FC = () => {
  const router = useRouter();
  const [yourPosts, setYourPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      uid: "",
      likeCount: 0,
      liked: false,
      likedUid: [""],
    },
  ]);
  const createLetterName = (e) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: e.target.value,
      otherInfo: users.otherInfo,
      uid: users.uid,
    });
  };
  const createOtherInfo = (e) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: e.target.value,
      uid: users.uid,
    });
  };
  const createProfile = () => {
    db.collection("users").add({
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: users.otherInfo,
      uid: authUserId,
    });
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: users.otherInfo,
      uid: authUserId,
    });
    router.push("/");
  };
  const editAvatar = (e) => {
    storage
      .ref()
      .child(`/avatars/${e.target.files[0].name}`)
      .put(e.target.files[0])
      .then(function (snapshot) {
        console.log("Uploaded a blob or file!");
        storage
          .ref()
          .child(`/avatars/${e.target.files[0].name}`)
          .getDownloadURL()
          .then(function (URL) {
            setUsers({
              id: users.id,
              avatar: URL,
              letterName: users.letterName,
              otherInfo: users.otherInfo,
              uid: users.uid,
            });
            console.log(URL, "アドレス教えて！");
          })
          .catch(function (error) {
            // Handle any errors
          });
      });
  };
  const editLetterName = (e) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: e.target.value,
      otherInfo: users.otherInfo,
      uid: users.uid,
    });
  };
  const editOtherInfo = (e) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: e.target.value,
      uid: users.uid,
    });
  };
  const editProfile = () => {
    db.collection("users")
      .doc(loginedId)
      .set({
        avatar: users.avatar,
        letterName: users.letterName,
        otherInfo: users.otherInfo,
        uid: users.uid,
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    router.push("/");
  };
  const {
    posts,
    setPosts,
    users,
    setUsers,
    avatarUrl,
    setAvatarUrl,
    loginedId,
    setLoginedId,
    authUserId,
    setAuthUserId,
    findPostUid,
    setFindPostUid,
  } = useContext(AppContext);

  useEffect(() => {
    // ①postコレクションのドキュメント一覧をpostListsに配列で格納
    db.collection("posts")
      .where("uid", "==", findPostUid)
      .get()
      .then((querySnapshot) => {
        let postLists = [];
        querySnapshot.forEach((doc) => {
          // postLists.push(doc);
          const restData = { ...doc.data() };
          postLists.push({
            id: doc.id,
            image: restData.image,
            text: restData.text,
            uid: restData.uid,
            likeCount: restData.likeCount,
            liked: restData.likedUid,
            likedUid: restData.likedUid,
          });
          // setYourPosts([
          //   {
          //     id: doc.id,
          //     image: doc.data().image,
          //     text: doc.data().text,
          //     uid: doc.data().uid,
          //     likeCount: doc.data().likeCount,
          //     liked: doc.data().likedUid,
          //     likedUid: doc.data().likedUid,
          //   },
          // ]);
        });
        setYourPosts(postLists);
        // ②postListsから現在選択されている投稿の投稿者（id=findPostUid）の投稿を全て見つけて表示させる
        // const yourPostContents = postLists.filter((postList) => {
        //   postList.uid === findPostUid;
        //   // console.log(postList.uid, "ポストリスト出てる？");
        //   // この結果がなぜか空配列になってしまう
        //   // findPostsUidはYcOAazXArPZYnpXb4S4cietdfcq1が入ってます
        // });
        // if (yourPostContents) setYourPosts(yourPostContents);
        // console.log(postLists, "あはははは");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  // デバッグ用コード
  useEffect(() => {
    console.log(yourPosts, "お前誰？");
  }, [yourPosts]);

  return (
    <Layout>
      <img src={users.avatar} width={100} height={100} />
      {/* <IconButton>
        <label>
          <PhotoCameraIcon />
          <input type="file" className={styles.input} onChange={editAvatar} />
        </label>
      </IconButton> */}
      <p>レターネーム</p>
      <div>{users.letterName}</div>
      {/* <TextField value={users.letterName} onChange={editLetterName} /> */}
      <p>コメント</p>
      <div>{users.otherInfo}</div>
      <br />
      <div>最近の投稿</div>
      <hr />
      <ul>
        {/* <li>{yourPosts.text}</li> */}
        {yourPosts &&
          yourPosts.map((yourpost) => {
            return <li>{yourpost.text}</li>;
          })}
      </ul>
    </Layout>
  );
};

export default userInfo;
