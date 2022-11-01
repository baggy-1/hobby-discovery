import { css } from "@emotion/react";
import Loading from "components/common/Loading";
import Seo from "components/Seo";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import UpdateForm from "./UpdateForm";

const UpdateUserView = () => {
  const router = useRouter();
  const { user, loading, error } = useUser();

  if (loading) return <Loading />;
  if (error) {
    router.replace("/auth/login");
    return <div>에러 발생...</div>;
  }

  return (
    <>
      <Seo title={`내정보 수정 | ${user?.nickname} | `} />
      <div css={wrapper}>
        <UpdateForm />
      </div>
    </>
  );
};

export default UpdateUserView;

const wrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  height: "calc(100vh - 4rem - 5rem)",
});
