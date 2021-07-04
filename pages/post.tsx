import { TextField } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React from "react";
import Image from "next/image";
import Layout from "../components/layout";

const post: React.FC = () => {
  return (
    <Layout>
      <Image src="/sasaki.jpeg" width="20" height="20" />
      <p>説明</p>
      <TextField />
      <p>コメント</p>
      <TextField />
      <ThumbUpAltIcon />
    </Layout>
  );
};

export default post;
