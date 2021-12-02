import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { auth, provider, db, userDB } from "../../firebase";
import Layout from "../../components/layout";
import styles from "../../components/scss/login.module.scss";
import { AppContext } from "../../context/PageStates";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import useCurrentUser from "../../hooks/useCurrentUser";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export const useLoginAction = () => {
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
    setLoginedId,
    setAuthUserId,
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
    // useCurrentUser;
    currentLogin();
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
    // useCurrentUser;
    currentLogin();
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

  return;
  {
    handleLogin,
      googleLogin,
      currentLogin,
      onetimeLogin,
      anonymousLogin,
      forgotLoginInfo;
  }
};
