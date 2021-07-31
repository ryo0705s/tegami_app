import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/user.module.scss";
import firebase from "firebase/app";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";

const user: React.FC = () => {
  const { userId, setUserId, avatarUrl, setAvatarUrl } = useContext(AppContext);
  const [avatar, setAvatar] = useState("");
  const [letterName, setLetterName] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const router = useRouter();

  const handleAvatar = (e: any) => {
    const next = function (snapshot) {};
    const error = function (error) {};
    const complete = function () {
      storage
        .ref()
        .child(`/avatars/${e.target.files[0].name}`)
        .getDownloadURL()
        .then(function (URL) {
          setAvatarUrl(URL);
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

  const createProfile = () => {
    db.collection("users")
      .add({
        avatar: avatarUrl,
        letterName: letterName,
        otherInfo: otherInfo,
        uid: userId,
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    router.push("/");
  };
  return (
    <Layout>
      <img src={avatarUrl} width={100} height={100} />
      <IconButton>
        <label>
          <PhotoCameraIcon />
          <input type="file" className={styles.input} onChange={handleAvatar} />
        </label>
      </IconButton>
      <p>レターネーム</p>
      <TextField onChange={(e) => setLetterName(e.target.value)} />
      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        onChange={(e) => setOtherInfo(e.target.value)}
      />
      <p>
        <Button variant="contained" color="primary" onClick={createProfile}>
          作成
        </Button>
      </p>
      <br />
      <div className={styles.posts}>投稿一覧</div>
    </Layout>
  );
};

export default user;
