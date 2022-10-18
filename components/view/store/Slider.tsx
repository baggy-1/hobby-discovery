import { css } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div css={wrapper(index)}>
        <div css={slide}>
          <Image
            src={`/asset/image/main-image.png`}
            alt={`slide`}
            layout={"fill"}
            priority={true}
          />
        </div>
        <div css={slide}></div>
      </div>
    </>
  );
};

export default Slider;

const slide = css({
  position: "relative",
  width: "100vw",
  height: "100%",
  backgroundColor: "red",
});

const wrapper = (index: number) =>
  css({
    position: "relative",
    width: "calc(100vw * 2)",
    height: "20rem",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    transform: `translateX(-${index * 100}vw)`,
    transition: "transform 0.5s ease-in-out",
  });
