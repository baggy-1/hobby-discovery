import { css } from "@emotion/react";
import { borderRadius } from "components/common/styles";
import { MAIN_COLOR } from "config/styles";
import useUser from "hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";

const ProfileView = () => {
  const { user, loading, error } = useUser();
  const router = useRouter();

  if (error) {
    router.replace("/login");
    return <div>정보 가져오기 실패... 잠시 후 로그인 화면으로 이동됩니다</div>;
  }

  if (!user || loading) return <div>정보 가져오는 중...</div>;

  const { username, profile, nickname } = user;

  return (
    <>
      <div css={container}>
        <div css={userBox}>
          <div>
            <Image
              src={profile || "/asset/image/default-profile.jpg"}
              alt="user-profile"
              width={128}
              height={128}
              css={borderRadius("50%")}
            />
          </div>
          <div css={nameBox}>
            <span css={h1}>{nickname}</span>
            <span css={h2}>{username}</span>
          </div>
        </div>
        <div css={updateButton} onClick={() => router.push("/profile/update")}>
          내 정보 수정
        </div>
      </div>
    </>
  );
};

export default ProfileView;

const nameBox = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const h2 = css({
  fontSize: "1.2rem",
});

const h1 = css({
  fontSize: "1.5rem",
  fontWeight: "700",
});

const updateButton = css({
  backgroundColor: MAIN_COLOR,
  width: "18rem",
  height: "3rem",
  borderRadius: "0.25rem",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "700",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const userBox = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});

const container = css({
  width: "100%",
  height: "calc(100vh - 4rem - 5rem)",
  paddingTop: "3.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: "2rem",
});
