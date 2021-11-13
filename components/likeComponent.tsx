import React, { useContext } from "react";
import "firebase/firestore";
import { AppContext } from "../context/PageStates";
// import { LikeContext } from "../context/LikeStates";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useLikeAction } from "../hooks/useLikeAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const LikeComponent = () => {
  const classes = useStyles();

  const { liked, users, clickedPost }: any = useContext(AppContext);
  // const { handleLike, handleUnLike }: any = useContext(LikeContext);
  const { handleLike, handleUnLike }: any = useLikeAction();
  const targetUid: string = clickedPost.likedUid.find((clickedFoundUid) => {
    return clickedFoundUid == users.uid;
  });

  return (
    <>
      {targetUid && clickedPost.liked ? (
        <IconButton onClick={handleUnLike}>
          <label>
            <ThumbUpAltIcon />
          </label>
        </IconButton>
      ) : (
        <IconButton onClick={!liked ? handleLike : handleUnLike}>
          <label>
            <ThumbUpAltIcon />
          </label>
        </IconButton>
      )}
      <span>{clickedPost.likeCount}</span>
    </>
  );
};
export default LikeComponent;
