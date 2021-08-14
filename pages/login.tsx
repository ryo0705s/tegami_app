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
          // console.log(users.uid, "何が出るかな？");
        });
      })
      .catch((error) => {
        // console.log("Error getting documents: ", error);
      });
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
          // console.log("No such document!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    // console.log(getLoginInfo, "２番目に呼ばれてます");
  };

  const handleLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        alert(error.message);
      });
    await currentLogin();
    await findLoginId();
    await setEmail("");
    await setPassword("");
    // setLogined(true);
    // getLoginInfo();
    router.push("/");
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
    await currentLogin();
    // await hoge();
    // const authUser = firebase.auth().currentUser;
    // if (authUser) {
    //   const displayName = authUser.displayName;
    //   const email = authUser.email;
    //   // const photoURL = authUser.photoURL;
    //   // const emailVerified = authUser.emailVerified;
    //   const authUid = authUser.uid;
    //   // console.log(authUid);
    //   await setUsers({
    //     id: users.id,
    //     avatar: users.avatar,
    //     letterName: users.letterName,
    //     otherInfo: users.otherInfo,
    //     uid: authUid,
    //   });
    // } else {
    //   // No user is signed in.
    // }
    // console.log(users.uid, "uid呼ばれています");
    // setLogined(true);
    // await findLoginId();
    await getLoginInfo();
    router.push("/");
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
    await currentLogin();
    // setLogined(true);
    await findLoginId();
    // getLoginInfo();
    router.push("/");
  };
  const currentLogin = async () => {
    const authUser = firebase.auth().currentUser;
    if (authUser) {
      const displayName = authUser.displayName;
      const email = authUser.email;
      // const photoURL = authUser.photoURL;
      // const emailVerified = authUser.emailVerified;
      const authUid = authUser.uid;
      // console.log(photoURL, "ちゃんと出てる？");
      await db
        .collection("users")
        .get()
        .then(async (querySnapshot) => {
          await querySnapshot.forEach(async (doc) => {
            let userIds = [];
            await userIds.push(doc.data().uid);
            const loginId = userIds.find((userId) => userId === authUid);
            // doc.data() is never undefined for query doc snapshots
            loginId !== undefined
              ? await setLoginedId(loginId)
              : await console.log("見つけられませんでした");
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      // setUsers({
      //   id: users.id,
      //   avatar: users.avatar,
      //   letterName: users.letterName,
      //   otherInfo: users.otherInfo
      //   uid: authUid,
      // });
    } else {
      // No user is signed in.
    }
  };
  // デバッグ用コード
  useEffect(() => {
    console.log(loginedId, "出ていますか？");
  }, [loginedId]);

  // useEffect(() => {
  //   db.collection("users")
  //     .doc(users.id)
  //     .get()
  //     .then((doc) => {
  //       if (doc.id === users.id) {
  //         console.log("Document data:", doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, [currentLogin()]);
  const hoge = () => {
    // db.collection("users")
    //   .doc(users.id)
    //   .get()
    //   .then((doc) => {
    //     if (doc.id === users.id) {
    //       console.log("Document data:", doc.data());
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //   });
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userIds = [];
          userIds.push(doc.data().uid);
          const loginId = userIds.find((userId) => userId === users.uid);
          // doc.data() is never undefined for query doc snapshots
          console.log(userIds);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
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
