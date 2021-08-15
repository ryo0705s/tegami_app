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

const editProf: React.FC = () => {
  const router = useRouter();
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
    docRef.set({
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: users.otherInfo,
      uid: users.uid,
    });
    router.push("/");
  };
  // const deleteProfile = () => {
  //   docRef
  //     .delete()
  //     .then(() => {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch((error) => {
  //       console.error("Error removing document: ", error);
  //     });
  // };
  const {
    users,
    setUsers,
    avatarUrl,
    setAvatarUrl,
    loginedId,
    setLoginedId,
  } = useContext(AppContext);

  const docRef = db.collection("users").doc(loginedId);
  useEffect(() => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsers({
            id: doc.id,
            avatar: doc.data().avatar,
            letterName: doc.data().letterName,
            otherInfo: doc.data().otherInfo,
            uid: doc.data().uid,
          });
          setAvatarUrl(users.avatar);
        } else {
          // router.push("/login");
          console.log("No such document!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  // デバッグ用コード
  useEffect(() => {
    console.log(users, "お前誰？");
  }, [users]);

  return (
    <Layout>
      <img src={users.avatar} width={100} height={100} />
      <IconButton>
        <label>
          <PhotoCameraIcon />
          <input type="file" className={styles.input} onChange={editAvatar} />
        </label>
      </IconButton>
      <p>レターネーム</p>
      <TextField value={users.letterName} onChange={editLetterName} />
      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        value={users.otherInfo}
        onChange={editOtherInfo}
      />
      <p>
        <Button variant="contained" color="primary" onClick={editProfile}>
          編集
        </Button>
      </p>
      {/* <Button variant="contained" color="secondary" onClick={deleteProfile}>
        削除
      </Button> */}
    </Layout>
  );
};

export default editProf;
