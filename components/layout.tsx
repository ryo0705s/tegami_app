import React, { ReactNode, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase/app";
import { auth, db } from "../firebase";
import { NextRouter, useRouter } from "next/router";
import { AppContext } from "./PageStates";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [authId, setAuthId] = useState("");
  const {
    userId,
    setUserId,
    avatarUrl,
    setAvatarUrl,
    users,
    setUsers,
    guestLogined,
    setGuestLogined,
    authUserId,
    setAuthUserId,
  }: any = useContext(AppContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then((result) => {
        window.confirm("ログアウトしました");
      })
      .catch((error: any) => {
        alert(error.message);
      });
    setUsers({
      id: "",
      avatar: "avatar.png",
      letterName: "",
      otherInfo: "",
      uid: "",
    });
    setGuestLogined(!guestLogined);
    router.push("/login");
  };

  const authLogin = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const authUid = user.uid;
        await db
          .collection("users")
          .get()
          .then((querySnapshot) => {
            let userIds = [];
            querySnapshot.forEach((doc) => {
              const restData = { ...doc.data() };
              userIds.push({
                id: doc.id,
                avatar: restData.avatar,
                letterName: restData.letterName,
                otherInfo: restData.otherInfo,
                uid: restData.uid,
              });
              const loginIdNumber: number = userIds.findIndex(
                (userId) => userId.uid === authUid
              );
              // console.log(loginIdNumber, "ロングマン");
              loginIdNumber !== -1
                ? setAuthId(userIds[loginIdNumber].id)
                : setUsers({
                    id: users.id,
                    avatar: users.avatar,
                    letterName: users.letterName,
                    otherInfo: users.otherInfo,
                    uid: authUid,
                  });
              setAuthUserId(authUid);
              // saveLoginState();
            });
          })
          .catch((error: any) => {
            console.log("Error getting documents: ", error);
          });
      } else {
        console.log("誰もいない夏");
      }
    });
  };

  useEffect(() => {
    authLogin();
  }, []);

  useEffect(() => {
    if (authId)
      (async () => {
        const docRef = await db.collection("users").doc(authId);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUsers({
                id: doc.id,
                avatar: doc.data().avatar,
                letterName: doc.data().letterName,
                otherInfo: doc.data().otherInfo,
                uid: doc.data().uid,
              });
            } else {
              console.log("No such document!");
            }
          })
          .catch((error: any) => {
            alert(error.message);
          });
      })();
  }, [authId]);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TEGAMI</title>
      </Head>
      {users.uid ? (
        <header>
          <div>
            {/* <h1>TEGAMI</h1> */}
            <div className={styles.svg} onClick={handleLogout}>
              <ExitToAppIcon fontSize="large" />
            </div>
          </div>
          <ul className={styles.loginedListStyle}>
            <li>
              <img
                src="tegamiLogo.png"
                alt="tegami"
                className={styles.topLogo}
              />
            </li>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              ログイン
              {/* <Link href="/login">ログイン</Link> */}
            </li>
            {!users.letterName ? (
              <li>
                <Link href="/user">プロフィールを作成する</Link>
              </li>
            ) : (
              <li className={styles.createProf}>プロフィールを作成する</li>
            )}
            <li>
              <Link href="/posting">投稿する</Link>
            </li>
            <li>
              <Link href="/postLists">みんなの投稿</Link>
            </li>
          </ul>
        </header>
      ) : (
        <header>
          <br />
          <ul className={styles.listStyle}>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href="/login">ログイン</Link>
            </li>
            <li>ユーザー作成</li>
            <li>投稿する</li>
            <li>
              <Link href="/postLists">みんなの投稿</Link>
            </li>
          </ul>
        </header>
      )}
      <main>
        <img
          src={users.avatar}
          alt="prof"
          width="50"
          height="50"
          onClick={() => router.push("./editProf")}
        />
        <div>{`${users.uid}さんこんにちは`}</div>
        <div>{children}</div>
      </main>
      {users.uid ? (
        <footer>
          <br />
          <div>
            {/* <h1>TEGAMI</h1> */}
            <div className={styles.svg} onClick={handleLogout}>
              <ExitToAppIcon fontSize="large" />
            </div>
          </div>
          <ul className={styles.loginedListStyle}>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              ログイン
              {/* <Link href="/login">ログイン</Link> */}
            </li>
            {!users.letterName ? (
              <li>
                <Link href="/user">プロフィールを作成する</Link>
              </li>
            ) : (
              <li>プロフィールを作成する</li>
            )}
            <li>
              <Link href="/posting">投稿する</Link>
            </li>
            <li>
              <Link href="/postLists">みんなの投稿</Link>
            </li>
          </ul>
        </footer>
      ) : (
        <footer>
          <br />
          <ul className={styles.listStyle}>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href="/login">ログイン</Link>
            </li>
            <li>ユーザー作成</li>
            <li>投稿する</li>
            <li>
              <Link href="/postLists">みんなの投稿</Link>
            </li>
          </ul>
          <div>&copy; 2021 TEGAMI All Rights Reserved</div>
        </footer>
      )}
    </>
  );
};
export default Layout;
