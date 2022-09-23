import Chevron from "public/asset/svg/Chevron";
import { useState } from "react";
import { Post } from "types/community";
import CommentBox from "components/community/CommentBox";

interface Props {
  post: Post;
}

const PostBox = ({ post }: Props) => {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div
      key={post.id}
      className="flex items-center justify-between w-72 h-auto border-b-[1px] cursor-pointer relative pb-8"
      onClick={() => setOpenDetail((prev) => !prev)}
    >
      <div className="flex flex-col items-end justify-center w-full h-auto space-y-2">
        <div className="flex items-center justify-end space-x-2 text-xs">
          <span>{`조회수 ${post.counts}`}</span>
          <span>{`댓글수 ${post.comment.length}`}</span>
          <span>{post.created_at.slice(0, 10)}</span>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col justify-center w-full text-base font-bold">
            <div
              className={`w-full ${
                openDetail ? "pb-10" : "pb-0"
              } flex flex-col`}
            >
              <span>
                {openDetail
                  ? post.title
                  : post.title.length < 22
                  ? post.title
                  : post.title.slice(0, 22) + "..."}
              </span>
              {openDetail && <span>{post.description}</span>}
            </div>
            {openDetail && (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-end w-full">
                  <div className="bg-[#5C96CA] rounded-full w-16 h-7 text-white flex justify-center items-center text-xs font-normal">
                    댓글달기
                  </div>
                </div>
                <div className="space-y-4">
                  {post.comment.map((comment) => (
                    <CommentBox key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            className={`${
              openDetail ? "rotate-180" : "rotate"
            } w-8 h-8 absolute bottom-0 right-0`}
          >
            <Chevron />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;