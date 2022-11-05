import { useRouter } from "next/router";
import LogoWithText from "components/common/LogoWithText";
import { cursorPoint } from "components/common/styles";
import useUser from "hooks/useUser";
import SignUpForm from "components/view/signup/SignUpForm";
import { useEffect } from "react";

const SignUpView = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/store");
    }
  }, []);

  return (
    <div className="w-screen min-h-screen text-lg text-black bg-white">
      <div className="flex flex-col items-center justify-start border-b w-full h-auto border-[#8e8e8e] py-7">
        <LogoWithText text={"회원가입"} />
        <SignUpForm />
      </div>
      <div className="mt-8 space-y-8">
        <div className="flex flex-col items-center justify-center">
          <span>이미 회원이신가요?</span>
          <span onClick={() => router.replace("/auth/login")} css={cursorPoint}>
            로그인하기
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
