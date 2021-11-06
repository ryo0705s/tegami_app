import "../components/global.css";
import PageStates from "../components/context/PageStates";
import PostStates from "../components/context/PostStates";
import CommentStates from "../components/context/CommentStates";
import LikeStates from "../components/context/LikeStates";

export default function App({ Component, pageProps }) {
  return (
    <PageStates>
      <PostStates>
        <CommentStates>
          <LikeStates>
            <Component {...pageProps} />
          </LikeStates>
        </CommentStates>
      </PostStates>
    </PageStates>
  );
}
