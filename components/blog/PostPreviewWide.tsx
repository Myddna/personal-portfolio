import { FunctionComponent } from "react";
import { BlogPost } from "../../utils/posts";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  post: BlogPost;
}

const PostPreviewWide: FunctionComponent<Props> = ({ post }: Props) => {
  const { 
    id, title, slug, publishedAt, catchphrase, 
    featured: { url, alternativeText } }: BlogPost = post;

  let imgElement = <></>;
  if (url !== undefined) {
    imgElement = (
      <Image src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
        alt={alternativeText}
        className="object-cover rounded" width={320} height={240}
        layout="responsive" />
    );
  }
  const postDate = new Date(publishedAt);
  return (
    <article className="rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2" key={id}>
      <div className="w-full flex flex-col justify-center">
        <Link href={`/blog/${slug}`}>
          <a className="relative">
            {imgElement ?? imgElement}
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-center p-4">
        <div>
          <h2 className="mt-0 mb-2 text-4xl">
            <Link href={`/blog/${slug}`}>
              <a className="no-underline">
                {title}
              </a>
            </Link>
          </h2>
          <div className="text-sm mb-4">
            <FontAwesomeIcon icon={faClock} /> {postDate.toLocaleString()}
          </div>
          <div className="text-lg mb-6">
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
}

export default PostPreviewWide;
