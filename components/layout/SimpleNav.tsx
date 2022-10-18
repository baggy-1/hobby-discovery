import Image from "next/image";
import { useRouter } from "next/router";
import Arrow from "public/asset/svg/Arrow";

const SimpleNav = () => {
  const router = useRouter();

  return (
    <nav className="absolute flex items-center justify-center w-full px-4 text-black bg-white h-14 dark:bg-black dark:text-white">
      <div className="flex w-full h-full max-w-[80rem] items-center justify-between">
        <div
          className="text-[#8e8e8e] dark:text-white w-8 h-8 flex justify-center items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <Arrow />
        </div>
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => router.replace("/store")}
        >
          <Image
            src="/asset/image/logo.png"
            alt="logo"
            width={32}
            height={32}
          />
        </div>
      </div>
    </nav>
  );
};

export default SimpleNav;
