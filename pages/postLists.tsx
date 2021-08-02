import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../components/posts.module.scss";
import { storage, db } from "../firebase";
import { useRouter } from "next/router";
import { AppContext } from "../components/PageStates";

const postLists = () => {
  const { posts, setPosts, clickedId, setClickedId } = useContext(AppContext);
  const router = useRouter();

  const selectPost = (post) => {
    setClickedId(post.id);
    router.push("/post");
  };

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          uid: doc.data().uid,
        }))
      )
    );
  }, []);
  console.log(posts);
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
                  id={post.id}
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
