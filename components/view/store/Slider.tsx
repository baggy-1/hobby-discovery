import { css } from "@emotion/react";
import { mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import Chevron from "public/asset/svg/Chevron";
import { useEffect, useState } from "react";

const length = 3;

const Slider = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const onClickBannerPage = (type: "left" | "right") => () => {
    if (type === "left") {
      if (index <= 0) {
        setIndex(length - 1);
      } else {
        setIndex(index - 1);
      }
    } else {
      if (index === length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIndex((prev) => (prev >= length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div css={container}>
        <div css={sliderWrapper}>
          <div css={chevron("left")} onClick={onClickBannerPage("left")}>
            <Chevron />
          </div>
          <div css={chevron("right")} onClick={onClickBannerPage("right")}>
            <Chevron />
          </div>
          <div css={wrapper(index, length)}>
            <div
              css={slide("#FFFFFF")}
              onClick={() => router.push("/store/list/popular")}
            >
              <Image
                src={`/asset/image/banner/banner-11-hot-kit.png`}
                alt={`slide`}
                width={1280}
                height={530}
                priority={true}
              />
            </div>
            <div
              css={slide("#FFFFFF")}
              onClick={() => router.push("/store/list/new")}
            >
              <Image
                src={`/asset/image/banner/banner-pet-event.png`}
                alt={`slide`}
                width={1280}
                height={530}
                priority={true}
              />
            </div>
            <div
              css={slide("#FFFFFF")}
              onClick={() => router.push("/subscription")}
            >
              <Image
                src={`/asset/image/banner/banner-sub-desc.png`}
                alt={`slide`}
                width={1280}
                height={530}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;

const chevron = (type: "left" | "right") =>
  css({
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    left: type === "left" ? "1rem" : "unset",
    right: type === "right" ? "1rem" : "unset",
    transform: `translateY(-50%) ${
      type === "left" ? "rotate(90deg)" : "rotate(270deg)"
    } scale(1.5)`,
    color: "#999999",
    zIndex: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [mq[1]]: {
      transform: `translateY(-50%) ${
        type === "left" ? "rotate(90deg)" : "rotate(270deg)"
      }`,
      left: type === "left" ? "0" : "unset",
      right: type === "right" ? "0" : "unset",
    },
  });

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
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  });

const wrapper = (index: number, length: number) =>
  css({
    position: "relative",
    width: `calc(100% * ${length})`,
    height: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    transform: `translateX(-${(100 / length) * index}%)`,
    transition: "transform 0.5s ease-in-out",
  });
