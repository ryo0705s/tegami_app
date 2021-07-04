import React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";

const posts: React.FC = () => {
  return (
    <Layout>
      <ul>
        <li>
          <Link href="/post">
            <Image
              src="/kumamotofood_dekomikan-00115.jpg"
              width="40"
              height="40"
              alt="test"
            />
          </Link>
          <p>投稿１</p>
        </li>
        <li>
          <Image src="/sasaki.jpeg" width="40" height="40" alt="test" />
          <p>投稿２</p>
        </li>
      </ul>
    </Layout>
  );
};

export default posts;
