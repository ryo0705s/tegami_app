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
    pictures,
    setPictures,
    clickedId,
    setClickedId,
  } = useContext(AppContext);
  const router = useRouter();

  const selectPost = (post) => {
    router.push("/post");
    setClickedId(post.id);
    console.log(post.id);
  };

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
        }))
      )
    );
  }, []);

  useEffect(() => {
    const listRef = storage.ref().child("images");
    listRef
      .listAll()
      .then(function (res) {
        let temp = [];
        res.prefixes.forEach(function (folderRef) {
          temp.push(folderRef.name);
          console.log(folderRef);
        });
        setPictures(temp);
        res.items.forEach(function (itemRef) {
          console.log(itemRef);
        });
      })
      .catch(function (error) {
        alert(error.message);
      });
  }, []);

  return (
    <Layout>
      <ul className={styles.posts}>
        {posts.map((post) => {
          return (
            <li key={post.id} onClick={() => selectPost(post)}>
              {post.id}
            </li>
          );
        })}
        {pictures.map((picture) => {
          return <li key={picture.id}>{picture}</li>;
        })}
        {/* <li>
          <img src="" width="50" height="50" id="myimg" />
        </li> */}
        <li>
          <Link href="/post">
            <Image src="/letter1.jpg" width={100} height={100} alt="test" />
          </Link>
          <p>投稿１</p>
        </li>
      </ul>
    </Layout>
  );
};

export default postLists;
