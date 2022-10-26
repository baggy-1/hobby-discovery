import footerLink from "config/data/footerLink";
import useHandlePage from "hooks/useHandlePage";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <footer
      className={`text-xs bg-[#EBEBEB] dark:bg-[#8e8e8e] text-black flex justify-between w-full`}
    >
      <div className="flex flex-col items-start justify-end w-full h-20 p-4">
        <div className="text-bold">
          <span
            className="pr-4 cursor-pointer"
            onClick={useHandlePage("/policy/service")}
          >
            이용약관
          </span>
          <span
            className="cursor-pointer"
            onClick={useHandlePage("/policy/privacy")}
          >
            개인정보처리방침
          </span>
        </div>
        <span className="text-[#767676] dark:text-[#565656] cursor-pointer">
          © CHIHAM
        </span>
      </div>
      <div className="flex items-end justify-end w-full h-20 p-4 space-x-1">
        {footerLink.map((link) => (
          <div
            key={link.title}
            onClick={() => router.push(link.url)}
            className="w-4 h-4 bg-black rounded-full"
          >
            {link.image && (
              <Image
                src={link.image}
                alt="link-icon"
                width={16}
                height={16}
                className="rounded-full"
              />
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
