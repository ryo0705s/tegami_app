import React, { useState, useEffect, useContext, createContext } from "react";

export const AppContext = createContext();

function PageStates({ children }): React.FC {
  const [posts, setPosts] = useState([
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
  const [pictures, setPictures] = useState([""]);
  const [clickedId, setClickedId] = useState("");
  const [edited, setEdited] = useState(false);
  const [message, setMessage] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [loginedId, setLoginedId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [logined, setLogined] = useState(false);
  // const [likes, setLikes] = useState({
  //   likeCount: 0,
  //   liked: false,
  //   likedUid: [""],
  // });
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likedUids, setLikedUids] = useState("");
  const [users, setUsers] = useState({
    id: "",
    avatar: "avatar.png",
    letterName: "",
    otherInfo: "",
    uid: "",
  });
  const [authUserId, setAuthUserId] = useState("");
  const value = {
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
    pictureUrl,
    setPictureUrl,
    userId,
    setUserId,
    loginedId,
    setLoginedId,
    email,
    setEmail,
    password,
    setPassword,
    avatarUrl,
    setAvatarUrl,
    users,
    setUsers,
    logined,
    setLogined,
    // likes,
    // setLikes,
    likeCount,
    setLikeCount,
    liked,
    setLiked,
    likedUids,
    setLikedUids,
    authUserId,
    setAuthUserId,
  };
  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

export default PageStates;
