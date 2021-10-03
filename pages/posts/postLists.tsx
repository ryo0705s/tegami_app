import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import styles from "../../components/posts.module.scss";
import { storage, db } from "../../firebase";
import { useRouter } from "next/router";
import { AppContext } from "../../components/PageStates";

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
    findPostLetterName,
    setFindPostLetterName,
    liked,
    setLiked,
    users,
    setUsers,
  }: any = useContext(AppContext);
  const router = useRouter();

  const selectPost = (post: any) => {
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
        const postNumber: number = userLists.findIndex(
          (userList) => userList.uid === post.uid
        );
        const findPostElements = () => {
          setFindPostAvatar(userLists[postNumber].avatar);
          setFindPostUid(userLists[postNumber].uid);
          setFindPostLetterName(userLists[postNumber].letterName);
        };
        postNumber !== -1 ? findPostElements() : "";
        // いいねのロジックを正常に戻す
        setLiked(false);
      });
  };
  // const pagePush = () => {
  //   router.push("/post");
  // };
  useEffect(() => {
    if (clickedId)
      (() => {
        router.push(`/posts/${clickedId}/post`);
      })();
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
    console.log(findPostUid, "呼ばれてる？");
  }, [findPostUid]);
  useEffect(() => {
    console.log(liked, "焼肉らいく");
  }, [liked]);

  return (
    <Layout>
      <br />
      {users.uid ? (
        <div className={styles.postLists}>
          <ul className={styles.posts}>
            {posts &&
              posts.map((post) => {
                return (
                  <li>
                    <img
                      src={post.image}
                      width={70}
                      height={100}
                      onClick={() => selectPost(post)}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className={styles.postLists}>
          <ul className={styles.posts}>
            {posts &&
              posts.map((post) => {
                return (
                  <li>
                    <img
                      src={post.image}
                      width={70}
                      height={100}
                      onClick={() => window.confirm("ログインしてください")}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default postLists;
