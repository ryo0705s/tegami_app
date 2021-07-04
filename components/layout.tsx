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
        <title>Letter From You & Me</title>
      </Head>
      <header>
        <h1>Letter From You & Me(仮)</h1>
        <ul className={styles.listStyle}>
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
      </header>
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
};
export default Layout;
