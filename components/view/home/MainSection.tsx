import { css } from "@emotion/react";
import { section } from "components/view/home/styles";

const MainSection = () => {
  return (
    <>
      <div css={section}>
        <div css={back}>
          <div css={leftBack}></div>
          <div css={rightBack}></div>
        </div>
        <div css={textBox}>
          <span>C H I H A M</span>
          <span>
            매달, 문 앞에 <br />
            취미 박스가 찾아와요
          </span>
        </div>
      </div>
    </>
  );
};

export default MainSection;

const textBox = css({
  position: "absolute",
  bottom: "20%",
  left: "0",
  width: "100%",
  padding: "0 2rem",
  wordBreak: "keep-all",
  span: {
    display: "block",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#000000",
    "&:nth-of-type(1)": {
      fontSize: "1.5rem",
      marginBottom: "2rem",
    },
  },
});

const back = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "0",
  left: "0",
});

const rightBack = css({
  width: "50%",
  height: "100%",
  backgroundColor: "#F2F2F2",
});

const leftBack = css({
  width: "50%",
  height: "100%",
  backgroundColor: "#FFFFFF",
});
