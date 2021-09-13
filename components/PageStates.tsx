import React, { useState, useEffect, useContext, createContext } from "react";

export const AppContext = createContext<Partial<contextProps>>({});

type Props = {
  children?: React.ReactNode;
};
type contextProps = {
  children?: React.ReactNode | React.ReactNode[];
};
type postProps = {
  id: string;
  image: string;
  text: string;
  uid: string;
  likeCount: number;
  liked: boolean;
  likedUid: string[];
};
type userProps = {
  id: string;
  avatar: string;
  letterName: string;
  otherInfo: string;
  uid: string;
};

function PageStates({ children }: Props): React.FC | JSX.Element {
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
  const [pictures, setPictures] = useState<string[]>([""]);
  const [clickedId, setClickedId] = useState<string>("");
  const [edited, setEdited] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loginedId, setLoginedId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [logined, setLogined] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [likedUids, setLikedUids] = useState<string>("");
  const [users, setUsers] = useState<Partial<userProps>>({
    id: "",
    avatar: "avatar.png",
    letterName: "",
    otherInfo: "",
    uid: "",
  });
  const [authUserId, setAuthUserId] = useState<string>("");
  const [findPostAvatar, setFindPostAvatar] = useState<string>("");
  const [findCommentAvatar, setFindCommentAvatar] = useState<string>("");
  const [findPostUid, setFindPostUid] = useState<string>("");

  const value: any = {
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
  };

  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

export default PageStates;
