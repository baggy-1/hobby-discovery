import useSWR from "swr";
import CommentBox from "components/community/CommentBox";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Close from "public/asset/svg/Close";
import { Comment } from "types";
import useUser from "hooks/useUser";

interface Props {
  postId: number;
}

const CommentView = ({ postId }: Props) => {
  const COMMENT_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/community/${postId}/coments`;

  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const { data } = useSWR<Comment[]>(COMMENT_URL, { refreshInterval: 1000 });

  const onClickHandleCommentBox = () => {
    setOpenComment((prev) => {
      if (!prev) {
        if (!user) {
          alert("로그인이 필요합니다.");
          return false;
        }
        return !prev;
      }
      return !prev;
    });
  };

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setComment(value);
  };

  const onSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return alert("로그인이 필요합니다.");

    const newComent = {
      coment: comment,
      user: user.id,
      create_time: new Date().toISOString(),
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/community/${postId}/coment`,
        newComent
      );
    } catch (error: unknown) {
      throw new Error(`error: ${error}`);
    } finally {
      setComment("");
      onClickHandleCommentBox();
    }
  };

  return (
    <>
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
          {data?.map((comment) => (
            <CommentBox
              key={`${comment.user}${comment.create_time}`}
              comment={comment}
            />
          ))}
        </div>
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
                value={comment}
                onChange={onChangeComment}
                className={`bg-[#EBEBEB] rounded-lg w-full h-auto min-h-[4rem] px-4 text-sm focus:outline-none`}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentView;
