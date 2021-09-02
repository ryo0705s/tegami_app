import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../components/posts.module.scss";
import { storage, db } from "../firebase";
import { useRouter } from "next/router";
import { AppContext } from "../components/PageStates";

const postLists = () => {
  const {
    posts,
    setPosts,
    clickedId,
    setClickedId,
    findPostAvatar,
    setFindPostAvatar,
    findPostUid,
    setFindPostUid,
  } = useContext(AppContext);
  const router = useRouter();

  const selectPost = (post) => {
    setClickedId(post.id);
    db.collection("users")
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
        console.log(userLists, "リスト");
        const postNumber = userLists.findIndex(
          (userList) => userList.uid === post.uid
        );
        const findPostElements = () => {
          setFindPostAvatar(userLists[postNumber].avatar);
          setFindPostUid(userLists[postNumber].uid);
        };
        postNumber !== -1 ? findPostElements() : "";
        console.log(postNumber, "写真の人誰？");
        // clickedId !== "" ? router.push("/post") : "";
      });
  };
  const pagePush = () => {
    router.push("/post");
  };
  useEffect(() => {
    if (clickedId) pagePush();
  }, [clickedId]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          uid: doc.data().uid,
          likeCount: doc.data().likeCount,
          liked: doc.data().liked,
          likedUid: doc.data().likedUid,
        }))
      )
    );
  }, []);
  console.log(posts);

  // デバッグ用
  useEffect(() => {
    console.log(clickedId, "クリック証券");
  }, [clickedId]);
  return (
    <Layout>
      <ul className={styles.posts}>
        {posts &&
          posts.map((post) => {
            return (
              <li>
                <img
                  src={post.image}
                  width={100}
                  height={100}
                  onClick={() => selectPost(post)}
                />
              </li>
            );
          })}
      </ul>
    </Layout>
  );
};

export default postLists;
