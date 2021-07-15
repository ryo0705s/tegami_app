import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/posting.module.scss";
import { storage } from "../firebase";
import "firebase/storage";
import firebase from "firebase/app";

const posting: React.FC = () => {
  const [post, setPost] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  const handlePicture = (e: any) => {
    const next = function (snapshot) {};
    const error = function (error) {};
    const complete = function () {};
    const uploadPicture = storage
      .ref(`/images/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    // setPicture(e.target.files[0]);
    uploadPicture.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
    e.target.value = "";
    // console.log(handlePicture);
  };
  return (
    <Layout>
      <Image src="/letter1.jpg" width="400" height="500" />
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
      <TextField multiline variant="outlined" fullWidth />
      <p>
        <Button variant="contained" color="primary">
          作成
        </Button>
      </p>
    </Layout>
  );
};

export default posting;
