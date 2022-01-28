import { text } from "@fortawesome/fontawesome-svg-core";

export type PostImage = {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export type BlogPost = {
  id: string;
  title: string;
  text: string;
  slug: string;
  publishedAt: string;
  catchphrase: string;
  featured: PostImage;
}

export type PostListPagination = {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

const images_endpoint = `/assets`;

export function processPosts(posts: any): Array<BlogPost> {
  let typedPosts: Array<BlogPost> = posts.map((post: any) => {
    const { id, title, slug, published_at, catchphrase, text, 
      featured: { id: featured_id, width, height } } : any = post;

    const thePost: BlogPost = {
      id: id,
      title: title,
      slug: slug,
      publishedAt: published_at,
      catchphrase: catchphrase,
      text: text,
      featured: {
        url: `${images_endpoint}/${featured_id}?key=featured-small`,
        alternativeText: '',
        width: 640,
        height: 480, // this size comes from the preset featured-small
      },
    }

    return thePost;
  })

  return typedPosts;
}

export function processPostSingle(post: any): BlogPost {
  const { id, title, slug, published_at, catchphrase, text, 
    featured: { id: featured_id, width, height } } : any = post;
    
  const thePost: BlogPost = {
    id: id,
    title: title,
    slug: slug,
    publishedAt: published_at,
    catchphrase: catchphrase,
    text: text,
    featured: {
      url: `${images_endpoint}/${featured_id}?key=featured-big`,
      alternativeText: '',
      width: 1200,
      height: 900,
    },
  }

  return thePost;
}

export function processPagination(
  pageNumber: number, pageSize: number, postsNumber: number): PostListPagination {
    const pagination: PostListPagination = {
      page: pageNumber,
      pageSize: pageSize,
      total: postsNumber,
      pageCount: pageSize > 0 ? Math.ceil(postsNumber / pageSize) : 1
    }

    return pagination;
}
