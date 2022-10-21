import { useRouter } from "next/router";
import LogoWithText from "components/common/LogoWithText";
import { cursorPoint } from "components/common/styles";
import useUser from "hooks/useUser";
import LoginForm from "components/view/login/LoginForm";

const LoginView = () => {
  const router = useRouter();
  const { user } = useUser();

  if (user) {
    router.replace("/store");
  }

  return (
    <>
      <div className="w-screen min-h-screen text-lg text-black bg-white">
        <div className="flex flex-col items-center justify-start w-full h-auto border-[#8e8e8e] py-7 border-b">
          <LogoWithText text={"로그인"} />
          <LoginForm />
        </div>
        <div className="mt-8 space-y-8">
          <div className="flex flex-col items-center justify-center">
            <span>처음이신가요?</span>
            <span
              onClick={() => router.replace("/auth/signup")}
              css={cursorPoint}
            >
              회원가입하기
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
