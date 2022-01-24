import { FunctionComponent } from "react";
import { PostListPagination } from "../../utils/posts";
import Link from "next/link";

type Props = {
  pagination: PostListPagination;
}

const PostListPaginator: FunctionComponent<Props> = ({ pagination: { page, pageCount } }: Props) => {
  let previous = <span />;
  let next = <span />;

  if(page == 1){
    previous = <span className="btn text-gray-600 hover:text-gray-600">Previous</span>;
  } else if(page == 2){
    previous = <Link href={`/blog`}><a className="btn btn-primary">Previous</a></Link>;
  } else if(page > 1){
    previous = <Link href={`/blog?page=${page - 1}`}><a className="btn btn-primary">Previous</a></Link>;
  }

  if(page < pageCount) {
    next = <Link href={`/blog?page=${page + 1}`}><a className="btn btn-primary">Next</a></Link>;
  } else if(page == pageCount) {
    next = <span className="btn text-gray-600 hover:text-gray-600">Next</span>;
  }
  return (
    <div className="mt-10 mb-7 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
      { previous }
      <span className="btn text-gray-600 hover:text-gray-600">Page {page} of {pageCount}</span>
      { next }      
    </div>
  );
};

export default PostListPaginator;
