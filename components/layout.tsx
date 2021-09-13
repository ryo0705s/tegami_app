import React, { ReactNode, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../firebase";
import { NextRouter, useRouter } from "next/router";
import { AppContext } from "./PageStates";

interface Props {
  children?: ReactNode;
}

const Layout: React.FC = ({ children }: Props) => {
  const router: NextRouter = useRouter();
  const {
    userId,
    setUserId,
    avatarUrl,
    setAvatarUrl,
    users,
    setUsers,
    loginedId,
    setLoginedId,
  }: any = useContext(AppContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    setUsers({
      id: "",
      avatar: "",
      letterName: "",
      otherInfo: "",
      uid: "",
    });
    console.log(users);
    router.push("/login");
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Letter From You &amp; Me</title>
      </Head>

      <header>
        <div>
          <h1>Letter From You &amp; Me(仮)</h1>
          <img
            src={users.avatar}
            alt="prof"
            width="50"
            height="50"
            onClick={() => router.push("./editProf")}
          />
          <div className={styles.svg} onClick={handleLogout}>
            <ExitToAppIcon fontSize="large" />
          </div>
        </div>
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
            <Link href="/postLists">みんなの投稿</Link>
          </li>
        </ul>
      </header>
      <main>
        <div>{`${users.uid}さんこんにちは`}</div>
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
            <Link href="/postLists">みんなの投稿</Link>
          </li>
        </ul>
        <div>&copy; 2021 Letter From You &amp; Me(仮) All Rights Reserved</div>
      </footer>
    </>
  );
};
export default Layout;
