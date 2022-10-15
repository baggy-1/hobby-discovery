import PostBox from "components/community/PostBox";
import Seo from "components/Seo";
import { useRouter } from "next/router";
import useTab from "hooks/useTab";
import useSWR from "swr";
import { Post } from "types/community";
import Tab from "components/community/Tab";

const COMMUNITY_POST_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/community/views`;

const Community = () => {
  const { currentTab, onClickChangeTab } = useTab("all", [
    "all",
    "hits",
    "recomend",
  ]);
  const { data } = useSWR<Post[]>(COMMUNITY_POST_URL);
  const router = useRouter();

  const sortPost = data
    ?.slice()
    .sort(
      (
        { hits: aHits, recomend: aRecomend, create_time: aCreate_time },
        { hits: bHits, recomend: bRecomend, create_time: bCreate_time }
      ) => {
        if (currentTab === "hits") {
          return bHits - aHits;
        } else if (currentTab === "all") {
          return (
            new Date(bCreate_time).getTime() - new Date(aCreate_time).getTime()
          );
        } else if (currentTab === "recomend") {
          return bRecomend - aRecomend;
        } else {
          return 0;
        }
      }
    );

  return (
    <>
      <Seo title={"커뮤니티"} />
      <div className="flex flex-col items-center justify-start space-y-6 min-h-[calc(100vh-3.5rem-5rem)] w-full pt-8 text-[#8e8e8e] h-auto bg-white dark:bg-black dark:text-white">
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-black dark:text-white">
            고객 커뮤니티
          </span>
          <span className="text-sm">자유롭게 얘기 해보아요</span>
        </div>
        <div className="flex items-center justify-between h-10 w-72">
          <div className="flex w-1/2 h-10">
            <Tab
              title={"전체"}
              tabName={"all"}
              currentTab={currentTab}
              onClickChangeTab={onClickChangeTab}
            />
            <Tab
              title={"조회순"}
              tabName={"hits"}
              currentTab={currentTab}
              onClickChangeTab={onClickChangeTab}
            />
            <Tab
              title={"추천순"}
              tabName={"recomend"}
              currentTab={currentTab}
              onClickChangeTab={onClickChangeTab}
            />
          </div>
          <div className="flex items-center justify-end w-full border-b-[1px] h-10">
            <div
              className="flex items-center justify-center w-20 h-8 bg-[#F4BB5F] rounded-xl text-sm text-white cursor-pointer"
              onClick={() => router.push("/community/write")}
            >
              글쓰기
            </div>
          </div>
        </div>
        {sortPost?.map((post) => (
          <PostBox key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Community;
