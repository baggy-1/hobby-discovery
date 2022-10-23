import { css } from "@emotion/react";
import {
  container,
  gap,
  maxWidthWrapper,
  Text,
} from "components/common/styles";
import Seo from "components/Seo";
import { CartContext } from "config/context";
import { useContext } from "react";
import CartItem from "components/view/cart/CartItem";
import { MAIN_COLOR } from "config/styles";
import { useRouter } from "next/router";

const CartView = () => {
  const router = useRouter();
  const cartInfo = useContext(CartContext);
  const total = cartInfo?.state.reduce((acc, cur) => {
    return cur.checked ? acc + cur.kitItem.pd_price * cur.count : acc;
  }, 0);

  return (
    <>
      <Seo />
      <div css={container}>
        <div css={[maxWidthWrapper, gap("2rem")]}>
          <div css={header}>장바구니</div>
          {cartInfo?.state.length !== 0 ? (
            <div css={itemWrapper}>
              {cartInfo?.state.map((item) => (
                <CartItem
                  key={item.kitItem.pd_id}
                  cartItem={item}
                  dispatch={cartInfo.dispatch}
                />
              ))}
            </div>
          ) : (
            <div css={emptyCart}>
              <div css={Text("1.5rem", "700", "#000000")}>
                아직 마음에 드신 상품이 없으시군요!
              </div>
              <div
                css={[Text("1.8rem", "700", MAIN_COLOR), detailText]}
                onClick={() => router.push("/store")}
              >
                상품 둘러보러 가기
              </div>
            </div>
          )}
          <div css={footer}>
            <div css={footerBox}>
              <div
                css={Text("1.25rem", "700", "#000000")}
              >{`결제 금액 ${total?.toLocaleString("ko-KR")}원`}</div>
              <button css={buyButton(total !== 0)}>{`${total?.toLocaleString(
                "ko-KR"
              )}원 결제하기`}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartView;

const detailText = css({
  cursor: "pointer",
  borderBottom: `0.2rem solid ${MAIN_COLOR}`,
});

const emptyCart = css({
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 25rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});

const buyButton = (able: boolean) =>
  css({
    width: "fit-content",
    height: "3rem",
    backgroundColor: able ? MAIN_COLOR : "#E0E0E0",
    padding: "0 1.5rem",
    color: "#FFFFFF",
    fontWeight: "500",
    borderRadius: "0.25rem",
    cursor: able ? "pointer" : "not-allowed",
  });

const footerBox = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "8rem",
  maxWidth: "50rem",
});

const footer = css({
  borderTop: "1rem solid #EBEBEB",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const header = css({
  fontSize: "1.5rem",
  fontWeight: "600",
  backgroundColor: "#EBEBEB",
  textAlign: "center",
});

const itemWrapper = css({
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 25rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});
