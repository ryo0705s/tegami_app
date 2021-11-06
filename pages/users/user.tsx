import React, { useContext, useEffect } from "react";
import { storage, userDB } from "../../firebase";
import Layout from "../../components/layout";
import { AppContext } from "../../components/context/PageStates";
import styles from "../../components/scss/user.module.scss";
import { Button, IconButton, TextField } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const user = () => {
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
    router.push("../");
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
  const { router, users, setUsers, authUserId }: any = useContext(AppContext);

  return (
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

export default user;
