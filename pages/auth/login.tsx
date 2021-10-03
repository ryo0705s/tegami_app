import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/layout";
import styles from "../../components/login.module.scss";
import firebase from "firebase/app";
import { auth, provider, db } from "../../firebase";
// import {
//   getAuth,
//   setPersistence,
//   signInWithEmailAndPassword,
//   browserSessionPersistence,
// } from "firebase/auth";
import { useRouter } from "next/router";
import { AppContext } from "../../components/PageStates";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const login = () => {
  const classes = useStyles();
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
    guestLogined,
    setGuestLogined,
  }: any = useContext(AppContext);

  const router = useRouter();
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    currentLogin();
    setEmail("");
    setPassword("");
    // saveLoginState();
    // router.push("/");
  };

  const googleLogin = async () => {
    await auth
      .signInWithPopup(provider)
      .then((result: any) => {
        // return result;
        console.log(result, "パスワードでろ！");
      })
      .catch((error: any) => {
        alert(error.message);
      });
    currentLogin();
    // saveLoginState();
    // console.log(saveLoginState, "いじいじ");
  };

  const anonymousLogin = async () => {
    await auth
      .signInAnonymously()
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    onetimeLogin();
  };

  const currentLogin = async () => {
    const authUser = firebase.auth().currentUser;
    if (authUser) {
      const displayName = authUser.displayName;
      const email = authUser.email;
      // const photoURL = authUser.photoURL;
      // const emailVerified = authUser.emailVerified;
      const authUid = authUser.uid;
      console.log(authUid, "いる？");
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
              ? setLoginedId(userIds[loginIdNumber].id)
              : setUsers({
                  id: users.id,
                  avatar: users.avatar,
                  letterName: users.letterName,
                  otherInfo: users.otherInfo,
                  uid: authUid,
                });
            setAuthUserId(authUid);
            // router.push("/");
            // saveLoginState();
          });
        })
        .catch((error: any) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      console.log("誰もいない");
    }
  };

  const onetimeLogin = () => {
    const authUser = firebase.auth().currentUser;
    if (authUser) {
      const displayName = authUser.displayName;
      const email = authUser.email;
      // const photoURL = authUser.photoURL;
      // const emailVerified = authUser.emailVerified;
      const authUid = authUser.uid;
      setUsers({
        id: users.id,
        avatar: users.avatar,
        letterName: users.letterName,
        otherInfo: users.otherInfo,
        uid: authUid,
      });
      setGuestLogined(!guestLogined);
      router.push("/");
    } else {
      // No user is signed in.
    }
  };

  const forgotLoginInfo = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(forgotEmail)
      .then(() => {
        setLogined(!logined);
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  // 登録済みのメールとパスワードを元に、axiosでfirebaseと通信し、tokenを取得し、
  // localstorageに保管
  // const saveLoginState = () => {
  //   // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  //   // const state = {
  //   //   isSignUp: true,
  //   //   token: null,
  //   //   error: "",
  //   // };
  //   // 認証データ
  //   const authDate = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   };
  //   // signUp用のAPIキー
  //   let url =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyCNOWL6WQRN0GEVJq7E0cV6TnHsr4PjOSQ]";
  //   // signIn用のAPIキー
  //   if (users) {
  //     url =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[AIzaSyCNOWL6WQRN0GEVJq7E0cV6TnHsr4PjOSQ]";
  //     if (email && password) {
  //       axios
  //         .post(url, authDate)
  //         .then((response) => {
  //           // 返ってきたトークンをローカルストレージに格納する
  //           localStorage.setItem("token", response.data.idToken);
  //         })
  //         .catch((error) => {
  //           // Firebase側で用意されているエラーメッセージが格納される
  //           alert(error);
  //         });
  //     }
  //   }
  // };
  // リロードしたらfirebase.auth().onAuthStateChangedが走るようにする

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
          .catch((error: any) => {
            alert(error.message);
          });
      })();
  }, [loginedId]);

  // デバッグ用コード
  useEffect(() => {
    console.log(users.letterName, "レタス");
  }, [users]);

  useEffect(() => {
    console.log(guestLogined, "出ていますか？");
  }, [guestLogined]);

  return (
    <Layout>
      <div className={styles.login}>
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-password-input"
              label="Email"
              type="Email"
              autoComplete="current-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        </div>
        <br />
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-password-input"
              label="Password"
              type="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <br />
        {/* {users.letterName ? ( */}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          ログイン
        </Button>
        {/* ) : (
          <Button variant="contained" color="primary" onClick={noNameLogin}>
            ログイン
          </Button>
        )} */}
        <br />
        <div className={styles.otherLogin}>
          <p onClick={googleLogin}>グーグルアカウントでログイン</p>
          <br />
          <p onClick={anonymousLogin}>ゲストログイン</p>
        </div>
        <br />
        <div className={styles.forLogin}>
          <p onClick={() => setLogined(!logined)}>パスワードを忘れた</p>
          {logined ? (
            <>
              <span>メール</span>
              <TextField
                type="email"
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                value={forgotEmail}
                onClick={forgotLoginInfo}
              >
                送信
              </Button>
            </>
          ) : (
            ""
          )}
          <br />
          <p>
            <Link href="/auth/loginUser">アカウントを作成する</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default login;