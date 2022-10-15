import useSWR from "swr";
import { Comment } from "types/community";
import CommentBox from "components/community/CommentBox";

interface Props {
  postId: number;
}

const CommentView = ({ postId }: Props) => {
  const COMMENT_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/community/${postId}/coments`;

  const { data } = useSWR<Comment[]>(COMMENT_URL);

  return (
    <>
      {data?.map((comment) => (
        <CommentBox
          key={`${comment.user}${comment.create_time}`}
          comment={comment}
        />
      ))}
    </>
  );
};

export default CommentView;
