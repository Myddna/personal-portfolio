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

const Post: NextPage<Props> = ({ post, previewMode = false}) => {
  const { title, publishedAt, catchphrase, text, featured: { url, alternativeText, width, height } }: BlogPost = post;
  const postDate = new Date(publishedAt);
  let imgElement = <></>;
  if (url !== undefined) {
    imgElement = (
      <Image src={`${process.env.NEXT_PUBLIC_API_URL}${url}`} 
        alt={alternativeText} 
        width={width}
        height={height}
        layout="responsive" />
    );
  }
  return (
    <PageContainer title="Post">
      <TextBlock>
        <h1>{ post.title }</h1>
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
  // Preview mode control
  const previewMode = context.preview == false || context.preview == null ? 'LIVE' : 'PREVIEW';
  const slug = context.params?.slug;
  // Query
  const QUERY = gql`
  query($slug: String, $previewMode: PublicationState) {
    posts(
      publicationState: $previewMode
      filters: { slug: { eq: $slug } }
      pagination: { page: 1, pageSize: 1 }
    ) {
      data {
        id
        attributes {
          title, 
          slug, 
          publishedAt,
          catchphrase,
          text,
          featured {
            data {
              attributes {
                url
                width
                height
                alternativeText
              }
            }
          }
        }
      }
    }
  }
  `;

  try {
    const { posts: response } = await request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, QUERY,
      {
        slug: slug,
        previewMode: previewMode,
      },
    );

    const { data: post } = response;
  
    const typedPost: BlogPost = processPostSingle(post[0]);

    return {
      props: {
        post: typedPost,
        previewMode: previewMode
      },
    }

  } catch(error) {
    console.log(error);
  }

  return {
    props: {
      post: [],
      previewMode: previewMode
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  // Blogs Data
  // GQL queries
  const SLUGS_QUERY = gql`
  query {
    posts {
      data {
        attributes {
          slug
        }
      }
    }
  }
  `
  let existingSlugs: Array<string> = [];

  try {
    const { posts: response } = await request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, SLUGS_QUERY);

    const { data: posts } = response;
  
    existingSlugs = posts.map(({attributes: { slug }}: any) => {
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
