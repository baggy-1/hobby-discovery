import useHandlePage from "hooks/useHandlePage";
import Image from "next/image";
import { useState } from "react";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleHamburger = () => {
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) {
      document.querySelector("html")?.classList.add("overflow-hidden");
    }
  };

  return (
    <>
      <nav className="sticky z-40 w-full pt-4 bg-white -top-2 h-14">
        <div className="flex justify-between w-full h-full">
          <div className="flex items-center justify-start w-full h-full pl-4">
            <div className="cursor-pointer" onClick={useHandlePage("/")}>
              <Image
                src="/asset/image/logo.png"
                alt="logo"
                width={32}
                height={32}
              />
            </div>
          </div>
          <div className="flex items-center justify-end w-full h-full pr-4">
            <div
              className="pr-4 cursor-pointer"
              onClick={useHandlePage("/profile")}
            >
              <Image
                src="/asset/image/default-profile.jpg"
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div className="cursor-pointer" onClick={handleHamburger}>
              <Image
                src="/asset/svg/hamburger.svg"
                alt="hamberger"
                width={32}
                height={32}
              />
            </div>
            {isNavOpen && (
              <div className="z-50">
                <div className="absolute top-0 right-0 w-screen h-screen bg-black opacity-70"></div>
                <div className="absolute top-0 right-0 w-[90vw] h-screen bg-black flex justify-center items-center">
                  <ul className="z-10 flex flex-col items-center justify-center space-y-8 text-2xl font-bold text-white w-fit h-fit">
                    <li>메인으로 돌아가기</li>
                    <li>취미 체험하기</li>
                    <li>고객 커뮤니티</li>
                    <li>후기 모음집</li>
                    <li>챌린지</li>
                    <li>원데이 클래스</li>
                    <li>마이 페이지</li>
                    <li>로그아웃</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
