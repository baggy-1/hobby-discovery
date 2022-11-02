import Card from "components/view/store/Card";
import { KitItem, KitItemWithPage } from "types";
import { withRouter } from "next/router";
import useSWR from "swr";
import { css } from "@emotion/react";
import { mq } from "config/styles";
import Chevron from "public/asset/svg/Chevron";
import { useRef, useState } from "react";

interface Props {
  query: string;
}

const ProdSwiper = ({ query }: Props) => {
  const { data } = useSWR<KitItemWithPage>(
    `/main/hobby?order=${query}&items=10&page=1`
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
          {data?.result.map((kitItem) => (
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

export default ProdSwiper;

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
    height: "300px",
    position: "absolute",
    backgroundColor: "#EDEDED",
    opacity: "0.6",
    top: "0",
    left: direction === "left" ? "0" : "auto",
    right: direction === "right" ? "0" : "auto",
    zIndex: "1",
    cursor: "pointer",
    [mq[2]]: {
      display: "none",
    },
  });

const chevron = (direction: "left" | "right") =>
  css({
    position: "absolute",
    top: "50%",
    left: direction === "left" ? "0" : "0",
    right: direction === "right" ? "0" : "0",
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
  maxWidth: "80rem",
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
