import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/user.module.scss";
import firebase from "firebase/app";
import { storage } from "../firebase";

const user: React.FC = () => {
  // const [myName, setMyName] = useState("")
  const handleAvatar = (e: any) => {
    const next = function (snapshot) {};
    const error = function (error) {};
    const complete = function () {
      storage
        .ref()
        .child(`/avatars/${e.target.files[0].name}`)
        .getDownloadURL()
        .then(function (url) {
          const img = document.getElementById("myAvatar");
          img.src = url;
        })
        .catch(function (error) {
          alert(error.message);
        });
    };
    const uploadPicture = storage
      .ref(`/avatars/${e.target.files[0].name}`)
      .put(e.target.files[0]);

    uploadPicture.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  return (
    <Layout>
      <img src="" width={100} height={100} id="myAvatar" />
      <IconButton>
        <label>
          <PhotoCameraIcon />
          <input type="file" className={styles.input} onChange={handleAvatar} />
        </label>
      </IconButton>
      <p>レターネーム</p>
      <TextField />
      <p>コメント</p>
      <TextField multiline variant="outlined" />
      <p>
        <Button variant="contained" color="primary">
          作成
        </Button>
      </p>
      <br />
      <div className={styles.posts}>投稿一覧</div>
    </Layout>
  );
};

export default user;
