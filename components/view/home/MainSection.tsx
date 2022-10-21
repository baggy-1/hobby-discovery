import { css } from "@emotion/react";
import { MAIN_COLOR } from "config/styles";
import { mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";

const MainSection = () => {
  const router = useRouter();

  return (
    <>
      <div css={section}>
        <div css={wrapper}>
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
                <div css={buttonBox}>
                  <div css={button(MAIN_COLOR, "#FFFFFF")}>
                    지금 바로 구독하기
                  </div>
                  <div
                    css={button("#FFFFFF", MAIN_COLOR)}
                    onClick={() => router.push("/store")}
                  >
                    스토어 구경하기
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={backWrapper}>
            <div css={back}>
              <Image
                src={`/asset/image/main-image.png`}
                alt={`main`}
                layout={`fill`}
              />
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
  [mq[2]]: {
    alignItems: "center",
  },
});

const button = (backgroundColor: string, color: string) =>
  css({
    backgroundColor,
    color,
    width: "10rem",
    height: "2.6rem",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    cursor: "pointer",
    border: "1px solid",
  });

const buttonBox = css({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "1rem",
});

const h1 = css({
  textAlign: "center",
  fontWeight: "700",
  fontSize: "1.5rem",
  color: MAIN_COLOR,
  [mq[2]]: {
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
    textAlign: "center",
  },
  [mq[1]]: {
    fontSize: "2rem",
  },
  [mq[0]]: {
    fontSize: "1.5rem",
  },
});

const span = css({
  width: "fit-content",
  height: "auto",
  [mq[2]]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
});

const backWrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  zIndex: "-1",
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
  [mq[2]]: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    paddingLeft: "0",
    gap: "1rem",
  },
});

const back = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const wrapper = css({
  position: "relative",
  display: "flex",
  width: "100%",
  maxWidth: "80rem",
  height: "100%",
  [mq[2]]: {
    flexDirection: "column-reverse",
  },
});

const section = css({
  position: "relative",
  widht: "100%",
  height: "80vh",
  maxHeight: "40rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
