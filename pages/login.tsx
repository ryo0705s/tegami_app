import { Button, TextField } from "@material-ui/core";
import React from "react";

const login: React.FC = () => {
  return (
    <div>
      <p>メール</p>
      <TextField />
      <p>パスワード</p>
      <TextField />
      <p>グーグルアカウントでログイン</p>
      <TextField />
      <Button>ゲストログイン</Button>
      <Button>パスワードを忘れた</Button>
      <Button>アカウントを作成する</Button>
    </div>
  );
};

export default login;
