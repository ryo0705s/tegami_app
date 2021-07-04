import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Letter From You & Me</title>
      </Head>
      <div className="container">{children}</div>
    </>
  );
};
export default Layout;
