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

const editProf: React.FC = () => {
  const { avatarUrl } = useContext(AppContext);
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

export default editProf;
