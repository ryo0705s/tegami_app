import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Letter From You & Me(仮)</h1>
    <ul>
      <li>ログイン</li>
      <li>ユーザー作成</li>
      <li>
        <Link href="/posts">みんなの投稿</Link>
      </li>
    </ul>
    <h2>サイトについて</h2>
    <p>
      このサイトは”手紙を通じて心の安らぎを感じてほしい”そんな思いから生まれました。
      コロナにより人々の生活は大きく変わりました。
      日々不安や悩みを感じる事が多くなったように思います。
      そんな人たちの力になれたら嬉しいです。
    </p>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
