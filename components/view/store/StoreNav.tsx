import { css } from "@emotion/react";
import { useRouter } from "next/router";

const StoreNav = () => {
  const router = useRouter();

  return (
    <>
      <div css={wrapper}>
        <ul css={ul}>
          <li>전체상품</li>
          <li>신상품</li>
          <li>인기상품</li>
          <li onClick={() => router.push("/subscription")}>구독하기</li>
        </ul>
      </div>
    </>
  );
};

export default StoreNav;

const ul = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  width: "100%",
  maxWidth: "80rem",
  height: "3rem",
  gap: "1rem",
  paddingLeft: "1rem",
  fontWeight: "600",
  li: {
    cursor: "pointer",
  },
});

const wrapper = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderTop: "2px solid #e5e5e5",
});
