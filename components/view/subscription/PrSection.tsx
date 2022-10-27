import { css } from "@emotion/react";
import { Center, Text } from "components/common/styles";
import { MAIN_COLOR, mq } from "config/styles";
import Image from "next/image";

const DESC_IMAGES = [
  "/asset/image/main-image.png",
  "/asset/image/main-image.png",
  "/asset/image/main-image.png",
  "/asset/image/main-image.png",
  "/asset/image/main-image.png",
];

const PrSection = () => {
  return (
    <section css={section}>
      <div css={wrapper}>
        <div css={titleBox}>
          <h1 css={[Text("1.5rem", "600", MAIN_COLOR), title]}>
            <span css={Center("row")}>
              <span css={Text("2rem", "700", MAIN_COLOR)}>CHIHAM</span>을
            </span>
            <span>구독해야 하는 이유</span>
          </h1>
        </div>
        <div css={imageWrapper}>
          {DESC_IMAGES.map((image, index) => (
            <div css={imageBox} key={index}>
              <Image
                src={image}
                alt="description-chiham"
                width={800}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrSection;

const title = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  [mq[0]]: {
    flexDirection: "column",
    gap: "0",
  },
});

const imageWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
});

const titleBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  letterSpacing: "0.1rem",
});

const imageBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  maxWidth: "1000px",
  maxHeight: "700px",
});

const wrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});

const section = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "2rem 0",
});
