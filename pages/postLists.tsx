import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../components/posts.module.scss";
import { storage, db } from "../firebase";

const postLists: React.FC = () => {
  const [posts, setPosts] = useState([{ id: "", image: "", text: "" }]);
  const [pictures, setPictures] = useState([""]);

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
    const listRef = storage.ref().child("posts/uid");
    storage
      .ref()
      .root.listAll()
      .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
          setPictures(folderRef.name);
        });
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
          return <li key={post.id}>{post.id}</li>;
        })}
        {/* {pictures.map((picture) => {
          return <li>{picture}</li>;
        })} */}
        {/* <li>
          <img src="" width="50" height="50" id="myimg" />
        </li> */}
        <li>
          <Link href="/post">
            <Image src="/letter1.jpg" width={100} height={100} alt="test" />
          </Link>
          <p>投稿１</p>
        </li>
        <li>
          <Image src="/sasaki.jpeg" width={100} height={100} alt="test" />
          <p>投稿２</p>
        </li>
        <li>
          <Link href="/post">
            <Image
              src="/kumamotofood_dekomikan-00115.jpg"
              width={100}
              height={100}
              alt="test"
            />
          </Link>
          <p>投稿3</p>
        </li>
        <li>
          <Image src="/sasaki.jpeg" width={100} height={100} alt="test" />
          <p>投稿4</p>
        </li>
        <li>
          <Link href="/post">
            <Image
              src="/kumamotofood_dekomikan-00115.jpg"
              width={100}
              height={100}
              alt="test"
            />
          </Link>
          <p>投稿5</p>
        </li>
        <li>
          <Image src="/sasaki.jpeg" width={100} height={100} alt="test" />
          <p>投稿6</p>
        </li>
      </ul>
    </Layout>
  );
};

export default postLists;
