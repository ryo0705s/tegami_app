import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layout";
import styles from "../components/login.module.scss";
import firebase from "firebase/app";
import { auth, provider } from "../firebase";
import { useRouter } from "next/router";
import { AppContext } from "../components/PageStates";

const login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userId,
    setUserId,
  } = useContext(AppContext);
  const router = useRouter();
  const handleLogin = () => {
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
  const googleLogin = () => {
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
  const anonymousLogin = () => {
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
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
      }
    });
  }, []);
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
        <Button variant="contained" color="primary" onClick={handleLogin}>
          ログイン
        </Button>
        <br />
        <p onClick={googleLogin}>グーグルアカウントでログイン</p>
        <br />
        <p onClick={anonymousLogin}>ゲストログイン</p>
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
