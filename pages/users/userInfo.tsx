import React, { useState, useContext, useEffect } from "react";
import styles from "../../components/scss/user.module.scss";
import { db, postDB } from "../../firebase";
import { AppContext } from "../../components/states/PageStates";
import Layout from "../../components/layout";

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
  const [yourPosts, setYourPosts] = useState<yourPostProps[]>([
    {
      id: "",
      image: "",
      text: "",
      uid: "",
      likeCount: 0,
      liked: false,
      likedUid: [""],
    },
  ]);

  const {
    router,
    posts,
    setPosts,
    users,
    setUsers,
    avatarUrl,
    setAvatarUrl,
    loginedId,
    setLoginedId,
    authUserId,
    setAuthUserId,
    findPostUid,
    setFindPostUid,
  }: any = useContext(AppContext);

  useEffect(() => {
    postDB
      .where("uid", "==", findPostUid)
      .get()
      .then((querySnapshot) => {
        let postLists = [];
        querySnapshot.forEach((doc) => {
          const restData = { ...doc.data() };
          postLists.push({
            id: doc.id,
            image: restData.image,
            text: restData.text,
            uid: restData.uid,
            likeCount: restData.likeCount,
            liked: restData.likedUid,
            likedUid: restData.likedUid,
          });
        });
        setYourPosts(postLists);
      })
      .catch((error: any) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  // デバッグ用コード
  useEffect(() => {
    console.log(yourPosts, "お前誰？");
  }, [yourPosts]);

  return (
    <Layout>
      <br />
      <div className={styles.userInfo}>
        <img src={users.avatar} width={100} height={100} />
        <p>レターネーム</p>
        <div>{users.letterName}</div>
        <p>コメント</p>
        <div>{users.otherInfo}</div>
        <br />
        <p>最近の投稿</p>
        <hr />
        <ul>
          {yourPosts &&
            yourPosts.map((yourpost) => {
              return <li>{yourpost.text}</li>;
            })}
        </ul>
      </div>
    </Layout>
  );
};

export default userInfo;
