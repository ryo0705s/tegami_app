import { TextField } from "@material-ui/core";
import React from "react";
import Layout from "../components/layout";

const login: React.FC = () => {
  return (
    <Layout>
      <p>メール</p>
      <TextField />
      <p>パスワード</p>
      <TextField />
      <p>グーグルアカウントでログイン</p>
      <TextField />
      <div>ゲストログイン</div>
      <div>パスワードを忘れた</div>
      <div>アカウントを作成する</div>
    </Layout>
  );
};

export default login;
