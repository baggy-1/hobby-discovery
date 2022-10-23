import { css } from "@emotion/react";
import { borderRadius, cursorPoint, Text } from "components/common/styles";
import { CartAction } from "config/reducer";
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
  const defaultImage = "/asset/image/main-image.png";

  const onClickDetail = (id: string) => () => {
    router.push(`/store/product/${id}`);
  };

  const onClickAdd = (kitItem: KitItem) => () => {
    dispatch({ type: "ADD", kitItem });
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
            <label
              htmlFor={`checkbox${pd_id}`}
              // onClick={onClickCheck(kitItem)}
            ></label>
          </div>
          {images[0] && (
            <div
              onClick={onClickDetail(pd_id)}
              css={[cursorPoint, image, borderRadius("0.25rem")]}
            >
              <Image
                src={images[0].image || defaultImage}
                alt={"product"}
                width={150}
                height={150}
                css={borderRadius("0.25rem")}
              />
            </div>
          )}
        </div>
        <div css={titleBox}>
          <div css={Text("0.9rem", "500", "#8E8E8E")}>{pd_sell}</div>
          <div
            onClick={onClickDetail(pd_id)}
            css={[cursorPoint, Text("1.25rem", "700", "#000000")]}
          >
            {pd_title}
          </div>
          <div css={Text("0.75rem", "500", "#8E8E8E")}>{pd_descrition}</div>
        </div>
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
            <button onClick={onClickDec(kitItem)} css={button}>{`-`}</button>
            <div css={Count}>{count}</div>
            <button onClick={onClickAdd(kitItem)} css={button}>{`+`}</button>
          </div>
        </div>
        <button onClick={onClickDel(kitItem)} css={delButton}>
          <Close />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

const delButton = css({
  width: "2.5rem",
  height: "2.5rem",
});

const Count = css({
  width: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  border: "1px solid #000000",
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
  border: "2px solid #000000",
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
    color: "#000000",
    fontSize: "1.5rem",
    fontWeight: "500",
    width: "2rem",
    height: "2rem",
    textAlign: "center",
    position: "absolute",
    top: "0",
    left: "0",
  },
});

const image = css({
  width: "150px",
  height: "150px",
});

const leftWrapper = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const leftBox = css({
  display: "flex",
  gap: "1rem",
});

const priceBox = css({
  textAlign: "center",
  gap: "1rem",
  height: "100%",
});

const titleBox = css({
  width: "auto",
  height: "100%",
});

const wrapper = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "60rem",
  height: "100%",
});

const button = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#EBEBEB",
  width: "1.5rem",
  height: "1.5rem",
  border: "1px solid #000",
  fontWeight: "500",
});

const rightBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  gap: "2rem",
});
