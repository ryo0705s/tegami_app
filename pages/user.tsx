import { TextField } from "@material-ui/core";
import React from "react";
import Image from "next/image";

const user: React.FC = () => {
  return (
    <div>
      <Image src="/sasaki.jpeg" width="20" height="20" />
      <p>レターネーム</p>
      <TextField />
      <p>備考</p>
      <TextField />
      <p>投稿一覧</p>
      <TextField />
    </div>
  );
};

export default user;
