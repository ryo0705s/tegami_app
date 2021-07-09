import { TextField } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import styles from "../components/login.module.scss";

const login: React.FC = () => {
  return (
    <Layout>
      <h2>ログイン</h2>
      <div className={styles.login}>
        <div>
          <span>メール</span>
          <TextField type="email" />
        </div>
        <br />
        <div>
          <span>パスワード</span>
          <TextField type="password" />
        </div>
        <br />
        <p>グーグルアカウントでログイン</p>
        <br />
        <p>ゲストログイン</p>
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
