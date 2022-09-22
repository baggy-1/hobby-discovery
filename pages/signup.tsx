import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const SignUp = () => {
  const router = useRouter();
  const userId = useInput(/^[a-zA-Z0-9]*$/gm);
  const { value: valuePwFirst, onChange: onChangePwFirst } = useInput(
    /^[a-zA-Z0-9~!@#$%^&*?]*$/gm
  );
  const { value: valuePwSecond, onChange: onChangePwSecond } = useInput();

  const onSubmitSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmpty = [userId.value, valuePwFirst, valuePwSecond].some(
      (value) => value === ""
    );

    if (isEmpty) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    if (valuePwFirst.length < 8) {
      alert("비밀번호는 8자 이상 입력해주세요");
      return;
    }

    if (valuePwFirst !== valuePwSecond) {
      alert("비밀번호가 서로 달라요");
      return;
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen text-lg text-black bg-white dark:bg-black dark:text-white">
        <div className="flex flex-col items-center justify-start border-b w-full h-96 border-[#8e8e8e] py-7">
          <div className="m-8 text-2xl font-bold">회원가입</div>
          <form
            className="flex flex-col items-center justify-center space-y-6 font-bold"
            onSubmit={onSubmitSignUp}
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
                value={valuePwFirst}
                onChange={onChangePwFirst}
              />
            </div>
            <div className="flex items-center justify-between w-80">
              <label htmlFor="passwordCheck">비밀번호 확인</label>
              <input
                type="password"
                id="passwordCheck"
                className="w-48 h-9 rounded bg-[#EBEBEB] cursor-text"
                value={valuePwSecond}
                onChange={onChangePwSecond}
              />
            </div>
            <button
              type="submit"
              className="h-12 w-80 bg-[#F4BB5F] rounded text-white cursor-pointer"
            >
              간편 회원가입
            </button>
          </form>
        </div>
        <div className="mt-8 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-80 bg-[#F4BB5F] rounded cursor-pointer text-black font-bold flex justify-center items-center">
              카카오 계정으로 시작하기
            </div>
            <div className="h-12 w-80 bg-[#F4BB5F] rounded cursor-pointer text-black font-bold flex justify-center items-center">
              구글 계정으로 시작하기
            </div>
            <div className="h-12 w-80 bg-[#F4BB5F] rounded cursor-pointer text-black font-bold flex justify-center items-center">
              네이버 계정으로 시작하기
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>이미 회원이신가요?</span>
            <span onClick={() => router.replace("/login")}>로그인하기</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
