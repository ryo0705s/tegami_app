import React, { useEffect, useContext } from "react";
import { postDB, userDB } from "../../firebase";
import Layout from "../../components/layout";
import { AppContext } from "../../components/context/PageStates";
import styles from "../../components/scss/posts.module.scss";

const postLists = () => {
  const {
    router,
    posts,
    setPosts,
    clickedId,
    setClickedId,
    setFindPostAvatar,
    setFindPostUid,
    setFindPostLetterName,
    liked,
    setLiked,
    users,
  }: any = useContext(AppContext);

  const selectPost = (post: any) => {
    setClickedId(post.id);
    userDB.get().then((querySnapshot) => {
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
    });
    // いいねのロジックを正常に戻す
    setLiked(false);
  };

  useEffect(() => {
    if (clickedId)
      (() => {
        router.push(`/posts/${clickedId}/post`);
      })();
  }, [clickedId]);

  useEffect(() => {
    postDB.onSnapshot((snapshot) =>
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

  return (
    <Layout>
      <br />
      {users.uid ? (
        <div className={styles.postLists}>
          <ul className={styles.posts}>
            {posts &&
              posts.map((post) => {
                return (
                  <li className={styles.postImage}>
                    <img src={post.image} onClick={() => selectPost(post)} />
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
                  <li className={styles.postImage}>
                    <img
                      src={post.image}
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
