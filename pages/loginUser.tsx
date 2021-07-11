import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../components/login.module.scss";
import firebase from "firebase/app";
import { auth } from "../firebase";
import { useRouter } from "next/router";

const loginUser: React.FC = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    setEmail("");
    setPassword("");
    router.push("/login");
  };
  return (
    <Layout>
      <h2>ユーザーを作成する</h2>
      <div className={styles.login}>
        <div>
          <span>メール</span>
          <TextField
            type="email"
            value={email}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <span>パスワード</span>
          <TextField
            type="password"
            value={password}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setPassword(e.target.value)}
          />
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
