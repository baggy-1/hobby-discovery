import { css } from "@emotion/react";

const Loading = () => {
  return (
    <div css={section}>
      <div>로딩중...</div>
    </div>
  );
};

export default Loading;

const section = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "calc(100vh - 9rem)",
});
