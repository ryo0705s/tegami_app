import { Button, IconButton, TextField } from "@material-ui/core";
import { Avatar } from "@mui/material";
import React, { useContext, useEffect } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../../components/scss/user.module.scss";
import { db, storage } from "../../firebase";
import {
  AppContext,
  userProps,
  postProps,
} from "../../components/states/PageStates";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const editProf = () => {
  const classes = useStyles();
  const router = useRouter();

  const createLetterName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: e.target.value,
      otherInfo: users.otherInfo,
      uid: users.uid,
    });
  };
  const createOtherInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: e.target.value,
      uid: users.uid,
    });
  };
  const createProfile = () => {
    db.collection("users").add({
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: users.otherInfo,
      uid: authUserId,
    });
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: users.otherInfo,
      uid: authUserId,
    });
    router.push("/");
  };
  const editAvatar = (e) => {
    storage
      .ref()
      .child(`/avatars/${e.target.files[0].name}`)
      .put(e.target.files[0])
      .then(function (snapshot) {
        console.log("Uploaded a blob or file!");
        storage
          .ref()
          .child(`/avatars/${e.target.files[0].name}`)
          .getDownloadURL()
          .then(function (URL) {
            setUsers({
              id: users.id,
              avatar: URL,
              letterName: users.letterName,
              otherInfo: users.otherInfo,
              uid: users.uid,
            });
            console.log(URL, "アドレス教えて！");
          })
          .catch(function (error: any) {
            // Handle any errors
          });
      });
  };
  const editLetterName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: e.target.value,
      otherInfo: users.otherInfo,
      uid: users.uid,
    });
  };
  const editOtherInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsers({
      id: users.id,
      avatar: users.avatar,
      letterName: users.letterName,
      otherInfo: e.target.value,
      uid: users.uid,
    });
  };
  const editProfile = () => {
    db.collection("users")
      .doc(loginedId)
      .set({
        avatar: users.avatar,
        letterName: users.letterName,
        otherInfo: users.otherInfo,
        uid: users.uid,
      })
      .then((result) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    router.push("/");
  };
  // const deleteProfile = () => {
  //   docRef
  //     .delete()
  //     .then(() => {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch((error) => {
  //       console.error("Error removing document: ", error);
  //     });
  // };
  const {
    users,
    setUsers,
    avatarUrl,
    setAvatarUrl,
    loginedId,
    setLoginedId,
    authUserId,
    setAuthUserId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

  useEffect(() => {
    setLoginedId(users.id);
  });
  // デバッグ用コード
  useEffect(() => {
    console.log(users, "お前誰？");
  }, [users]);

  return users.id ? (
    <Layout>
      <div className={styles.avatarEdit}>
        <Avatar src={users.avatar} alt="prof" className={styles.editImg} />
        <IconButton>
          <label>
            <PhotoCameraIcon />
            <input type="file" className={styles.input} onChange={editAvatar} />
          </label>
        </IconButton>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="standard-required"
          label="レターネーム"
          value={users.letterName}
          onChange={editLetterName}
        />
      </form>
      <br />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-multiline-static"
          label="コメント"
          multiline
          rows={4}
          variant="outlined"
          value={users.otherInfo}
          onChange={editOtherInfo}
        />
      </form>
      <p>
        <Button variant="contained" color="primary" onClick={editProfile}>
          編集
        </Button>
      </p>
      {/* <Button variant="contained" color="secondary" onClick={deleteProfile}>
      削除
    </Button> */}
    </Layout>
  ) : (
    <Layout>
      <div className={styles.avatarEdit}>
        <Avatar src={users.avatar} alt="prof" className={styles.editImg} />
        <IconButton>
          <label>
            <PhotoCameraIcon />
            <input type="file" className={styles.input} onChange={editAvatar} />
          </label>
        </IconButton>
      </div>
      <p>レターネーム</p>
      <TextField value={users.letterName} onChange={createLetterName} />
      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        value={users.otherInfo}
        onChange={createOtherInfo}
      />
      <p>
        <Button variant="contained" color="primary" onClick={createProfile}>
          作成
        </Button>
      </p>
    </Layout>
  );
};

export default editProf;
