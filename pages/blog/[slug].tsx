import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { request, gql } from 'graphql-request';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PageContainer from "../../components/structure/PageContainer";
import TextBlock from "../../components/ui/TextBlock";
import { BlogPost, processPostSingle } from "../../utils/posts";
import Link from "next/link";


type Props = {
  post: BlogPost;
  previewMode: boolean;
};

type BlogPostSlug = {
  params: {
    slug: string;
  };
};

const Post: NextPage<Props> = ({ post }) => {
  const { title, publishedAt, catchphrase, text, featured: { url, alternativeText, width, height } }: BlogPost = post;
  const postDate = new Date(publishedAt);
  const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  let imgElement = <></>;
  if (url !== undefined) {
    imgElement = (
      <Image src={fullImageUrl} 
        alt={alternativeText} 
        width={width}
        height={height}
        layout="responsive" 
        priority
        />
    );
  }

  let splitCatchphrase = catchphrase.split("\n").map(function(item, idx) {
    return (
        <p key={idx}>
            {item}
        </p>
    )
  });

  return (
    <PageContainer 
      title={ title }
      description={ catchphrase }
      image={ fullImageUrl }
      ogType="article"
      date={ postDate }
      >
      <TextBlock>
        <h1>{ title }</h1>
        <div className="text-sm mb-3">
          <FontAwesomeIcon icon={ faClock } /> { postDate.toLocaleString() }
        </div>
        <div className="mt-10 mb-10 pt-7 pl-12 pb-5 border-l-4 border-yellow-200 text-2xl font-light leading-relaxed">
          { splitCatchphrase }
        </div>
        <div className="mb-7 post-image-full">
          { imgElement }
        </div>
        <div className="markdown">
          <ReactMarkdown
            /** Add remark plugin Gfm (for tables, among others...) */
            remarkPlugins={[remarkGfm]}
            /** 
             * Processes the children, if it detects code marked 
             * with a language, activates the syntax highlighter 
             * component 
            */
            components={{
              code({node, inline, className, children, ...props}) {
                const langcode = /language-(\w+)/.exec(className || '')
                return !inline && langcode ? (
                  <SyntaxHighlighter
                    style={style}
                    language={langcode[1]}
                    PreTag="div"
                    {...props}
                  >
                    { children }
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
        <div className="mt-20 mb-10 flex justify-center">
          <Link href="/blog">
            <a className="btn btn-secondary">Back to blog index</a>
          </Link>
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Blogs Data
  // GQL queries
  const SLUGS_QUERY = gql`
  query GetPostsSlugs($_eq: String = "published", $sort: [String] = ["-published_at"]) {
    posts(filter: {status: {_eq: $_eq}}, sort: $sort) {
      slug
    }
  }
  `;

  let existingSlugs: Array<BlogPostSlug> = [];

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
