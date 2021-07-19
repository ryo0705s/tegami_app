import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/posting.module.scss";
import { storage, db } from "../firebase";
import "firebase/storage";
import firebase from "firebase/app";

const posting: React.FC = () => {
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");
  const handlePicture = (e: any) => {
    const next = function (snapshot) {};
    const error = function (error) {};
    const complete = function () {};
    const uploadPicture = storage.ref(`/images/${picture.name}`).put(picture);

    setPicture(e.target.files[0]);
    console.log(picture);
    uploadPicture.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
    storage
      .ref()
      .child(`/images/${picture.name}`)
      .getDownloadURL()
      .then(function (url) {
        const img = document.getElementById("myimg");
        img.src = url;
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
  const handlePost = () => {
    db.collection("posts")
      .add({
        image: "",
        text: message,
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Layout>
      <img src="" width="400" height="500" id="myimg" />
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
        onChange={(e) => setMessage(e.target.value)}
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
