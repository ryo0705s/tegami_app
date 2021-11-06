import "../components/global.css";
import PageStates from "../context/PageStates";
import PostStates from "../context/PostStates";
import CommentStates from "../context/CommentStates";
import LikeStates from "../context/LikeStates";

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
