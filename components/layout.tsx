import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { AppContext } from "./PageStates";
import firebase from "firebase/app";
import { db } from "../firebase";
import { PostAddSharp } from "@material-ui/icons";

const Layout = ({ children }) => {
  const router = useRouter();
  const {
    userId,
    setUserId,
    avatarUrl,
    setAvatarUrl,
    users,
    setUsers,
    loginedId,
    setLoginedId,
  } = useContext(AppContext);

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

  // useEffect(() => {
  //   const docRef = db.collection("users").doc(users.id);

  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         setUsers({
  //           id: doc.id,
  //           avatar: doc.data().avatar,
  //           letterName: doc.data().letterName,
  //           otherInfo: doc.data().otherInfo,
  //           uid: doc.data().uid,
  //         });
  //       } else {
  //         router.push("/login");
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  //   console.log(users);
  // }, []);
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
        <div>{`${loginedId}さんこんにちは`}</div>
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
