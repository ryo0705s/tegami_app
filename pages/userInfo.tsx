import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "../components/user.module.scss";
import firebase from "firebase/app";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";
import { useRouter } from "next/router";
import user from "./user";
import Layout from "../components/layout";
import postLists from "./postLists";

type yourPostProps = {
  id: string;
  image: string;
  text: string;
  uid: string;
  likeCount: number;
  liked: boolean;
  likedUid: string[];
};

const userInfo: React.FC = () => {
  const router = useRouter();
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
    db.collection("posts")
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
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  // デバッグ用コード
  useEffect(() => {
    console.log(yourPosts, "お前誰？");
  }, [yourPosts]);

  return (
    <Layout>
      <img src={users.avatar} width={100} height={100} />
      <p>レターネーム</p>
      <div>{users.letterName}</div>
      <p>コメント</p>
      <div>{users.otherInfo}</div>
      <br />
      <div>最近の投稿</div>
      <hr />
      <ul>
        {yourPosts &&
          yourPosts.map((yourpost) => {
            return <li>{yourpost.text}</li>;
          })}
      </ul>
    </Layout>
  );
};

export default userInfo;
