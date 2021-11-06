import React, { useContext } from "react";
import "firebase/firestore";
import { AppContext } from "../context/PageStates";
import { PostContext } from "../context/PostStates";
import styles from "../components/scss/post.module.scss";
import { Button, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
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

const PostComponent = () => {
  const classes = useStyles();

  const {
    router,
    edited,
    setEdited,
    updated,
    setUpdated,
    users,
    findPostAvatar,
    findPostLetterName,
    selectedId,
    clickedPost,
  }: any = useContext(AppContext);
  const { editText, updateText, handleDelete }: any = useContext(PostContext);

  return (
    <>
      <div>
        <div className={styles.postMember}>
          <span>投稿者：{findPostLetterName} さん</span>
          <Avatar
            src={findPostAvatar}
            alt="prof"
            className={styles.postAvatar}
            onClick={() => router.push(`/posts/${selectedId}/postInfo`)}
          />
        </div>
      </div>
      <br />
      <h2>説明</h2>
      {clickedPost.uid === users.uid ? (
        <>
          {!edited ? (
            <div className={styles.text}>{clickedPost.text}</div>
          ) : (
            <TextField
              multiline
              variant="outlined"
              fullWidth
              value={clickedPost.text}
              onChange={editText}
            />
          )}
          {!updated ? (
            <>
              <br />
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    setEdited(!edited);
                    setUpdated(!updated);
                  }}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleDelete}
                >
                  削除
                </Button>
              </Stack>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={updateText}>
              完了
            </Button>
          )}
        </>
      ) : (
        <div className={styles.text}>{clickedPost.text}</div>
      )}
    </>
  );
};
export default PostComponent;
