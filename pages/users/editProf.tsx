import React, { useContext, useEffect } from "react";
import { db, storage, userDB } from "../../firebase";
import Layout from "../../components/layout";
import { AppContext } from "../../context/PageStates";
import styles from "../../components/scss/user.module.scss";
import { Button, IconButton, TextField } from "@material-ui/core";
import { Avatar } from "@mui/material";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
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
    userDB.add({
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

  const editAvatar = async (e: any) => {
    try {
      await storage
        .ref()
        .child(`/avatars/${e.target.files[0].name}`)
        .put(e.target.files[0]);

      const uploadPicture = await storage
        .ref()
        .child(`/avatars/${e.target.files[0].name}`)
        .getDownloadURL();

      setUsers({
        id: users.id,
        avatar: uploadPicture,
        letterName: users.letterName,
        otherInfo: users.otherInfo,
        uid: users.uid,
      });
    } catch {
      alert("画像の投稿に失敗しました");
    }
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
    userDB
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
    router,
    users,
    setUsers,
    loginedId,
    setLoginedId,
    authUserId,
  }: any = useContext(AppContext);

  useEffect(() => {
    setLoginedId(users.id);
  });

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
