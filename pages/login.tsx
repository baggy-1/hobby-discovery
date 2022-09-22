import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const Login = () => {
  const router = useRouter();
  const userId = useInput(/^[a-zA-Z0-9]*$/gm);
  const userPw = useInput();

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="w-screen min-h-screen text-lg text-black bg-white dark:bg-black dark:text-white">
        <div className="flex flex-col items-center justify-start border-b w-full h-96 border-[#8e8e8e] py-7">
          <div className="m-8 text-2xl font-bold">로그인</div>
          <form
            className="flex flex-col items-center justify-center space-y-6 font-bold"
            onSubmit={onSubmitLogin}
          >
            <div className="flex items-center justify-between w-80">
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                id="id"
                className="w-48 h-9 rounded bg-[#EBEBEB] cursor-text"
                {...userId}
              />
            </div>
            <div className="flex items-center justify-between w-80">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                className="w-48 h-9 rounded bg-[#EBEBEB] cursor-text"
                {...userPw}
              />
            </div>
            <button
              type="submit"
              className="h-12 w-80 bg-[#F4BB5F] rounded text-white cursor-pointer"
            >
              로그인
            </button>
          </form>
        </div>
        <div className="mt-8 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-80 bg-[#F4BB5F] rounded cursor-pointer text-black font-bold flex justify-center items-center">
              카카오 계정으로 로그인하기
            </div>
            <div className="h-12 w-80 bg-[#F4BB5F] rounded cursor-pointer text-black font-bold flex justify-center items-center">
              구글 계정으로 로그인하기
            </div>
            <div className="h-12 w-80 bg-[#F4BB5F] rounded cursor-pointer text-black font-bold flex justify-center items-center">
              네이버 계정으로 로그인하기
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>처음이신가요?</span>
            <span onClick={() => router.replace("/signup")}>회원가입하기</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
