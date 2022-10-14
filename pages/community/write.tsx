import Seo from "components/Seo";
import { useFetchUser } from "hooks/useFetchUser";
import useInput from "hooks/useInput";
import { FormEvent } from "react";

const Write = () => {
  const { user } = useFetchUser();
  const title = useInput();
  const content = useInput();

  const onSubmitCommunityPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (!user) return <div>로그인이 필요한 서비스 입니다</div>;

  return (
    <>
      <Seo title="커뮤니티 글쓰기" />
      <div className="w-full min-h-[calc(100vh-3.5rem-5rem)] text-[#8e8e8e] bg-white dark:bg-black space-y-8">
        <div className="flex flex-col items-center justify-center pt-8">
          <span className="text-2xl font-bold text-black dark:text-white">
            커뮤니티 글 작성하기
          </span>
          <span className="text-xs">하고 싶은 얘기를 마음껏 해주세요</span>
        </div>
        <div className="flex items-center justify-center w-full h-auto">
          <form
            className="flex flex-col items-center justify-center h-auto space-y-6 w-72"
            onSubmit={onSubmitCommunityPost}
          >
            <input
              type="text"
              placeholder="제목을 작성해 주세요"
              {...title}
              className="w-full h-10 p-4 bg-white border rounded-lg cursor-text dark:bg-black dark:text-white"
            />
            <textarea
              placeholder="내용을 작성해 주세요"
              {...content}
              className="w-full p-4 bg-white border rounded-lg cursor-text h-80 dark:bg-black dark:text-white"
            />
            <button className="w-full h-10 bg-[#F4BB5F] rounded-lg text-white cursor-pointer">
              완료
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Write;
