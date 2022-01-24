import { FunctionComponent } from "react";
import { BlogPost } from "../../utils/posts";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  posts: Array<BlogPost>;
}

const PostList: FunctionComponent<Props> = ({ posts = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map(({ id, title, slug, publishedAt, catchphrase, featured: { url, alternativeText } }: BlogPost) => {

        let imgElement = <></>;
        if (url !== undefined) {
          imgElement = (
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${url}`} 
              alt={alternativeText} 
              className="object-cover" width={320} height={240} 
              layout="responsive" />
          );
        }
        const postDate = new Date(publishedAt);
        return (
          <article className="rounded shadow p-4 mb-8 flex flex-col" key={id}>
            <div className="w-full mb-3">
              <Link href={`/blog/${slug}`}>
                <a className="relative">
                  {imgElement ?? imgElement}
                </a>
              </Link>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="mt-0 mb-2">
                  <Link href={`/blog/${slug}`}>
                    <a className="no-underline">
                      {title}
                    </a>
                  </Link>
                </h2>
                <div className="text-sm mb-3">
                  <FontAwesomeIcon icon={faClock} /> {postDate.toLocaleString()}
                </div>
                <div className="text-lg mb-4">
                  {catchphrase}
                </div>
              </div>
              <div>
              <Link href={`/blog/${slug}`}>
                <a className="btn btn-secondary inline-block">
                  Read more
                </a>
              </Link>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  );
};

export default PostList;
