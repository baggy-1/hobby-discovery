import { css } from "@emotion/react";
import {
  borderRadius,
  cursorPoint,
  MobileDisplayNone,
  Text,
} from "components/common/styles";
import { DEFAULT_IMAGE } from "config/data";
import { CartAction } from "config/reducer";
import { mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import { Dispatch } from "react";
import { KitItem } from "types";

interface Props {
  cartItem: {
    kitItem: KitItem;
    count: number;
    checked: boolean;
  };
  dispatch: Dispatch<CartAction>;
}

const CartItem = ({ cartItem, dispatch }: Props) => {
  const { kitItem, count, checked } = cartItem;
  const router = useRouter();
  const { pd_id, pd_price, images, pd_title, pd_descrition, pd_sell } = kitItem;

  const onClickDetail = (id: string) => () => {
    router.push(`/store/product/${id}`);
  };

  const onClickInc = (kitItem: KitItem) => () => {
    dispatch({ type: "INC", kitItem });
  };

  const onClickDec = (kitItem: KitItem) => () => {
    dispatch({ type: "DEC", kitItem });
  };

  const onClickDel = (kitItem: KitItem) => () => {
    dispatch({ type: "DEL", kitItem });
  };

  const onClickCheck = (kitItem: KitItem) => () => {
    dispatch({ type: "CHECK", kitItem });
  };

  return (
    <div css={wrapper}>
      <div css={leftBox}>
        <div css={leftWrapper}>
          <div css={checkbox}>
            <input
              type="checkbox"
              id={`checkbox${pd_id}`}
              css={inputCheck}
              checked={checked}
              onChange={onClickCheck(kitItem)}
            />
            <label htmlFor={`checkbox${pd_id}`}></label>
          </div>
          {images[0] && (
            <div
              onClick={onClickDetail(pd_id)}
              css={[cursorPoint, image, borderRadius("0.25rem")]}
            >
              <Image
                src={images[0].image || DEFAULT_IMAGE}
                alt={"product"}
                width={150}
                height={150}
                css={borderRadius("0.25rem")}
              />
            </div>
          )}
        </div>
        <div css={titleBox}>
          <div css={[Text("0.9rem", "500", "#8E8E8E"), MobileDisplayNone]}>
            {pd_sell}
          </div>
          <div
            onClick={onClickDetail(pd_id)}
            css={[cursorPoint, Text("1.25rem", "700", "#000000")]}
          >
            {pd_title}
          </div>
          <div css={[Text("0.75rem", "500", "#8E8E8E"), MobileDisplayNone]}>
            {pd_descrition}
          </div>
        </div>
        <button onClick={onClickDel(kitItem)} css={[MobDelButton]}>
          <Close />
        </button>
      </div>
      <div css={rightBox}>
        <div css={priceBox}>
          <div css={Text("1rem", "600", "#000000")}>예상 금액</div>
          <div css={Text("1.1rem", "700", "#000000")}>
            {(pd_price * count).toLocaleString("ko-KR")}원
          </div>
        </div>
        <div css={countWrapper}>
          <div css={Text("1rem", "600", "#000000")}>수량</div>
          <div css={CountBox}>
            <button
              onClick={onClickDec(kitItem)}
              css={button("left")}
            >{`-`}</button>
            <div css={Count}>{count}</div>
            <button
              onClick={onClickInc(kitItem)}
              css={button("right")}
            >{`+`}</button>
          </div>
        </div>
        <button
          onClick={onClickDel(kitItem)}
          css={[delButton, MobileDisplayNone]}
        >
          <Close />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

const MobDelButton = css({
  display: "none",
  [mq[1]]: {
    position: "absolute",
    top: "0",
    right: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
  },
});

const delButton = css({
  width: "2.5rem",
  height: "2.5rem",
});

const Count = css({
  width: "auto",
  padding: "0 10px",
  minWidth: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  border: "1px solid #E5E5E5",
  borderLeft: "none",
  borderRight: "none",
  fontSize: "1rem",
  fontWeight: "700",
});

const countWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const CountBox = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const inputCheck = css({
  display: "none",
});

const checkbox = css({
  width: "2.5rem",
  height: "2.5rem",
  backgroundColor: "#FFFFFF",
  border: "2px solid #E5E5E5",
  borderRadius: "0.25rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  label: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderRadius: "0.25rem",
    position: "relative",
    cursor: "pointer",
  },
  "input:checked + label::after": {
    content: "'✓'",
    color: "#999999",
    fontSize: "1.5rem",
    fontWeight: "500",
    width: "100%",
    height: "100%",
    textAlign: "center",
    position: "absolute",
    top: "0",
    left: "0",
    [mq[1]]: {
      fontSize: "1.25rem",
      top: "-0.25rem",
    },
  },
  [mq[1]]: {
    width: "1.5rem",
    height: "1.5rem",
  },
});

const image = css({
  width: "150px",
  height: "150px",
  [mq[1]]: {
    width: "100px",
    height: "100px",
  },
});

const leftWrapper = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const leftBox = css({
  position: "relative",
  width: "100%",
  display: "flex",
  gap: "1rem",
});

const priceBox = css({
  textAlign: "center",
  gap: "1rem",
});

const titleBox = css({
  width: "auto",
  height: "100%",
  [mq[1]]: {
    width: "9rem",
  },
});

const wrapper = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "60rem",
  height: "100%",
  [mq[1]]: {
    flexDirection: "column",
    paddingBottom: "1rem",
    alignItems: "flex-start",
    gap: "1rem",
    overflowX: "hidden",
    padding: "0 1rem",
  },
});

const button = (type: "left" | "right") =>
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    width: "1.5rem",
    height: "1.5rem",
    border: "1px solid #E5E5E5",
    fontWeight: "500",
    borderRadius:
      type === "left" ? "0.25rem 0 0 0.25rem" : "0 0.25rem 0.25rem 0",
  });

const rightBox = css({
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  gap: "2rem",
  width: "100%",
  [mq[1]]: {
    alignItems: "center",
    paddingRight: "1rem",
  },
});
