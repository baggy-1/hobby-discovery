import Seo from "components/Seo";
import type { NextPage } from "next";
import Image from "next/image";
import useHandlePage from "hooks/useHandlePage";

const Home: NextPage = () => {
  const changeTheme = () => {
    document.querySelector("html")?.classList.toggle("dark");
  };

  return (
    <>
      <Seo />
      <div className="text-black bg-white dark:bg-black dark:text-white">
        <div className="relative w-full h-[580px]">
          <div className="absolute z-10 w-full h-full bg-black opacity-20"></div>
          <Image
            src="/asset/image/main-image.png"
            alt="main-bg"
            layout="fill"
            priority={true}
          />
          <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full space-y-8 text-white">
            <div className="text-xs">
              오직{" "}
              <span className="text-[#F4BB5F] text-sm">HOBBY Discovery</span>{" "}
              에서만 볼 수 있는 구독 서비스
            </div>
            <div className="flex flex-col items-center justify-center text-3xl font-bold">
              <span>나만의 흥미로운</span>
              <span>취미를 찾아보세요</span>
            </div>
            <div
              className="bg-[#F4BB5F] w-40 h-12 flex justify-center items-center rounded-lg font-bold cursor-pointer"
              onClick={useHandlePage("/hobby")}
            >
              지금 바로 찾아보기
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center p-10 text-3xl font-bold">
            다양한 취미가 있어요
          </div>
        </div>
        <div className="fixed bottom-0 right-0 z-50 flex m-2">
          <div
            className="flex items-center justify-center w-32 h-10 text-xs text-white bg-[#363636] dark:bg-[#f9f9f9] dark:text-black rounded-full cursor-pointer"
            onClick={changeTheme}
          >
            테마를 변경해보세요
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
