import React, { useContext } from "react";
import "firebase/firestore";
import { AppContext } from "../context/PageStates";
import { CommentContext } from "../context/CommentStates";
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

const CommentComponent = () => {
  const classes = useStyles();

  const { router, users, selectedId }: any = useContext(AppContext);
  const {
    comments,
    commentText,
    setCommentText,
    updateCommentText,
    setUpdateCommentText,
    createComment,
    editComment,
    updateComment,
    deleteComment,
  }: any = useContext(CommentContext);
  // const postComponent = () => {

  return (
    <>
      {!commentText.commented ? (
        <>
          <div className={styles.textField}>
            <h2>コメント</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-textarea"
                label="コメント"
                placeholder="コメントをしてみましょう"
                multiline
                variant="outlined"
                fullWidth
                value={commentText.comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCommentText({
                    comment: e.target.value,
                    commented: false,
                  })
                }
              />
            </form>
          </div>
          <br />
          <Button variant="contained" color="primary" onClick={createComment}>
            投稿
          </Button>
        </>
      ) : (
        <div></div>
      )}
      <ul className={styles.comments}>
        {comments &&
          comments.map((comment) => {
            return (
              <li className={styles.comment}>
                <Avatar
                  src={comment.commentAvatar}
                  alt="prof"
                  className={styles.commentAvatar}
                  onClick={() =>
                    router.push(`/posts/${selectedId}/${comment.id}`)
                  }
                />
                <div className={styles.commentText}>{comment.text}</div>
                {comment.commentUid === users.uid ? (
                  <div>
                    <Stack spacing={1} direction="row" justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => editComment(comment)}
                      >
                        編集
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => deleteComment(comment)}
                      >
                        削除
                      </Button>
                    </Stack>
                  </div>
                ) : (
                  ""
                )}
              </li>
            );
          })}
      </ul>
      <br />
      {!updateCommentText.edited ? (
        <div></div>
      ) : (
        <>
          <div className={styles.textField}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-textarea"
                label="コメント編集"
                placeholder="コメントを編集しましょう"
                multiline
                variant="outlined"
                fullWidth
                value={updateCommentText.comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setUpdateCommentText({
                    id: updateCommentText.id,
                    comment: e.target.value,
                    edited: true,
                  })
                }
              />
            </form>
          </div>
          <Button variant="contained" color="primary" onClick={updateComment}>
            完了
          </Button>
        </>
      )}
    </>
  );
};
export default CommentComponent;
