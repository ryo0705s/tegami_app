import React, { useState, useEffect, useContext, createContext } from "react";

export const AppContext = createContext();

function PageStates({ children }): React.FC {
  const [posts, setPosts] = useState([
    { id: "", image: "", text: "", uid: "" },
  ]);
  const [pictures, setPictures] = useState([""]);
  const [clickedId, setClickedId] = useState("");
  const [edited, setEdited] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
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
    url,
    setUrl,
    userId,
    setUserId,
    email,
    setEmail,
    password,
    setPassword,
    avatarUrl,
    setAvatarUrl,
  };
  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

export default PageStates;
