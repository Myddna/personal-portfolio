import { FunctionComponent } from "react";
import { BlogPost } from "../../utils/posts";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import PostPreviewWide from "./PostPreviewWide";
import PostPreview from "./PostPreview";

type Props = {
  posts: Array<BlogPost>;
  highlightFirst?: boolean;
}

const PostList: FunctionComponent<Props> = ({ posts = [], highlightFirst = false }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post: BlogPost, idx: number ) => {
          if(idx == 0 && highlightFirst) {
            return (
              <div className="md:col-span-2" key={post.id}>
                <PostPreviewWide post={post} />
              </div>
            )
          } else {
            return <PostPreview key={post.id} post={post} />
          }
      })}
    </div>
  );
};

export default PostList;
