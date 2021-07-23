import React, { useState, useEffect, useContext, createContext } from "react";

export const AppContext = createContext();

function PageStates({ children }): React.FC {
  const [posts, setPosts] = useState([{ id: "", image: "", text: "" }]);
  const [pictures, setPictures] = useState([""]);
  const [clickedId, setClickedId] = useState("");
  const [edited, setEdited] = useState(false);
  const [message, setMessage] = useState("");
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
  };
  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

export default PageStates;
