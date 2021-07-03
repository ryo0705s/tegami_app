import React from "react";
import Image from "next/image";

const posts: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <Image
            src="/kumamotofood_dekomikan-00115.jpg"
            width="40"
            height="40"
            alt="test"
          />
          <p>投稿１</p>
        </li>
        <li>
          <Image src="/sasaki.jpeg" width="40" height="40" alt="test" />
          <p>投稿２</p>
        </li>
      </ul>
    </div>
  );
};

export default posts;
