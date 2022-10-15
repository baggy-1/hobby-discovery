import useSWR from "swr";
import { Comment } from "types/community";
import { User } from "types/user";

interface Props {
  comment: Comment;
}

const CommentBox = ({ comment }: Props) => {
  const USER_NAME_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/user/${comment.user}`;
  const { data: user } = useSWR<User>(USER_NAME_URL);

  return (
    <div
      key={`${comment.create_time}@${comment.user}`}
      className="space-y-2 w-72 h-auto p-4 rounded-lg bg-[#EBEBEB] text-[#8e8e8e]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="text-black">{user?.nickname}</div>
        </div>
        <div className="text-xs">{comment.create_time.slice(0, 10)}</div>
      </div>
      <div className="text-sm">{comment.coment}</div>
    </div>
  );
};

export default CommentBox;
