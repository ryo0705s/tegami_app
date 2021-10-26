import "./global.css";
import PageStates from "../components/states/PageStates";
import PostStates from "../components/states/PostStates";
import CommentStates from "../components/states/CommentStates";
import LikeStates from "../components/states/LikeStates";

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
