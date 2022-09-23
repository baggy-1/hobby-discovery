import { useState } from "react";
import data from "data.json";
import PostBox from "components/community/PostBox";

const Community = () => {
  const [currentTap, setCurrentTap] = useState<"all" | "comment">("all");

  const onClickChangeTap = (tap: "all" | "comment") => {
    return () => {
      setCurrentTap(tap);
    };
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start space-y-6 min-h-[calc(100vh-3.5rem-5rem)] w-full pt-8 text-[#8e8e8e] h-auto">
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-black">고객 커뮤니티</span>
          <span className="text-sm">자유롭게 얘기 해보아요</span>
        </div>
        <div className="flex items-center justify-between h-10 w-72">
          <div className="flex w-1/2 h-10">
            <div
              className={`flex items-center justify-center h-full border border-l-0 rounded-tr-lg w-14 transition-none cursor-pointer ${
                currentTap === "all"
                  ? "-translate-y-1 border-b-0"
                  : "border-b-[1px]"
              }`}
              onClick={onClickChangeTap("all")}
            >
              전체
            </div>
            <div
              className={`flex items-center justify-center w-16 h-full border rounded-t-lg transition-none cursor-pointer ${
                currentTap === "comment"
                  ? "border-b-0 -translate-y-1"
                  : "border-b-[1px]"
              }`}
              onClick={onClickChangeTap("comment")}
            >
              댓글순
            </div>
          </div>
          <div className="flex items-center justify-end w-full border-b-[1px] h-10">
            <div className="flex items-center justify-center w-20 h-8 bg-[#F4BB5F] rounded-xl text-sm text-white cursor-pointer">
              글쓰기
            </div>
          </div>
        </div>
        <div>
          {data.results
            .sort((a, b) => {
              if (currentTap === "comment") {
                return b.comment.length - a.comment.length;
              } else if (currentTap === "all") {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              } else {
                return 0;
              }
            })
            .map((post) => (
              <PostBox key={post.id} post={post} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Community;
