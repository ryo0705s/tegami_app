import { Button, TextField } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import { db, storage } from "../firebase";
import { AppContext } from "../components/PageStates";

const post: React.FC = () => {
  const editText = () => {
    setMessage(posts.text);
    // message == posts.text;
  };
  const {
    posts,
    setPosts,
    pictures,
    setPictures,
    clickedId,
    setClickedId,
    edited,
    setEdited,
    message,
    setMessage,
  } = useContext(AppContext);

  useEffect(() => {
    const docRef = db.collection("posts").doc(clickedId);
    docRef
      .get()
      .then((doc) => {
        setPosts({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  // useEffect(() => {
  //   storage
  //     .ref()
  //     .child("/images/image.name")
  //     .getDownloadURL()
  //     .then(function (url) {
  //       const img = document.getElementById("postImage");
  //       img.src = url;
  //     })
  //     .catch(function (error) {
  //       alert(error.message);
  //     });
  // }, []);
  return (
    <Layout>
      <img src="/letter1.jpg" width="400" height="500" id="postImage" />
      <ThumbUpAltIcon />
      <p>説明</p>
      {!edited ? (
        <div>{posts.text}</div>
      ) : (
        <TextField
          multiline
          variant="outlined"
          fullWidth
          value={posts.text}
          onChange={editText}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEdited(!edited)}
      >
        編集
      </Button>

      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        value="面白いですね！"
      />
      {/* <Image src="/letter1.jpg" width="400" height="500" />
      <ThumbUpAltIcon />
      <p>説明</p>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        value="年賀状というものは面白いものである。普通手紙は１対１のやりとりだが、１対２にも３にもなる。かくゆうこの年賀状も、私の親友、そして嫁、そして赤ん坊、の合作である。これは2019年に私がもらったものであるが・・・・・・"
      />
      <p>コメント</p>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        value="面白いですね！"
      /> */}
    </Layout>
  );
};

export default post;
