import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PageContainer from "../../components/structure/PageContainer";
import TextBlock from "../../components/ui/TextBlock";
import { request, gql } from 'graphql-request';
import { BlogPost, processPostSingle } from "../../utils/posts";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";


type Props = {
  post: BlogPost;
  previewMode: boolean;
};

const Post: NextPage<Props> = ({ post }) => {
  const { title, publishedAt, catchphrase, text, featured: { url, alternativeText, width, height } }: BlogPost = post;
  const postDate = new Date(publishedAt);
  let imgElement = <></>;
  if (url !== undefined) {
    imgElement = (
      <Image src={`${process.env.NEXT_PUBLIC_API_URL}${url}`} 
        alt={alternativeText} 
        width={width}
        height={height}
        layout="responsive" 
        priority
        />
    );
  }
  return (
    <PageContainer title="Post">
      <TextBlock>
        <h1>{ title }</h1>
        <div className="text-sm mb-3">
          <FontAwesomeIcon icon={faClock} /> {postDate.toLocaleString()}
        </div>
        <div className="text-xl mt-10 mb-10 pt-7 pl-12 pb-7 border-l-4 border-yellow-200">
          {catchphrase}
        </div>
        <div className="mb-7 post-image-full">
          { imgElement }
        </div>
        <div>
          {text}
        </div>
      </TextBlock>
    </PageContainer>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  
  // Query
  const QUERY = gql`
  query GetPostBySlug($status: String = "published", $slug: String) {
    posts(filter: {status: {_eq: $status}, slug: {_eq: $slug}}) {
      id
      title
      slug
      published_at
      catchphrase
      text
      featured {
        id
        width
        height
      }
    }
  }
  `;

  try {
    const { posts } = await request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, QUERY,
      {
        slug: slug,
      },
    );
  
    const typedPost: BlogPost = processPostSingle(posts[0]);

    return {
      props: {
        post: typedPost,
      },
    }

  } catch(error) {
    console.log(error);
  }

  return {
    props: {
      post: [],
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  // Blogs Data
  // GQL queries
  const SLUGS_QUERY = gql`
  query GetPostsSlugs($_eq: String = "published", $sort: [String] = ["-published_at"]) {
    posts(filter: {status: {_eq: $_eq}}, sort: $sort) {
      slug
    }
  }
  `;
  let existingSlugs: Array<string> = [];

  try {
    const { posts } = await request(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`, SLUGS_QUERY);
  
    existingSlugs = posts.map(({ slug }: { slug: string }) => {
      return {
        params: { slug: slug }
      }
    });

  } catch(error) {
    console.log(error);
  }
  
  return {
      paths: existingSlugs,
      fallback: false
  };
}


export default Post;
