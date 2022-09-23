import { Comment } from "types/community";

interface Props {
  comment: Comment;
}

const CommentBox = ({ comment }: Props) => {
  return (
    <div
      key={comment.id}
      className="space-y-2 w-72 h-auto p-4 rounded-lg bg-[#EBEBEB]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="text-black">{comment.userId}</div>
        </div>
        <div className="text-xs">{comment.created_at.slice(0, 10)}</div>
      </div>
      <div className="text-sm">{comment.content}</div>
    </div>
  );
};

export default CommentBox;
