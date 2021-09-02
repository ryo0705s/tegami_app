import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layout";
import styles from "../components/login.module.scss";
import firebase from "firebase/app";
import { auth, provider, db } from "../firebase";
import { useRouter } from "next/router";
import { AppContext } from "../components/PageStates";
import user from "./user";

const login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userId,
    setUserId,
    loginedId,
    setLoginedId,
    avatarUrl,
    setAvatarUrl,
    logined,
    setLogined,
    users,
    setUsers,
    authUserId,
    setAuthUserId,
  } = useContext(AppContext);

  const router = useRouter();
  const [loginedIdNumber, setLoginedIdNumber] = useState(0);

  const handleLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    currentLogin();
    setEmail("");
    setPassword("");
    // router.push("/");
  };

  const googleLogin = async () => {
    await auth
      .signInWithPopup(provider)
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    currentLogin();
    // router.push("/");
  };

  const anonymousLogin = async () => {
    await auth
      .signInAnonymously()
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    currentLogin();
  };

  const currentLogin = async () => {
    const authUser = firebase.auth().currentUser;
    if (authUser) {
      const displayName = authUser.displayName;
      const email = authUser.email;
      // const photoURL = authUser.photoURL;
      // const emailVerified = authUser.emailVerified;
      const authUid = authUser.uid;

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
            console.log(authUser.uid, "authUidのなかみ");
            const loginIdNumber = userIds.findIndex(
              (userId) => userId.uid === authUid
            );
            // console.log(loginIdNumber, "loginナンバー出てる？");
            loginIdNumber !== -1 ? setLoginedId(userIds[loginIdNumber].id) : "";
            setAuthUserId(authUid);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      // No user is signed in.
    }
  };

  useEffect(() => {
    if (loginedId)
      (async () => {
        const docRef = await db.collection("users").doc(loginedId);
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
              router.push("/");
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      })();
  }, [loginedId]);

  useEffect(() => {
    setAvatarUrl(users.avatar);
  }, [users]);

  // デバッグ用コード
  useEffect(() => {
    console.log(loginedId, "出ていますか？");
  }, [loginedId]);

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
