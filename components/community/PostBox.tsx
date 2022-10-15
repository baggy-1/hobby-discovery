import Chevron from "public/asset/svg/Chevron";
import { useState } from "react";
import { Post } from "types/community";
import CommentView from "components/community/CommentView";

interface Props {
  post: Post;
}

const PostBox = ({ post }: Props) => {
  const [openDetail, setOpenDetail] = useState(false);

  const onClickOpenDetail = () => {
    if (!openDetail) {
      setOpenDetail(true);
    }
  };

  return (
    <div
      key={post.id}
      className="flex items-center justify-between w-72 h-auto border-b-[1px] cursor-pointer relative pb-8 z-0"
      onClick={onClickOpenDetail}
    >
      <div className="flex flex-col items-end justify-center w-full h-auto space-y-2">
        <div className="flex items-center justify-end space-x-2 text-xs">
          <span>{`조회수 ${post.hits}`}</span>
          <span>{`추천수 ${post.recomend}`}</span>
          <span>{post.create_time.slice(0, 10)}</span>
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
              {openDetail && <span>{post.body}</span>}
            </div>
            {openDetail && <CommentView postId={post.id} />}
          </div>
          <div
            className={`${
              openDetail ? "rotate-180" : "rotate"
            } w-8 h-8 absolute bottom-0 right-0`}
            onClick={() => setOpenDetail((prev) => !prev)}
          >
            <Chevron />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
