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
    const listRef = storage.ref().child(`/images/${pictures}`);
    listRef
      .listAll()
      .then(function (res) {
        let items = [];
        res.prefixes.forEach(function (folderRef) {});
        res.items.forEach(function (itemRef) {
          items.push(itemRef.name);
          const img = document.getElementById("myPictures");
          img.src = itemRef.name;
        });
        setPictures(items);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const listRefPictures = storage.ref().child(`/images/${pictures}`);
    // listRefPictures
    //   .listAll()
    //   .then(function (url) {
    //     const img = document.getElementById("myPictures");
    //     img.src = url;
    //   })
    //   .catch(function (error) {
    //     alert(error.message);
    //   });
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
        {pictures.map((picture, index) => {
          // return <li key={index}>{picture}</li>;
          return <img src="picture" width={100} height={100} />;
        })}
      </ul>
    </Layout>
  );
};

export default postLists;
