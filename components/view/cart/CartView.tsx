import { css } from "@emotion/react";
import { container, maxWidthWrapper } from "components/common/styles";
import Seo from "components/Seo";
import { CartContext } from "config/context";
import { useContext } from "react";
import CartItem from "components/view/cart/CartItem";

const CartView = () => {
  const cartInfo = useContext(CartContext);
  const total = cartInfo?.state.reduce((acc, cur) => {
    return acc + cur.kitItem.pd_price * cur.count;
  }, 0);

  return (
    <>
      <Seo />
      <div css={container}>
        <div css={maxWidthWrapper}>
          <div>장바구니</div>
          <div css={itemWrapper}>
            {cartInfo?.state.map((item) => (
              <CartItem
                key={item.kitItem.pd_id}
                cartItem={item}
                dispatch={cartInfo.dispatch}
              />
            ))}
          </div>
          <div>주문금액 {total}원</div>
        </div>
      </div>
    </>
  );
};

export default CartView;

const itemWrapper = css({
  width: "100%",
  height: "100%",
});
