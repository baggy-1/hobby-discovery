import useHandlePage from "hooks/useHandlePage";

const Footer = () => {
  return (
    <footer className="text-xs bg-[#EBEBEB] text-black">
      <div className="p-4">
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
        <span className="text-[#767676] cursor-pointer">© HOBBY Discovery</span>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
