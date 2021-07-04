import { TextField } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import Layout from "../components/layout";

const user: React.FC = () => {
  return (
    <Layout>
      <Image src="/sasaki.jpeg" width="20" height="20" />
      <p>レターネーム</p>
      <TextField />
      <p>備考</p>
      <TextField />
      <p>投稿一覧</p>
      <TextField />
    </Layout>
  );
};

export default user;
