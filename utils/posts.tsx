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

export function processPosts(posts: any): Array<BlogPost> {
   let typedPosts: Array<BlogPost> = posts.map(({
     id, 
     attributes: {title, slug, publishedAt, catchphrase, text, featured }
    } : { id: any, attributes: any }) => {
      const { url, alternativeText, width, height } = featured?.data?.attributes;
      const thePost: BlogPost = {
        id: id,
        title: title,
        slug: slug,
        publishedAt: publishedAt,
        catchphrase: catchphrase,
        text: text,
        featured: {
          url: url,
          alternativeText: alternativeText,
          width: width,
          height: height,
        },
      }

      return thePost;
  })

  return typedPosts;
}


export function processPostSingle(post: any): BlogPost {
  const {
    id, 
    attributes: {title, slug, publishedAt, catchphrase, text, featured }} : any = post;
  let { url, alternativeText, width, height } = featured?.data?.attributes;
  
  const thePost: BlogPost = {
    id: id,
    title: title,
    slug: slug,
    publishedAt: publishedAt,
    catchphrase: catchphrase,
    text: text,
    featured: {
      url: url,
      alternativeText: alternativeText,
      width: width,
      height: height,
    },
  }

  return thePost;
}
