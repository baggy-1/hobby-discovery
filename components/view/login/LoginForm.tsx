import fetchLogin from "function/fetchLogin";
import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const LoginForm = () => {
  const userId = useInput(/^[a-zA-Z0-9]*$/gm);
  const userPw = useInput();
  const router = useRouter();

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId.value && userPw.value) {
      try {
        const data = {
          username: userId.value,
          password: userPw.value,
        };

        fetchLogin(data);
        router.replace("/");
      } catch (error) {
        throw new Error(`error: ${error}`);
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginForm;
