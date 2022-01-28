import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import PageContainer from "../components/structure/PageContainer";
import { request, gql } from 'graphql-request';
import { BlogPost, PostListPagination, processPagination, processPosts } from "../utils/posts";
import PostList from "../components/blog/PostList";
import PostListPaginator from "../components/blog/PostListPagination";

type Props = {
  posts: Array<BlogPost>;
  pagination: PostListPagination;
  previewMode: boolean;
};

const defaultPagination: PostListPagination = {
  page: 1,
  pageSize: 1,
  pageCount: 1,
  total: 1,
}

const Blog: NextPage<Props> = ({ posts = [], pagination = defaultPagination }) => {  
  return (
    <PageContainer  image={`${process.env.NEXT_PUBLIC_SITE_URL}/screenshotPortfolio.png`}>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="max-w-screen-lg px-4 pt-10 pb-16 mx-auto text-gray-500 text-lg">
        <h1>Blog</h1>
        { posts.length > 0 && 
          <>
            <PostList posts={posts} highlightFirst={true} />
            <PostListPaginator pagination={pagination} />
          </>
        }
        { posts.length == 0 && 
          <div className="my-10 text-xl">
            There are no posts available at this moment.
          </div>
        }
      </div>
    </PageContainer>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Preview mode control
  const pageNumber = 1;
  const orderBy = ["-published_at"];
  const state = 'published';
  const pageSize = 3;
  // Query
  const QUERY = gql`
  query GetPostsForList(
      $_eq: String = "published", 
      $sort: [String] = ["-published_at"], 
      $pageNumber: Int = 1,
      $limit: Int = 2
    ) {
    posts(filter: {status: {_eq: $_eq}}, sort: $sort, page: $pageNumber, limit: $limit) {
      id
      title
      slug
      catchphrase
      text
      featured {
        id
        width
        height
      }
      published_at
      status
    }
  }
  `;

  const QUERY_TOTAL = gql`
  query GetPostsForListTotal(
      $_eq: String = "published", 
    ) {
    posts_aggregated(filter: {status: {_eq: $_eq}}) {
      count {
        id
      }
    }
  }
  `;

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

    const { posts } = await request(endpoint, QUERY, {
      _eq: state, 
      sort: orderBy,
      pageNumber: pageNumber,
      limit: pageSize
    });
    const typedPosts = processPosts(posts);

    const { posts_aggregated } = await request(endpoint, QUERY_TOTAL, {_eq: state});
    let pagination = {};
    if(posts_aggregated.length){
      const { count: { id: postsNumber }} = posts_aggregated[0];
      pagination = processPagination(pageNumber, pageSize, postsNumber);
    }
    

    return {
      props: {
        posts: typedPosts,
        pagination: pagination,
      },
    }

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      posts: [],
      pagination: {},
    },
  }

};

export default Blog;
