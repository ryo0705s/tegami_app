import React, { useState, useContext, useEffect } from "react";
import { postDB } from "../../firebase";
import { AppContext } from "../../components/context/PageStates";
import Layout from "../../components/layout";
import styles from "../../components/scss/user.module.scss";

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

  const { users, findPostUid }: any = useContext(AppContext);

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
