import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/layout";
import styles from "../../components/scss/login.module.scss";
import firebase from "firebase/app";
import { auth, provider, db } from "../../firebase";
import { useRouter } from "next/router";
import { AppContext } from "../../components/states/PageStates";
import { makeStyles } from "@material-ui/core/styles";

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
    loginedId,
    setLoginedId,
    logined,
    setLogined,
    users,
    setUsers,
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
    const authUser = auth.currentUser;
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
    const authUser = auth.currentUser;
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
    auth
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
        <p className={styles.loginButton}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            ログイン
          </Button>
        </p>
        {/* ) : (
          <Button variant="contained" color="primary" onClick={noNameLogin}>
            ログイン
          </Button>
        )} */}
        <br />
        <div className={styles.otherLogin}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={googleLogin}
          >
            Googleログイン
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={anonymousLogin}
          >
            ゲストログイン
          </Button>
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
