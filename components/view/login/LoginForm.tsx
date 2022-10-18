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

        fetchLogin(data).then((_) => {
          router.replace("/store");
        });
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
          <input
            type="text"
            id="id"
            className="w-80 h-12 rounded bg-[#EBEBEB] cursor-text p-4"
            placeholder="아이디"
            {...userId}
          />
        </div>
        <div className="flex items-center justify-between w-80">
          <input
            type="password"
            id="password"
            className="w-80 h-12 rounded bg-[#EBEBEB] cursor-text p-4"
            placeholder="비밀번호"
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
