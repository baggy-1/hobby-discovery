import { css } from "@emotion/react";
import { AxiosError } from "axios";
import fetchLogin from "function/fetchLogin";
import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { mutate } from "swr";

const LoginForm = () => {
  const userId = useInput(/^[a-zA-Z0-9]*$/gm);
  const userPw = useInput();
  const router = useRouter();
  const [notice, setNotice] = useState("");

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId.value && userPw.value) {
      const data = {
        username: userId.value,
        password: userPw.value,
      };

      fetchLogin(data)
        .then((_) => {
          mutate("/user", null, {
            revalidate: true,
          }).then(() => {
            router.back();
          });
        })
        .catch((error: unknown) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
              setNotice("아이디 또는 비밀번호가 일치하지 않습니다.");

              return;
            }
          }

          throw new Error(`error: ${error}`);
        });
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
            value={userId.value}
            onChange={userId.onChange}
          />
        </div>
        <div className="flex items-center justify-between w-80">
          <input
            type="password"
            id="password"
            className="w-80 h-12 rounded bg-[#EBEBEB] cursor-text p-4"
            placeholder="비밀번호"
            value={userPw.value}
            onChange={userPw.onChange}
          />
        </div>
        <div css={Notice}>{notice}</div>
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

const Notice = css({
  width: "20rem",
  height: "3rem",
  color: "red",
  textAlign: "center",
});
