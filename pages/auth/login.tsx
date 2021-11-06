import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { auth, provider, db, userDB } from "../../firebase";
import Layout from "../../components/layout";
import styles from "../../components/scss/login.module.scss";
import { AppContext } from "../../components/context/PageStates";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useCurrentUser from "../../components/hooks/useCurrentUser";

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

  const [forgotEmail, setForgotEmail] = useState("");

  const {
    email,
    setEmail,
    password,
    setPassword,
    loginedId,
    logined,
    setLogined,
    users,
    setUsers,
    guestLogined,
    setGuestLogined,
    router,
  }: any = useContext(AppContext);

  const handleLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    useCurrentUser;
    setEmail("");
    setPassword("");
  };

  const googleLogin = async () => {
    await auth
      .signInWithPopup(provider)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    useCurrentUser;
  };

  const onetimeLogin = () => {
    const authUser = auth.currentUser;
    if (authUser) {
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
      alert("ログインユーザーが見つかりません");
    }
  };
  const anonymousLogin = async () => {
    try {
      await auth
        .signInAnonymously()
        .then((result: any) => {
          return result;
        })
        .catch((error: any) => {
          alert(error.message);
        });
      onetimeLogin();
    } catch {
      alert("ログインに失敗しました");
    }
  };

  const forgotLoginInfo = () => {
    auth
      .sendPasswordResetEmail(forgotEmail)
      .then(() => {
        setLogined(!logined);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (loginedId)
      (async () => {
        const docRef = await userDB.doc(loginedId);
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
              alert("対象のドキュメントが見つかりません");
            }
          })
          .catch((error: any) => {
            alert(error.message);
          });
      })();
  }, [loginedId]);

  useEffect(() => {
    console.log(users, "いる？");
  }, [users]);

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
        <p className={styles.loginButton}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            ログイン
          </Button>
        </p>
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
