import { css } from "@emotion/react";
import { useRouter } from "next/router";
import CartBag from "public/asset/svg/CartBag";

const Cart = () => {
  const router = useRouter();

  return (
    <>
      <div css={cart} onClick={() => router.push("/store/cart")}>
        <CartBag />
      </div>
    </>
  );
};

export default Cart;

const cart = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
