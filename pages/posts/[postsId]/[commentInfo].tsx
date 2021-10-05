import React, { useState, useContext, useEffect } from "react";
import styles from "../../../components/user.module.scss";
import { db, storage } from "../../../firebase";
import { AppContext } from "../../../components/PageStates";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

interface yourPostProps {
  id: string;
  image: string;
  text: string;
  uid: string;
  likeCount: number;
  liked: boolean;
  likedUid: string[];
}

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

  const {
    selectedId,
    setSelectedId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

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
        // clickedId→clickedPostIdに渡すことによりバックボタンで前ページに戻れるようにした
        // setClickedPostId(clickedId);
        // setClickedId("");
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };
  const selectedUser = () => {
    db.collection("users")
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

  // デバッグ用コード
  useEffect(() => {
    console.log(location.pathname.split("/")[3], "お前誰？");
  }, []);

  return (
    <Layout>
      <br />

      <div className={styles.userInfo}>
        <ul>
          {commentUsers &&
            commentUsers.map((commentUser) => {
              return (
                <li>
                  <img src={commentUser.avatar} width={100} height={100} />
                  <p>レターネーム</p>
                  <div>{commentUser.letterName}</div>
                  <p>コメント</p>
                  <div>{commentUser.otherInfo}</div>
                  <br />
                </li>
              );
            })}
        </ul>
        {/* <hr />
            <p>最近の投稿</p>
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
