import Chevron from "public/asset/svg/Chevron";
import { FormEvent, useState } from "react";
import { Post } from "types/community";
import useInput from "hooks/useInput";
import Close from "public/asset/svg/Close";
import CommentView from "components/community/CommentView";

interface Props {
  post: Post;
}

const PostBox = ({ post }: Props) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const inputComment = useInput();

  const onClickOpenDetail = () => {
    if (!openDetail) {
      setOpenDetail(true);
    }
  };

  const onClickHandleCommentBox = () => {
    setOpenComment((prev) => !prev);
  };

  const onSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            {openDetail && (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-end w-full">
                  <div
                    className="bg-[#5C96CA] rounded-full w-16 h-7 text-white flex justify-center items-center text-xs font-normal z-50"
                    onClick={onClickHandleCommentBox}
                  >
                    댓글달기
                  </div>
                </div>
                <div className="space-y-4">
                  <CommentView postId={post.id} />
                  {openComment && (
                    <div className="relative w-full h-auto">
                      <div
                        className="absolute top-0 right-0 z-50 w-5 h-5 m-1 cursor-pointer"
                        onClick={onClickHandleCommentBox}
                      >
                        <Close />
                      </div>
                      <form onSubmit={onSubmitComment}>
                        <input
                          type="text"
                          placeholder="여기에 댓글을 입력해 주세요"
                          {...inputComment}
                          className={`bg-[#EBEBEB] rounded-lg w-full h-auto min-h-[4rem] px-4 text-sm focus:outline-none`}
                        />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
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
