import { css } from "@emotion/react";
import useUser from "hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";

const defaultProfile = "/asset/image/default-profile.jpg";

const Profile = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div css={profile} onClick={() => router.push("/profile")}>
      <Image
        src={user?.profile || defaultProfile}
        alt="profile"
        width={32}
        height={32}
        css={rounded}
      />
    </div>
  );
};

export default Profile;

const rounded = css({
  borderRadius: "50%",
});

const profile = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "2rem",
  height: "2rem",
});
