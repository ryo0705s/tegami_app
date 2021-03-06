import React, { useEffect, useContext } from "react";
import { storage, postDB } from "../../firebase";
import firebase from "firebase/app";
import "firebase/storage";
import { AppContext } from "../../context/PageStates";
import Layout from "../../components/layout";
import styles from "../../components/scss/post.module.scss";
import { Button, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const posting = () => {
  const classes = useStyles();

  const {
    message,
    setMessage,
    pictureUrl,
    setPictureUrl,
    userId,
    setUserId,
    users,
    setUsers,
    router,
  }: any = useContext(AppContext);

  const handlePicture = (e: any) => {
    const next = function (snapshot) {};
    const error = function (error: any) {};
    const complete = function () {
      storage
        .ref()
        .child(`/images/${e.target.files[0].name}`)
        .getDownloadURL()
        .then(function (URL) {
          setPictureUrl(URL);
        })
        .catch(function (error: any) {
          alert(error.message);
        });
    };
    const uploadPicture = storage
      .ref(`/images/${e.target.files[0].name}`)
      .put(e.target.files[0]);

    uploadPicture.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const handlePost = () => {
    postDB
      .add({
        image: pictureUrl,
        text: message,
        uid: users.uid,
        likeCount: 0,
        liked: false,
        likedUid: [""],
      })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    router.push("/posts/postLists");
    setPictureUrl("");
  };
  useEffect(() => {
    setPictureUrl("/uploadYourPicture.png");
  }, []);

  return (
    <Layout>
      <br />
      <img src={pictureUrl} className={styles.img} />
      <IconButton>
        <label>
          <PhotoCameraIcon />
          <input
            type="file"
            className={styles.input}
            onChange={handlePicture}
          />
        </label>
      </IconButton>
      <div className={styles.textField}>
        <form className={classes.root}>
          <TextField
            id="outlined-textarea"
            label="??????"
            placeholder="???????????????????????????????????????"
            multiline
            variant="outlined"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
        </form>
      </div>
      <p className={styles.createButton}>
        <Button variant="contained" color="primary" onClick={handlePost}>
          ??????
        </Button>
      </p>
    </Layout>
  );
};

export default posting;
