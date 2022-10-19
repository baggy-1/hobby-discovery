import { css } from "@emotion/react";
import { MAIN_COLOR } from "config/styles";
import { mq } from "config/styles";
import Image from "next/image";
import { section } from "components/view/home/styles";

const MainSection = () => {
  return (
    <>
      <div css={section}>
        <div css={backWrapper}>
          <div css={back}>
            <Image
              src={`/asset/image/main-image.png`}
              alt={`main`}
              layout={`fill`}
            />
          </div>
        </div>
        <div css={textWrapper}>
          <div css={textBox}>
            <span css={span}>
              <h1 css={h1}>C</h1>
              <h1 css={h1}>H</h1>
              <h1 css={h1}>I</h1>
              <h1 css={h1}>H</h1>
              <h1 css={h1}>A</h1>
              <h1 css={h1}>M</h1>
            </span>
            <div css={underBox}>
              <span css={underSpan}>
                매달, 문 앞에 <br />
                취미 박스가 찾아와요
              </span>
              <div css={button}>지금 바로 구독하기</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;

const underBox = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  [mq[1]]: {
    alignItems: "center",
  },
});

const button = css({
  width: "10rem",
  height: "2.6rem",
  backgroundColor: MAIN_COLOR,
  borderRadius: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#FFFFFF",
  fontWeight: "700",
  cursor: "pointer",
});

const h1 = css({
  textAlign: "center",
  fontWeight: "700",
  fontSize: "1.5rem",
  color: MAIN_COLOR,
  [mq[1]]: {
    fontSize: "2.4rem",
  },
});

const underSpan = css({
  fontWeight: "700",
  fontSize: "3.5rem",
  [mq[3]]: {
    fontSize: "3rem",
  },
  [mq[2]]: {
    fontSize: "2.5rem",
  },
  [mq[1]]: {
    fontSize: "2rem",
    textAlign: "center",
  },
  [mq[0]]: {
    fontSize: "1.5rem",
  },
});

const span = css({
  width: "fit-content",
  height: "auto",
  [mq[1]]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
});

const backWrapper = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  zIndex: "-1",
  [mq[1]]: {
    height: "40%",
    position: "relative",
  },
});

const textWrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const textBox = css({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  maxWidth: "80rem",
  height: "60%",
  wordBreak: "keep-all",
  gap: "3rem",
  paddingLeft: "5rem",
  [mq[1]]: {
    height: "60%",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    paddingLeft: "0",
    gap: "1rem",
  },
});

const back = css({
  width: "60%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  maxWidth: "90rem",
  [mq[4]]: {
    width: "70%",
  },
  [mq[3]]: {
    width: "80%",
  },
  [mq[2]]: {
    width: "90%",
  },
  [mq[1]]: {
    width: "100%",
  },
});
