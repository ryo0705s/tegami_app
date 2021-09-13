import Layout from "../components/layout";
import Image from "next/image";
const IndexPage = () => (
  <Layout>
    <h2>サイトについて</h2>
    <Image src="/letter.jpg" width={300} height={400} />
    <p>
      このサイトは”手紙を通じて心の安らぎを感じてほしい”そんな思いから生まれました。
      <br />
      コロナにより人々の生活は大きく変わりました。
      <br />
      日々不安や悩みを感じる事が多くなったように思います。
      <br />
      そんな人たちの力になれたら嬉しいです。
      <br />
    </p>
  </Layout>
);

export default IndexPage;
