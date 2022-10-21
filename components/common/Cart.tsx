import { css } from "@emotion/react";
import { CartContext } from "config/context";
import { MAIN_COLOR } from "config/styles";
import { useRouter } from "next/router";
import CartBag from "public/asset/svg/CartBag";
import { useContext } from "react";

const CartBox = () => {
  const router = useRouter();
  const cartInfo = useContext(CartContext);

  const cartCount = cartInfo?.state.length || 0;

  return (
    <>
      <div css={cart} onClick={() => router.push("/store/cart")}>
        <CartBag />
        {cartCount > 0 && <div css={count}>{cartCount}</div>}
      </div>
    </>
  );
};

export default CartBox;

const count = css({
  position: "absolute",
  top: "-5px",
  right: "-5px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: `1px solid ${MAIN_COLOR}`,
  backgroundColor: MAIN_COLOR,
  color: "#FFFFFF",
  fontSize: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const cart = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});
