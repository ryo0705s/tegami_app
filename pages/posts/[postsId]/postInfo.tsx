import React, { useState, useContext, useEffect } from "react";
import styles from "../../../components/scss/user.module.scss";
import { db, userDB } from "../../../firebase";
import { AppContext } from "../../../components/states/PageStates";
import Layout from "../../../components/layout";
import { Avatar } from "@mui/material";

interface yourPostProps {
  id: string;
  image: string;
  text: string;
  uid: string;
  likeCount: number;
  liked: boolean;
  likedUid: string[];
}

const userInfo = () => {
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
  const [postUsers, setPostUsers] = useState([
    {
      id: "",
      avatar: "",
      letterName: "",
      otherInfo: "",
      uid: "",
    },
  ]);

  const {
    selectedId,
    setSelectedId,
    clickedPost,
    setClickedPost,
  }: any = useContext(AppContext);

  const selectedPost = () => {
    db.collection("posts")
      .doc(selectedId)
      .get()
      .then((doc) => {
        setClickedPost({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          uid: doc.data().uid,
          likeCount: doc.data().likeCount,
          liked: doc.data().liked,
          likedUid: doc.data().likedUid,
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
    userDB
      .where("uid", "==", clickedPost.uid)
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
        setPostUsers(userLists);
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
    setSelectedId(targetUrl);
  }, []);

  useEffect(() => {
    if (selectedId) selectedPost();
  }, [selectedId]);

  useEffect(() => {
    if (clickedPost) selectedUser();
  }, [clickedPost]);

  // デバッグ用コード
  useEffect(() => {
    console.log(selectedUser, "お前誰？");
  }, [clickedPost]);

  return (
    <Layout>
      <br />

      <div className={styles.userInfo}>
        <ul>
          {postUsers &&
            postUsers.map((postUser) => {
              return (
                <li className={styles.postUserInfo}>
                  <Avatar
                    src={postUser.avatar}
                    alt="prof"
                    className={styles.editPostImg}
                  />
                  <h3>レターネーム</h3>
                  <div>{postUser.letterName}</div>
                  <h3>コメント</h3>
                  <div className={styles.text}>{postUser.otherInfo}</div>
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

export default userInfo;
