import React, { useContext } from "react";
import { auth, provider, db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/PageStates";

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

  const {
    email,
    setEmail,
    password,
    setPassword,
    logined,
    setLogined,
    users,
    setUsers,
    guestLogined,
    setGuestLogined,
    router,
    setLoginedId,
    setAuthUserId,
    forgotEmail,
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

  return {
    handleLogin,
    googleLogin,
    currentLogin,
    onetimeLogin,
    anonymousLogin,
    forgotLoginInfo,
  };
};
