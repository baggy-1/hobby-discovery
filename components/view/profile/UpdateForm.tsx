import { css } from "@emotion/react";
import { borderRadius, cursorPoint } from "components/common/styles";
import { authInstance } from "config/instance";
import { REG_NUMBER, REG_PW } from "config/regexp";
import { MAIN_COLOR } from "config/styles";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import Image from "next/image";
import Edit from "public/asset/svg/Edit";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Address from "components/view/profile/Address";
import { formWrapper, Input, InputBox } from "../signup/SignUpForm";
import { useRouter } from "next/router";

const defaultProfile = "/asset/image/default-profile.jpg";

const UpdateForm = () => {
  const router = useRouter();
  const { user } = useUser();
  const addressArr = user?.address.split("@%");
  const [profile, setProfile] = useState(user?.profile || defaultProfile);
  const [formData, setFormData] = useState<FormData | null>(null);
  const nickname = useInput(undefined, user?.nickname || "");
  const password = useInput(REG_PW);
  const passwordCheck = useInput();
  const number = useInput(REG_NUMBER, user?.number || "");
  const [addressValue, setAddressValue] = useState(
    addressArr ? addressArr[0] : ""
  );
  const addressDetail = useInput(undefined, addressArr ? addressArr[1] : "");

  useEffect(() => {
    const data = new FormData();
    setFormData(data);
  }, []);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      formData?.append("profile", files[0]);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfile(reader.result);
        }
      };
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!formData) return;

    let updatePW = user.password;
    if (password.value !== "") {
      if (!password.isvalid) {
        alert("비밀번호 조건을 확인해주세요");
        return;
      }

      if (password.value !== passwordCheck.value) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      updatePW = password.value;
    }

    let updateNumber = user.number;
    if (number.value !== "") {
      if (!number.value.match(REG_NUMBER)) {
        alert("전화번호를 확인해주세요");
        return;
      }
      updateNumber = number.value;
    }

    formData.append("password", updatePW);
    formData.append("nickname", nickname.value || user.nickname);
    formData.append("number", updateNumber);
    formData.append("address", `${addressValue}@%${addressDetail.value}`);

    try {
      authInstance.patch("/user/update", formData).then((res) => {
        alert("회원정보가 수정되었습니다.");
        router.push("/profile");
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  };

  return (
    <form css={formWrapper} onSubmit={onSubmit}>
      <label htmlFor="file">
        <div css={S_profile}>
          <Image
            src={profile}
            alt={"profile"}
            width={100}
            height={100}
            css={[borderRadius("50%"), cursorPoint]}
          />
          <div css={edit}>
            <Edit />
          </div>
        </div>
      </label>
      <input type="file" id="file" hidden onChange={onChangeFile} />
      <div css={[InputBox, borderRadius("0.25rem")]}>
        <label css={label}>닉네임</label>
        <input
          css={Input}
          type="text"
          placeholder="닉네임"
          value={nickname.value}
          onChange={nickname.onChange}
        />
      </div>
      <div css={[InputBox, borderRadius("0.25rem")]}>
        <label css={label}>비밀번호</label>
        <input
          css={[Input]}
          type="password"
          placeholder={"영소문자, 대문자, 숫자, 특수문자 조합 8자리 이상"}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <div css={[InputBox, borderRadius("0.25rem")]}>
        <label css={label}>비밀번호 확인</label>
        <input
          css={[Input]}
          type="password"
          placeholder={"영소문자, 대문자, 숫자, 특수문자 조합 8자리 이상"}
          value={passwordCheck.value}
          onChange={passwordCheck.onChange}
        />
      </div>
      <div css={[InputBox, borderRadius("0.25rem")]}>
        <label css={label}>연락처</label>
        <input
          css={[Input]}
          type="text"
          placeholder={`"-" 없이 숫자만 입력해주세요`}
          value={number.value}
          onChange={number.onChange}
        />
      </div>
      <Address
        value={addressValue}
        setValue={setAddressValue}
        detail={addressDetail}
      />
      <button type="submit" css={[button, borderRadius("0.25rem")]}>
        수정 완료
      </button>
    </form>
  );
};

export default UpdateForm;

const button = css({
  marginTop: "1rem",
  width: "20rem",
  height: "3rem",
  backgroundColor: MAIN_COLOR,
  color: "white",
  fontSize: "1.2rem",
  fontWeight: "700",
});

const S_profile = css({
  position: "relative",
});

const edit = css({
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "2rem",
  height: "2rem",
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const label = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// export const input = css({
//   padding: "0.5rem 1rem",
//   "&::placeholder": {
//     fontSize: "0.75rem",
//   },
// });

// export const inputBox = css({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   gap: "1rem",
//   width: "20rem",
//   height: "3rem",
// });

const form = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "auto",
  maxWidth: "80rem",
  paddingTop: "2rem",
});
