import { css } from "@emotion/react";
import { mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Slider = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const length = 3;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIndex((prev) => (prev >= length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div css={container}>
        <div css={sliderWrapper}>
          <div css={wrapper(index, length)}>
            <div
              css={slide("#FFFFFF")}
              onClick={() => router.push("/store/list/popular")}
            >
              <Image
                src={`/asset/image/banner/banner-11-hot-kit.png`}
                alt={`slide`}
                width={1280}
                height={500}
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
                height={500}
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
                height={500}
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
