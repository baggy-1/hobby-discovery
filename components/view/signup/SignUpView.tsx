import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import LogoWithText from "components/common/LogoWithText";
import { cursorPoint } from "components/common/styles";
import useUser from "hooks/useUser";

const SignUpView = () => {
  const { user } = useUser();
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const userId = useInput(/^[a-zA-Z0-9]*$/gm);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { value: valuePwFirst, onChange: onChangePwFirst } = useInput(
    /^[a-zA-Z0-9~!@#$%^&*?]*$/gm
  );
  const { value: valuePwSecond, onChange: onChangePwSecond } = useInput();
  const nickname = useInput();

  useEffect(() => {
    const data = new FormData();
    setFormData(data);
  }, []);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files) {
      formData?.append("profile", files[0]);
    }
  };

  const onSubmitSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmpty = [userId.value, valuePwFirst, valuePwSecond].some(
      (value) => value === ""
    );

    if (isEmpty) {
      setNotice("아이디와 비밀번호를 입력해주세요");
      return;
    }

    if (valuePwFirst.length < 8) {
      setNotice("비밀번호는 8자 이상 입력해주세요");
      return;
    }

    if (valuePwFirst !== valuePwSecond) {
      setNotice("비밀번호가 서로 달라요");
      return;
    }

    formData?.append("username", userId.value);
    formData?.append("password", valuePwFirst);
    formData?.append("nickname", nickname.value || `익명#${Date.now()}`);

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`,
        formData,
        { withCredentials: true }
      );
      const {
        access_token: accessToken,
        access_exp: accessExp,
        refresh_token: refreshToken,
      } = result.data;
      document.cookie = `_hobby_at=${accessToken};`;
      document.cookie = `_hobby_ae=${accessExp};`;
      document.cookie = `_hobby_rt=${refreshToken};`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      router.replace("/store");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setNotice("중복된 아이디입니다");
          return;
        }
      } else if (error instanceof Error) {
        throw new Error(`${error.name}${error.message}`);
      }
      throw new Error(`error: ${error}`);
    }
  };

  if (user) {
    router.replace("/store");
  }

  return (
    <div className="w-screen min-h-screen text-lg text-black bg-white">
      <div className="flex flex-col items-center justify-start border-b w-full h-auto border-[#8e8e8e] py-7">
        <LogoWithText text={"회원가입"} />
        <form
          className="flex flex-col items-center justify-center font-bold"
          onSubmit={onSubmitSignUp}
        >
          <div className="flex items-center justify-between mb-6 w-80">
            <input
              type="text"
              id="id"
              className="w-80 h-12 rounded bg-[#EBEBEB] cursor-text p-4"
              placeholder="아이디"
              {...userId}
            />
          </div>
          <div className="flex items-center justify-between mb-6 w-80">
            <input
              type="password"
              id="password"
              className="w-80 h-12 rounded bg-[#EBEBEB] cursor-text p-4"
              placeholder="비밀번호"
              value={valuePwFirst}
              onChange={onChangePwFirst}
            />
          </div>
          <div className="flex items-center justify-between mb-4 w-80">
            <input
              type="password"
              id="passwordCheck"
              className="w-80 h-12 rounded bg-[#EBEBEB] cursor-text p-4"
              placeholder="비밀번호 확인"
              value={valuePwSecond}
              onChange={onChangePwSecond}
            />
          </div>
          <div className="w-full h-auto min-h-[2rem] flex justify-center items-center text-red-500">
            {notice}
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
