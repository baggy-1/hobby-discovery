import { css } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const length = 4;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIndex((prev) => (prev >= length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div css={container}>
        <div css={sliderWrapper}>
          <div css={wrapper(index, length)}>
            <div css={slide("#FFFFFF")}>
              <Image
                src={`/asset/image/main-image.png`}
                alt={`slide`}
                layout={"fill"}
                priority={true}
              />
            </div>
            <div css={slide("#F2F2F2")}></div>
            <div css={slide("#000000")}></div>
            <div css={slide("#E2E2E2")}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;

const sliderWrapper = css({
  position: "relative",
  width: "100%",
  maxWidth: "80rem",
  overflowX: "hidden",
});

const container = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const slide = (backgroundColor: string) =>
  css({
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor,
  });

const wrapper = (index: number, length: number) =>
  css({
    position: "relative",
    width: `calc(100% * ${length})`,
    height: "30rem",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    transform: `translateX(-${(100 / length) * index}%)`,
    transition: "transform 0.5s ease-in-out",
  });
