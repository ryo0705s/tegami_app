import React, { useContext, useState } from "react";
import { storage } from "../firebase";
import { AppContext } from "../context/PageStates";

const useEditAvatar = async (e: any) => {
  const { users, setUsers }: any = useContext(AppContext);
  try {
    await storage
      .ref()
      .child(`/avatars/${e.target.files[0].name}`)
      .put(e.target.files[0]);

    const uploadPicture = await storage
      .ref()
      .child(`/avatars/${e.target.files[0].name}`)
      .getDownloadURL();

    setUsers({
      id: users.id,
      avatar: uploadPicture,
      letterName: users.letterName,
      otherInfo: users.otherInfo,
      uid: users.uid,
    });
  } catch {
    alert("画像の投稿に失敗しました");
  }
};

export default useEditAvatar;
