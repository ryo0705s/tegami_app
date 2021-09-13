import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/posting.module.scss";
import { storage, db } from "../firebase";
import "firebase/storage";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import { AppContext } from "../components/PageStates";

const posting: React.FC = () => {
  const {
    message,
    setMessage,
    pictureUrl,
    setPictureUrl,
    userId,
    setUserId,
    users,
    setUsers,
  }: any = useContext(AppContext);
  const router = useRouter();

  const handlePicture = (e: any) => {
    const next = function (snapshot) {};
    const error = function (error) {};
    const complete = function () {
      storage
        .ref()
        .child(`/images/${e.target.files[0].name}`)
        .getDownloadURL()
        .then(function (URL) {
          setPictureUrl(URL);
        })
        .catch(function (error) {
          alert(error.message);
        });
    };
    const uploadPicture = storage
      .ref(`/images/${e.target.files[0].name}`)
      .put(e.target.files[0]);

    uploadPicture.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const handlePost = () => {
    db.collection("posts")
      .add({
        image: pictureUrl,
        text: message,
        uid: users.uid,
      })
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    router.push("/postLists");
    setPictureUrl("");
  };

  return (
    <Layout>
      <img src={pictureUrl} width="400" height="500" />
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
      <p>説明</p>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
      />
      <p>
        <Button variant="contained" color="primary" onClick={handlePost}>
          作成
        </Button>
      </p>
    </Layout>
  );
};

export default posting;
