import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import useInput from "hooks/useInput";
import { useRouter } from "next/router";
import { instance } from "config/instance";
import { REG_ID, REG_PW } from "config/regexp";
import { css } from "@emotion/react";
import { mq } from "config/styles";

const SignUpForm = () => {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const userId = useInput(REG_ID);
  const {
    value: valuePwFirst,
    onChange: onChangePwFirst,
    isvalid: isvalidPwFirst,
  } = useInput(REG_PW);
  const { value: valuePwSecond, onChange: onChangePwSecond } = useInput();

  const onSubmitSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmpty = [userId.value, valuePwFirst, valuePwSecond].some(
      (value) => value === ""
    );

    if (isEmpty) {
      setNotice("아이디와 비밀번호를 입력해주세요");
      return;
    }

    if (!userId.isvalid) {
      setNotice(
        `아이디는 영문자와 숫자만 입력 가능합니다
        (8~24자)`
      );
      return;
    }

    if (!isvalidPwFirst) {
      setNotice(
        "비밀번호는 영소문자, 대문자, 숫자, 특수문자 조합입니다 (8자 이상)"
      );
      return;
    }

    if (valuePwFirst !== valuePwSecond) {
      setNotice("비밀번호가 서로 다릅니다");
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
    <form css={formWrapper} onSubmit={onSubmitSignUp}>
      <div css={InputBox}>
        <label>아이디</label>
        <input
          type="text"
          id="id"
          css={[Input]}
          placeholder="영문, 숫자 조합 8~24자"
          value={userId.value}
          onChange={userId.onChange}
        />
      </div>
      <div css={InputBox}>
        <label>비밀번호</label>
        <input
          type="password"
          id="password"
          css={[Input]}
          placeholder="영소문자, 대문자, 숫자, 특수문자 조합 8자리 이상"
          value={valuePwFirst}
          onChange={onChangePwFirst}
        />
      </div>
      <div css={InputBox}>
        <label>비밀번호 확인</label>
        <input
          type="password"
          id="passwordCheck"
          css={[Input]}
          placeholder="영소문자, 대문자, 숫자, 특수문자 조합 8자리 이상"
          value={valuePwSecond}
          onChange={onChangePwSecond}
        />
      </div>
      <div className="w-full h-auto min-h-[2rem] flex justify-center items-center text-red-500 mb-6">
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

export const Input = css({
  width: "16.4rem",
  height: "3rem",
  borderRadius: "0.25rem",
  backgroundColor: "#EBEBEB",
  cursor: "text",
  padding: "0 1rem",
  fontSize: "1rem",
  "&::placeholder": {
    fontSize: "0.75rem",
  },
  [mq[1]]: {
    width: "14rem",
  },
});

export const InputBox = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "3rem",
  [mq[1]]: {
    padding: "0 1rem",
  },
});

export const formWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  gap: "1rem",
  width: "100%",
  height: "auto",
  maxWidth: "24rem",
});
