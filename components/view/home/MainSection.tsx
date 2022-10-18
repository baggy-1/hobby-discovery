import { css } from "@emotion/react";
import { mq } from "components/styles";
import Image from "next/image";

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

const section = css({
  position: "relative",
  width: "100%",
  height: "calc(100vh - 4rem)",
});

const backWrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  [mq[1]]: {
    height: "50%",
  },
});

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
  [mq[1]]: {
    position: "static",
  },
});

const back = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  maxWidth: "90rem",
});
