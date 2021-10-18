import React, { ReactNode, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase/app";
import { auth, db } from "../firebase";
import { NextRouter, useRouter } from "next/router";
import { AppContext } from "./PageStates";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [authId, setAuthId] = useState("");
  const [menuWindow, setMenuWindow] = useState(false);
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
      avatar: "/avatar.png",
      letterName: "",
      otherInfo: "",
      uid: "",
    });
    setGuestLogined(!guestLogined);
    router.push("/auth/login");
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
            <div className={styles.svg} onClick={handleLogout}>
              <ExitToAppIcon />
              <span className={styles.logout}>ログアウトします</span>
            </div>
          </div>
          <ul className={styles.loginedListStyle_header}>
            <li className={styles.topLogo} onClick={() => router.push("/")}>
              <img src="/tegamiLogo.png" alt="tegami" />
            </li>
            <div className={styles.menuList}>
              <li>
                <Link href="/">トップ</Link>
              </li>
              <li>
                <a>ログイン</a>
              </li>
              {!users.letterName ? (
                <li>
                  <Link href="/users/user">プロフィールを作成する</Link>
                </li>
              ) : (
                <li className={styles.createProf}>
                  <a>プロフィールを作成する</a>
                </li>
              )}
              <li>
                <Link href="/posts/posting">投稿する</Link>
              </li>
              <li>
                <Link href="/posts/postLists">みんなの投稿</Link>
              </li>
            </div>
          </ul>

          <div
            className={styles.menuIcon}
            onClick={() => setMenuWindow(!menuWindow)}
          >
            <MenuIcon />
          </div>
          {menuWindow ? (
            <ul className={styles.menuButton}>
              <li>
                <Link href="/">トップ</Link>
              </li>
              <li>
                <a>ログイン</a>
              </li>
              {!users.letterName ? (
                <li>
                  <Link href="/users/user">プロフィールを作成する</Link>
                </li>
              ) : (
                <li className={styles.createProf}>
                  <a>プロフィールを作成する</a>
                </li>
              )}
              <li>
                <Link href="/posts/posting">投稿する</Link>
              </li>
              <li>
                <Link href="/posts/postLists">みんなの投稿</Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </header>
      ) : (
        <header>
          <ul className={styles.listStyle_header}>
            <li className={styles.topLogo} onClick={() => router.push("/")}>
              <img src="/tegamiLogo.png" alt="tegami" />
            </li>
            <div className={styles.menuList}>
              <li>
                <Link href="/">トップ</Link>
              </li>
              <li>
                <Link href="/auth/login">ログイン</Link>
              </li>
              <li>
                <a>ユーザー作成</a>
              </li>
              <li>
                <a>投稿する</a>
              </li>
              <li>
                <Link href="/posts/postLists">みんなの投稿</Link>
              </li>
            </div>
          </ul>
          <div
            className={styles.menuIcon}
            onClick={() => setMenuWindow(!menuWindow)}
          >
            <MenuIcon />
          </div>
          {menuWindow ? (
            <ul className={styles.menuButton}>
              <li>
                <Link href="/">トップ</Link>
              </li>
              <li>
                <Link href="/auth/login">ログイン</Link>
              </li>
              <li>
                <a>ユーザー作成</a>
              </li>
              <li>
                <a>投稿する</a>
              </li>
              <li>
                <Link href="/posts/postLists">みんなの投稿</Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </header>
      )}
      <main>
        <img
          src={users.avatar}
          alt="prof"
          width="50"
          height="50"
          className={styles.avatarImage}
          onClick={() => router.push("/users/editProf")}
        />
        <p className={styles.hello}>{`${users.uid}さんこんにちは`}</p>
        <div>{children}</div>
      </main>
      {users.uid ? (
        <footer>
          <br />
          <div>
            {/* <h1>TEGAMI</h1> */}
            {/* <div className={styles.svg} onClick={handleLogout}>
              <ExitToAppIcon />
              <span className={styles.logout}>ログアウトします</span>
            </div> */}
          </div>
          <ul className={styles.loginedListStyle_footer}>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <a>ログイン</a>
            </li>
            {!users.letterName ? (
              <li>
                <Link href="/users/user">プロフィールを作成する</Link>
              </li>
            ) : (
              <li>
                <a>プロフィールを作成する</a>
              </li>
            )}
            <li>
              <Link href="/posts/posting">投稿する</Link>
            </li>
            <li>
              <Link href="/posts/postLists">みんなの投稿</Link>
            </li>
          </ul>
          <br />
          <p>&copy; 2021 TEGAMI All Rights Reserved</p>
        </footer>
      ) : (
        <footer>
          <br />
          <ul className={styles.listStyle_footer}>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href="/auth/login">ログイン</Link>
            </li>
            <li>
              <a>ユーザー作成</a>
            </li>
            <li>
              <a>投稿する</a>
            </li>
            <li>
              <Link href="/posts/postLists">みんなの投稿</Link>
            </li>
          </ul>
          <br />
          <p>&copy; 2021 TEGAMI All Rights Reserved</p>
        </footer>
      )}
    </>
  );
};
export default Layout;
