import { css } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  return (
    <div css={profile} onClick={() => router.push("/profile")}>
      <Image
        src="/asset/image/default-profile.jpg"
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
  marginRight: "1rem",
  cursor: "pointer",
});
