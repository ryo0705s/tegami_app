import React, { useState, useEffect, useContext, createContext } from "react";

export const AppContext = createContext({});

interface Props {
  children?: React.ReactNode;
}

export interface postProps {
  id: string;
  image: string;
  text: string;
  uid: string;
  likeCount: number;
  liked: boolean;
  likedUid: string[];
}
export interface userProps {
  id: string;
  avatar: string;
  letterName: string;
  otherInfo: string;
  uid: string;
}

function PageStates({ children }: Props) {
  const [posts, setPosts] = useState<Partial<postProps[]>>([
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
  const [pictures, setPictures] = useState<string[]>([]);
  const [clickedId, setClickedId] = useState("");
  const [edited, setEdited] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [loginedId, setLoginedId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [logined, setLogined] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likedUids, setLikedUids] = useState("");
  const [users, setUsers] = useState<Partial<userProps>>({
    id: "",
    avatar: "avatar.png",
    letterName: "",
    otherInfo: "",
    uid: "",
  });
  const [authUserId, setAuthUserId] = useState("");
  const [findPostAvatar, setFindPostAvatar] = useState("");
  const [findCommentAvatar, setFindCommentAvatar] = useState("");
  const [findPostUid, setFindPostUid] = useState("");
  const [findPostLetterName, setFindPostLetterName] = useState("");
  const [guestLogined, setGuestLogined] = useState(false);

  const value = {
    posts,
    setPosts,
    pictures,
    setPictures,
    clickedId,
    setClickedId,
    edited,
    setEdited,
    updated,
    setUpdated,
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
    findPostAvatar,
    setFindPostAvatar,
    findPostUid,
    setFindPostUid,
    findCommentAvatar,
    setFindCommentAvatar,
    findPostLetterName,
    setFindPostLetterName,
    guestLogined,
    setGuestLogined,
  };

  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

export default PageStates;
