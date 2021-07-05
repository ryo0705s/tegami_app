import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Letter From You &amp; Me</title>
      </Head>
      <header>
        <h1>Letter From You &amp; Me(仮)</h1>
        <ul className={styles.listStyle}>
          <li>
            <Link href="/">トップ</Link>
          </li>
          <li>
            <Link href="/login">ログイン</Link>
          </li>
          <li>
            <Link href="/user">ユーザー作成</Link>
          </li>
          <li>
            <Link href="/posting">投稿する</Link>
          </li>
          <li>
            <Link href="/posts">みんなの投稿</Link>
          </li>
        </ul>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>
        <ul className={styles.listStyle}>
          <li>
            <Link href="/">トップ</Link>
          </li>
          <li>
            <Link href="/login">ログイン</Link>
          </li>
          <li>
            <Link href="/user">ユーザー作成</Link>
          </li>
          <li>
            <Link href="/posts">みんなの投稿</Link>
          </li>
        </ul>
        <div>&copy; 2021 Letter From You &amp; Me(仮) All Rights Reserved</div>
      </footer>
    </>
  );
};
export default Layout;
