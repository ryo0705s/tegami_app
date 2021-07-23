import "./global.css";
import PageStates from "../components/PageStates";

export default function App({ Component, pageProps }) {
  return (
    <PageStates>
      <Component {...pageProps} />;
    </PageStates>
  );
}
