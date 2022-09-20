import Image from "next/image";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  const handlePage = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <nav className="flex justify-between w-full h-14">
        <div className="flex items-center justify-start w-full h-full pl-4">
          <div className="cursor-pointer" onClick={() => handlePage("/")}>
            <Image
              src="/asset/image/logo.png"
              alt="logo"
              width={32}
              height={32}
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-full h-full pr-4 space-x-4">
          <div
            className="cursor-pointer"
            onClick={() => handlePage("/profile")}
          >
            <Image
              src="/asset/image/default-profile.jpg"
              alt="profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div className="cursor-pointer">
            <Image
              src="/asset/svg/hamberger.svg"
              alt="hamberger"
              width={32}
              height={32}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
