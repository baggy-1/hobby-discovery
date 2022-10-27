import { css } from "@emotion/react";
import {
  borderRadius,
  hoverScale,
  hoverTranslateY,
  Text,
} from "components/common/styles";
import { mq } from "config/styles";
import Image from "next/image";

const SUB_ITEM = [
  {
    title: "프리미엄 키트",
    price: 19900,
    image: "/asset/image/main-image.png",
  },
  {
    title: "프리미엄 플러스 키트",
    price: 39900,
    image: "/asset/image/main-image.png",
  },
];

const MainSection = () => {
  return (
    <section css={section}>
      <div css={container}>
        <div css={titleBox}>
          <h1 css={Text("1.3rem", "600", "#000000")}>
            한 달에 한 번, 찾아오는 취미 박스
          </h1>
          <h1 css={Text("1.4rem", "700", "#000000")}>
            궁금한 박스를 구독해보세요
          </h1>
        </div>
        <div css={kitWrapper}>
          <div css={kitBox}>
            {SUB_ITEM.map((item) => (
              <div css={imageBox} key={item.title}>
                <Image
                  src={item.image}
                  alt={`subscription-kit-${item.title}`}
                  width={250}
                  height={300}
                  objectFit="cover"
                  css={[borderRadius("0.5rem")]}
                />
                <div css={[descBox, hoverScale]}>
                  <h2 css={Text("1.25rem", "700", "#000000")}>{item.title}</h2>
                  <h2 css={Text("1rem", "500", "#000000")}>
                    {`월 ${item.price.toLocaleString("ko-KR")}원`}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;

const descBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "14rem",
  height: "6rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "0.5rem",
  position: "absolute",
  bottom: "-4rem",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
});

const imageBox = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  position: "relative",
  cursor: "pointer",
  width: "250px",
  height: "300px",
  [mq[1]]: {
    scrollSnapAlign: "center",
  },
});

const kitBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "4rem",
});

const kitWrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  [mq[1]]: {
    padding: "0 2rem",
    width: "100%",
    height: "calc(300px + 4rem + 20px)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    MsOverflowStyle: "none",
    "::-webkit-Scrollbar": {
      display: "none",
    },
  },
});

const titleBox = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  width: "100%",
  gap: "1rem",
  padding: "4rem 0",
  paddingBottom: "8rem",
  height: "auto",
  maxWidth: "80rem",
  [mq[1]]: {
    paddingBottom: "4rem",
  },
});

const section = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#EBEBEB",
});
