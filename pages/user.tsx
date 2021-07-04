import { Button, TextField } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import Layout from "../components/layout";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/user.module.scss";

const user: React.FC = () => {
  return (
    <Layout>
      <Image src="/sasaki.jpeg" width={100} height={100} />
      <PhotoCameraIcon />
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
