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
  } = useContext(AppContext);

  const router = useRouter();

  const findLoginId = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userIds = [];
          userIds.push(doc.id);
          const loginId = userIds.find((userId) => userId.uid === users.uid);
          setLoginedId(loginId);
          console.log(loginId, "何が出るかな？");
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    console.log(loginedId, "1番目に呼ばれています");
  };
  const getLoginInfo = () => {
    const docRef = db.collection("users").doc(loginedId);
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
          router.push("/login");
          console.log("No such document!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    console.log(getLoginInfo, "２番目に呼ばれてます");
  };

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
    setLogined(true);
    findLoginId();
    getLoginInfo();
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
    // setLogined(true);
    findLoginId();
    getLoginInfo();
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
    setLogined(true);
    findLoginId();
    getLoginInfo();
    router.push("/");
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        // このuserIdはauthenticationのuid
        setUserId(uid);
      } else {
      }
    });
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: user.otherInfo,
      uid: userId,
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
