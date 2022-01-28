import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import PageContainer from "../../../components/structure/PageContainer";
import { request, gql } from 'graphql-request';
import { BlogPost, PostListPagination, processPagination, processPosts } from "../../../utils/posts";
import PostList from "../../../components/blog/PostList";
import PostListPaginator from "../../../components/blog/PostListPagination";

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

type BlogArchivePageSlug = {
  params: {
    page: string;
  };
};

const Blog: NextPage<Props> = ({ posts = [], pagination = defaultPagination }) => {
  let { page } = pagination;
  const pageIndicator = <span>(page {page})</span>;

  return (
    <PageContainer  image={`${process.env.NEXT_PUBLIC_SITE_URL}/screenshotPortfolio.png`}>
      <Head>
        <title>Blog {pageIndicator}</title>
      </Head>
      <div className="max-w-screen-lg px-4 pt-10 pb-16 mx-auto text-gray-500 text-lg">
        <h1>Blog {pageIndicator}</h1>
        { posts.length > 0 && 
          <>
            <PostList posts={posts} />
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

const state = 'published';
const pageSize = 3;

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('[page].tsx');
  // Preview mode control
  const pageNumber = context.params?.page ? Number(context.params?.page[0]) : 1;
  const orderBy = ["-published_at"];

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


export const getStaticPaths: GetStaticPaths = async () => {
  // Pages Data
  // GQL queries
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

  let allPages: Array<string> = [];
  let pageNumberSlugs: Array<BlogArchivePageSlug> = [];

  try {
    const { posts_aggregated } = await request(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`, QUERY_TOTAL, {_eq: state});
    
    let postsNumber;

    if(posts_aggregated.length){
      const { count: { id: theNumber }} = posts_aggregated[0];
      postsNumber = theNumber;
    }

    for(let i = 2; i <= Math.ceil(postsNumber/pageSize); i++) {
      allPages.push(`${i}`);
    }

    pageNumberSlugs = allPages.map((pageNumber: string) => {
      return {
        params: { page: pageNumber }
      }
    });

  } catch(error) {
    console.log(error);
  }  
  return {
      paths: pageNumberSlugs,
      fallback: false
  };
}

export default Blog;
