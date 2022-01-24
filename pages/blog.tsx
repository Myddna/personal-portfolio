import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PageContainer from "../components/structure/PageContainer";
import { request, gql } from 'graphql-request';
import { BlogPost, PostListPagination, processPosts } from "../utils/posts";
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

const Blog: NextPage<Props> = ({
  posts = [], pagination = defaultPagination, previewMode = false
}) => {
  let { page } = pagination;
  let pageIndicator = null;
  if (page > 1) {
    pageIndicator = <span>(page {page})</span>;
  }
  return (
    <PageContainer image="/screenshotPortfolio.png">
      <Head>
        <title>Blog {pageIndicator}</title>
      </Head>
      <div className="max-w-screen-lg px-4 pt-10 pb-16 mx-auto text-gray-500 text-lg">
        <h1>Blog {pageIndicator}</h1>
        <PostList posts={posts} />
        <PostListPaginator pagination={pagination} />
      </div>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Preview mode control
  const previewMode = context.preview == false || context.preview == null ? 'LIVE' : 'PREVIEW';
  const orderBy = previewMode ? 'updatedAt:desc' : 'publishedAt:desc';
  const pageNumber = Number(context.query.page) || 1;
  // Query
  const QUERY = gql`
    query($previewMode: PublicationState, $sort: String, $page: Int) {
      posts(
        publicationState: $previewMode
        sort: [$sort]
        pagination: { page: $page, pageSize: 4 }
      ) {
        data {
          id
          attributes {
            title
            slug
            publishedAt
            catchphrase
            text
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
        meta {
          pagination {
            page
            pageSize
            total
            pageCount
          }
        }
      }
    }
  `;

  try {
    const { posts: response } = await request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, QUERY,
      {
        previewMode: previewMode,
        sort: orderBy,
        page: pageNumber,
      },
    );

    const { data: posts, meta: { pagination } } = response;

    const typedPosts = processPosts(posts);

    return {
      props: {
        posts: typedPosts,
        pagination: pagination,
        previewMode: previewMode
      },
    }

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      posts: [],
      pagination: {},
      previewMode: previewMode
    },
  }

};

export default Blog;
