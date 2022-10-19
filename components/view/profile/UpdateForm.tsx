import { css } from "@emotion/react";
import { borderRadius, cursorPoint } from "components/common/styles";
import { MAIN_COLOR } from "config/styles";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import Image from "next/image";
import Edit from "public/asset/svg/Edit";
import { ChangeEvent, useState } from "react";

const UpdateForm = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(
    user?.profile || "/asset/image/default-profile.jpg"
  );
  const nickname = useInput(undefined, user?.nickname || "");
  const password = useInput();
  const passwordCheck = useInput();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfile(reader.result);
        }
      };
    }
  };

  return (
    <form css={form}>
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
      <div css={[inputBox, borderRadius("0.25rem")]}>
        <label css={label}>닉네임</label>
        <input css={input} type="text" placeholder="닉네임" {...nickname} />
      </div>
      <div css={[inputBox, borderRadius("0.25rem")]}>
        <label css={label}>비밀번호</label>
        <input
          css={input}
          type="password"
          placeholder="비밀번호"
          {...password}
        />
      </div>
      <div css={[inputBox, borderRadius("0.25rem")]}>
        <label css={label}>확인</label>
        <input
          css={input}
          type="password"
          placeholder="비밀번호 확인"
          {...passwordCheck}
        />
      </div>
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

const label = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const input = css({
  padding: "1rem",
});

const inputBox = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  width: "20rem",
  height: "3rem",
});

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
