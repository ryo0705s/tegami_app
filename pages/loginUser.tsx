import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../components/login.module.scss";

const loginUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    
  };
  return (
    <Layout>
      <h2>ユーザーを作成する</h2>
      <div className={styles.login}>
        <div>
          <span>メール</span>
          <TextField type="email" value={email} onChange={e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> => {setEmail(e.target.value)} />
        </div>
        <br />
        <div>
          <span>パスワード</span>
          <TextField type="password" value={password} />
        </div>
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          登録する
        </Button>
      </div>
    </Layout>
  );
};

export default loginUser;
