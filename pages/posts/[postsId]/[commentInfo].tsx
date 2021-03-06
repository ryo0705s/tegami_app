import React, { useState, useContext, useEffect } from "react";
import { db, userDB } from "../../../firebase";
import Layout from "../../../components/layout";
import { AppContext } from "../../../context/PageStates";
import styles from "../../../components/scss/user.module.scss";
import { Avatar } from "@mui/material";

// interface yourPostProps {
//   id: string;
//   image: string;
//   text: string;
//   uid: string;
//   likeCount: number;
//   liked: boolean;
//   likedUid: string[];
// }

const commentInfo = () => {
  // const router = useRouter();
  // const [yourPosts, setYourPosts] = useState<yourPostProps[]>([
  //   {
  //     id: "",
  //     image: "",
  //     text: "",
  //     uid: "",
  //     likeCount: 0,
  //     liked: false,
  //     likedUid: [""],
  //   },
  // ]);
  const [commentUsers, setCommentUsers] = useState([
    {
      id: "",
      avatar: "",
      letterName: "",
      otherInfo: "",
      uid: "",
    },
  ]);
  const [selectedCommentId, setSelectedCommentId] = useState("");
  const [clickedComment, setClickedComment] = useState({
    id: "",
    commentUid: "",
    commentAvatar: "",
    commented: false,
    text: "",
  });

  const { selectedId, setSelectedId }: any = useContext(AppContext);

  const selectedComment = () => {
    db.collection("posts")
      .doc(selectedId)
      .collection("comments")
      .doc(selectedCommentId)
      .get()
      .then((doc) => {
        setClickedComment({
          id: doc.id,
          commentUid: doc.data().commentUid,
          commentAvatar: doc.data().commentAvatar,
          commented: doc.data().commented,
          text: doc.data().text,
        });
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  const selectedUser = () => {
    userDB
      .where("uid", "==", clickedComment.commentUid)
      .get()
      .then((querySnapshot) => {
        let userLists = [];
        querySnapshot.forEach((doc) => {
          const restData = { ...doc.data() };
          userLists.push({
            id: doc.id,
            avatar: restData.avatar,
            letterName: restData.letterName,
            otherInfo: restData.otherInfo,
            uid: restData.uid,
          });
        });
        setCommentUsers(userLists);
      });
  };
  // const likesRef = db.collection("posts").doc(clickedPost.id);
  // .collection("likes")
  // .doc("djJtq6u4uNhQl3V2q6ns");

  // const commentRef = db
  //   .collection("posts")
  //   .doc(clickedPost.id)
  //   .collection("comments");

  // ???????????????????????????????????????????????????????????????????????????URL?????????????????????
  useEffect(() => {
    const targetUrl = location.pathname.split("/")[2];
    const targetCommentUrl = location.pathname.split("/")[3];
    setSelectedId(targetUrl);
    setSelectedCommentId(targetCommentUrl);
  }, []);

  useEffect(() => {
    if (selectedCommentId) selectedComment();
  }, [selectedComment]);

  useEffect(() => {
    if (clickedComment) selectedUser();
  }, [clickedComment]);

  return (
    <Layout>
      <br />
      <div className={styles.userInfo}>
        <ul>
          {commentUsers &&
            commentUsers.map((commentUser) => {
              return (
                <li className={styles.postUserInfo}>
                  <Avatar
                    src={commentUser.avatar}
                    alt="prof"
                    className={styles.editPostImg}
                  />
                  <h3>??????????????????</h3>
                  <div>{commentUser.letterName}</div>
                  <h3>????????????</h3>
                  <div className={styles.text}>{commentUser.otherInfo}</div>
                </li>
              );
            })}
        </ul>
        {/* <hr />
            <p>???????????????</p>
        <ul>
          {yourPosts &&
            yourPosts.map((yourpost) => {
              return <li>{yourpost.text}</li>;
            })}
        </ul> */}
      </div>
    </Layout>
  );
};

export default commentInfo;
