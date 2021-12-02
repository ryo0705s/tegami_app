import "../components/global.css";
import PageStates from "../context/PageStates";

export default function App({ Component, pageProps }) {
  return (
    <PageStates>
      <Component {...pageProps} />
    </PageStates>
  );
}
