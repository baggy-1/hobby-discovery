import Image from "next/image";
import useHandlePage from "hooks/useHandlePage";

const MainSection = () => {
  return (
    <>
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
            오직 <span className="text-[#F4BB5F] text-sm">HOBBY Discovery</span>{" "}
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
      <div></div>
    </>
  );
};

export default MainSection;
