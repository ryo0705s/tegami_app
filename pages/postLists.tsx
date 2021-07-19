import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../components/posts.module.scss";
import { storage, db } from "../firebase";

const postLists: React.FC = () => {
  const [posts, setPosts] = useState([{ id: "", image: "", text: "" }]);
  useEffect(() => {
    const unSub = db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
        }))
      )
    );
    return () => {
      unSub();
    };
  }, []);
  return (
    <Layout>
      <ul className={styles.posts}>
        {posts.map((post) => {
          return <li>{post.id}</li>;
        })}
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
