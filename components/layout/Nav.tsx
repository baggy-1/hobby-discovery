import NavLi from "components/common/NavLi";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import Hamburger from "public/asset/svg/Hamburger";
import { useState } from "react";
import navLink from "util/navLink";

interface Props {
  user: string | null;
}

const Nav = ({ user }: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const handleHamburger = () => {
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) {
      document.querySelector("html")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("html")?.classList.remove("overflow-hidden");
    }
  };

  const pushRouterEvent = (path: string) => {
    return () => {
      router.push(path);
      setIsNavOpen(false);
    };
  };

  return (
    <>
      <nav className="sticky top-0 z-[500] w-full bg-white dark:bg-black h-14 border-b border-0">
        <div className="flex justify-between w-full h-full">
          <div className="flex items-center justify-start w-full h-full pl-4">
            <div className="cursor-pointer" onClick={pushRouterEvent("/")}>
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
              className="flex items-center justify-center mr-4 cursor-pointer"
              onClick={pushRouterEvent("/profile")}
            >
              <Image
                src="/asset/image/default-profile.jpg"
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div
              className="w-8 h-8 text-[#8e8e8e] cursor-pointer dark:text-white"
              onClick={handleHamburger}
            >
              <Hamburger />
            </div>
            {isNavOpen && (
              <>
                <div className="absolute top-0 right-0 w-full h-screen bg-white dark:bg-black opacity-70"></div>
                <div
                  className={`absolute top-0 right-0 w-[90%] h-screen bg-white dark:bg-black flex justify-center items-center`}
                >
                  <div
                    className="absolute top-0 right-0 w-8 h-8 m-4 text-[#8e8e8e] cursor-pointer dark:text-white"
                    onClick={handleHamburger}
                  >
                    <Close />
                  </div>
                  <ul className="z-10 flex flex-col items-center justify-center space-y-8 text-2xl text-black dark:text-white w-fit h-fit">
                    {navLink.map((link) => (
                      <NavLi
                        key={link.title}
                        title={link.title}
                        event={pushRouterEvent(link.path)}
                      />
                    ))}
                    {user ? (
                      <>
                        <NavLi
                          title={"마이 페이지"}
                          event={pushRouterEvent("/profile")}
                        />
                        <NavLi
                          title={"로그아웃"}
                          event={pushRouterEvent("/")}
                        />
                      </>
                    ) : (
                      <>
                        <NavLi
                          title={"로그인"}
                          event={pushRouterEvent("/login")}
                        />
                        <NavLi
                          title={"회원가입"}
                          event={pushRouterEvent("/signup")}
                        />
                      </>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
