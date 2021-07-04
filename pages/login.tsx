import { Button, TextField } from "@material-ui/core";
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
      <Button>ゲストログイン</Button>
      <Button>パスワードを忘れた</Button>
      <Button>アカウントを作成する</Button>
    </Layout>
  );
};

export default login;
