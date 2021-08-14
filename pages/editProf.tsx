import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/user.module.scss";
import firebase from "firebase/app";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";
import user from "./user";

const editProf: React.FC = () => {
  const router = useRouter();
  const {
    users,
    setUsers,
    avatarUrl,
    setAvatarUrl,
    loginedId,
    setLoginedId,
  } = useContext(AppContext);

  useEffect(() => {
    const docRef = db.collection("users").doc(loginedId);
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
        } else {
          // router.push("/login");
          console.log("No such document!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  useEffect(() => {
    console.log(users, "お前誰？");
  }, [users]);

  return (
    <Layout>
      {/* <img src={avatarUrl} width={100} height={100} />
      <IconButton>
        <label>
          <PhotoCameraIcon />
          <input type="file" className={styles.input} value={users.avatar} onChange={editAvatar} />
        </label>
      </IconButton>
      <p>レターネーム</p>
      <TextField value={users.letterName} onChange={editLetterName} />
      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        value={users.otherInfo} onChange={editOterInfo}
      />
      <p>
        <Button variant="contained" color="primary" onClick={createProfile}>
          作成
        </Button>
      </p>
      <br />
      <div className={styles.posts}>投稿一覧</div> */}
    </Layout>
  );
};

export default editProf;
