import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../components/login.module.scss";
import { auth, provider } from "../firebase";
import { useRouter } from "next/router";

const login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    setEmail("");
    setPassword("");
    router.push("/");
  };
  const googleSubmit = () => {
    auth
      .signInWithPopup(provider)
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    router.push("/");
  };
  const anonymousSubmit = () => {
    auth
      .signInAnonymously()
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    router.push("/");
  };
  return (
    <Layout>
      <h2>ログイン</h2>
      <div className={styles.login}>
        <div>
          <span>メール</span>
          <TextField
            type="email"
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
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          ログイン
        </Button>
        <br />
        <p onClick={googleSubmit}>グーグルアカウントでログイン</p>
        <br />
        <p onClick={anonymousSubmit}>ゲストログイン</p>
        <br />
        <p>パスワードを忘れた</p>
        <br />
        <p>
          <Link href="/loginUser">アカウントを作成する</Link>
        </p>
      </div>
    </Layout>
  );
};

export default login;
