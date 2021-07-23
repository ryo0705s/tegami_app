import React, { useState, useEffect, useContext, createContext } from "react";

export const AppContext = createContext();

function PageStates({ children }): React.FC {
  // const [posts, setPosts] = useState([{ id: "", image: "", text: "" }]);
  // const [pictures, setPictures] = useState([""]);
  const [clickedId, setClickedId] = useState("");
  return (
    <div>
      <AppContext.Provider value={{ clickedId, setClickedId }}>
        {children}
      </AppContext.Provider>
    </div>
  );
}

export default PageStates;
