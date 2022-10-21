import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { instance } from "config/instance";

const SignUpForm = () => {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const userId = useInput(/^[a-zA-Z0-9]*$/gm);
  const { value: valuePwFirst, onChange: onChangePwFirst } = useInput(
    /^[a-zA-Z0-9~!@#$%^&*?]*$/gm
  );
  const { value: valuePwSecond, onChange: onChangePwSecond } = useInput();
  const nickname = useInput();

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

    const postData = {
      username: userId.value,
      password: valuePwFirst,
      nickname: `익명#${Date.now().toString().slice(-10)}`,
    };

    try {
      const { data } = await instance.post(`/user/signup`, postData);
      const {
        access_token: accessToken,
        access_exp: accessExp,
        refresh_token: refreshToken,
      } = data;
      document.cookie = `_hobby_at=${accessToken};`;
      document.cookie = `_hobby_ae=${accessExp};`;
      document.cookie = `_hobby_rt=${refreshToken};`;

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

  return (
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
  );
};

export default SignUpForm;

// file form data
// const [formData, setFormData] = useState<FormData | null>(null);

// const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
//     const { files } = event.currentTarget;
//     if (files) {
//       formData?.append("profile", files[0]);
//     }
//   };

// formData?.append("username", userId.value);
// formData?.append("password", valuePwFirst);
// formData?.append("nickname", nickname.value || `익명#${Date.now()}`);

// useEffect(() => {
//     const data = new FormData();
//     setFormData(data);
//   }, []);
