import Card from "components/view/store/Card";
import { KitItem } from "types";
import { withRouter } from "next/router";
import useSWR from "swr";
import { css } from "@emotion/react";
import { mq } from "config/styles";
import Chevron from "public/asset/svg/Chevron";
import { useRef, useState } from "react";

const ProdSwiper = () => {
  const { data } = useSWR<KitItem[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/main/hobby`
  );
  const [move, setMove] = useState(0);
  const refWrap = useRef<HTMLDivElement>(null);

  const onClickMove = (direction: "left" | "right") => {
    if (!refWrap.current) return;
    const { scrollWidth, clientWidth } = refWrap.current;
    const maxMove = scrollWidth - clientWidth;
    const moveSize = 500;

    if (direction === "left") {
      if (move - moveSize <= 0) {
        setMove(0);
        return;
      } else {
        setMove(move - moveSize);
        return;
      }
    } else if (direction === "right") {
      if (move + moveSize >= maxMove) {
        setMove(maxMove);
        return;
      } else {
        setMove(move + moveSize);
        return;
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div css={prodWrapper}>
        <div css={chevronBox("left")} onClick={() => onClickMove("left")}>
          <div css={chevron("left")}>
            <Chevron />
          </div>
        </div>
        <div css={imageWrap(move)} ref={refWrap}>
          {data
            ?.sort(({ pd_create: a }, { pd_create: b }) => {
              return new Date(a).getTime() - new Date(b).getTime();
            })
            .slice(0, 8)
            .map((kitItem) => (
              <Card key={kitItem.pd_id} kitItem={kitItem} />
            ))}
        </div>
        <div css={chevronBox("right")} onClick={() => onClickMove("right")}>
          <div css={chevron("right")}>
            <Chevron />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ProdSwiper);

const imageWrap = (move: number) =>
  css({
    display: "flex",
    gap: "1rem",
    width: "100%",
    transform: `translateX(-${move}px)`,
    transitionDuration: "0.5s",
  });

const chevronBox = (direction: "left" | "right") =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "100%",
    position: "absolute",
    backgroundColor: "#EDEDED",
    opacity: "0.6",
    top: "0",
    left: direction === "left" ? "0" : "auto",
    right: direction === "right" ? "0" : "auto",
    zIndex: "1",
    cursor: "pointer",
    [mq[1]]: {
      display: "none",
    },
  });

const chevron = (direction: "left" | "right") =>
  css({
    position: "absolute",
    top: "50%",
    left: direction === "left" ? "0" : "auto",
    right: direction === "right" ? "0" : "auto",
    transform: `translateY(-50%) ${
      direction === "left" ? "rotate(90deg)" : "rotate(270deg)"
    }`,
    width: "2rem",
    height: "2rem",
    cursor: "pointer",
  });

const prodWrapper = css({
  position: "relative",
  width: "100%",
  height: "auto",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  overflowX: "hidden",
  justifyContent: "start",
  [mq[2]]: {
    width: "90%",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    MsOverflowStyle: "none",
    "::-webkit-Scrollbar": {
      display: "none",
    },
  },
});
