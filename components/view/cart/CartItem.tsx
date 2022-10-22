import { css } from "@emotion/react";
import { cursorPoint } from "components/common/styles";
import { CartAction } from "config/reducer";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch } from "react";
import { KitItem } from "types";

interface Props {
  cartItem: {
    kitItem: KitItem;
    count: number;
  };
  dispatch: Dispatch<CartAction>;
}

const CartItem = ({ cartItem, dispatch }: Props) => {
  const router = useRouter();
  const { kitItem, count } = cartItem;
  const { pd_id, pd_price, images, pd_title, pd_descrition } = kitItem;
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

  return (
    <div css={wrapper}>
      <div css={leftBox}>
        {images[0] && (
          <div onClick={onClickDetail(pd_id)} css={cursorPoint}>
            <Image
              src={images[0].image || defaultImage}
              alt={"product"}
              width={150}
              height={150}
            />
          </div>
        )}
        <div css={titleBox}>
          <div onClick={onClickDetail(pd_id)} css={[cursorPoint]}>
            {pd_title}
          </div>
          <div>{pd_descrition}</div>
        </div>
      </div>
      <div css={priceBox}>
        <div>{pd_price.toLocaleString("ko-KR")}원</div>
        <div>{(pd_price * count).toLocaleString("ko-KR")}원</div>
        <div>{count}</div>
        <button onClick={onClickAdd(kitItem)} css={button}>{`+`}</button>
        <button onClick={onClickDec(kitItem)} css={button}>{`-`}</button>
        <button onClick={onClickDel(kitItem)} css={button}>{`X`}</button>
      </div>
    </div>
  );
};

export default CartItem;

const leftBox = css({
  display: "flex",
});

const priceBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
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
  height: "100%",
});

const button = css({
  width: "2rem",
  height: "2rem",
  border: "1px solid #000",
  borderRadius: "0.25rem",
  fontWeight: "700",
});
