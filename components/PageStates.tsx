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

// // UserContext が保持する値の型
// export interface UserContextType {
//   gitHubToken: string;
//   setGitHubToken: (token: string) => void;
// }
// // ローカルストレージ用のキー
// const TEGAMI_KEY = "tegamiKey";

function PageStates({ children }: Props) {
  const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  };
  // const getToken = (token) => {
  //   localStorage.getItem(TEGAMI_KEY, token);
  //   setGitHubToken(token);
  // };
  // const [gitHubToken, setGitHubToken] = useState("");
  // const setToken = (token) => {
  //   localStorage.setItem(TEGAMI_KEY, token);
  //   setGitHubToken(token);
  // };

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
    useLocalStorage,
  };

  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

export default PageStates;
