import { useRouter } from "next/router";
import LogoWithText from "components/common/LogoWithText";
import { cursorPoint } from "components/common/styles";
import useUser from "hooks/useUser";
import SignUpForm from "components/view/signup/SignUpForm";

const SignUpView = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    console.log(user);
    router.replace("/store");
  }

  return (
    <div className="w-screen min-h-screen text-lg text-black bg-white">
      <div className="flex flex-col items-center justify-start border-b w-full h-auto border-[#8e8e8e] py-7">
        <LogoWithText text={"회원가입"} />
        <SignUpForm />
      </div>
      <div className="mt-8 space-y-8">
        {/* <div className="flex items-center justify-between mb-4 w-80">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            className="w-48 h-9 rounded bg-[#EBEBEB] cursor-text"
            placeholder="미입력시 익명으로 표시됩니다"
            {...nickname}
          />
        </div>
        <input type="file" onChange={onChangeFile} /> */}
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
