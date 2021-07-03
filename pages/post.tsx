import { TextField } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React from "react";
import Image from "next/image";

const post: React.FC = () => {
  return (
    <div>
      <Image src="/sasaki.jpeg" width="20" height="20" />
      <p>説明</p>
      <TextField />
      <p>コメント</p>
      <TextField />
      <ThumbUpAltIcon />
    </div>
  );
};

export default post;
