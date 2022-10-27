import { css } from "@emotion/react";
import { useRouter } from "next/router";
import UserInfoSection from "components/view/order/UserInfoSection";
import ProdInfoSection from "components/view/order/ProdInfoSection";
import { AddNull, Cart, Order } from "types";
import PaymentSection from "components/view/order/PaymentSection";
import TotalSection from "components/view/order/TotalSection";
import { CartContext, OrderContext } from "config/context";
import { useContext, useEffect, useState } from "react";
import { MAIN_COLOR } from "config/styles";
import { PAYMENT } from "config/data/order";
import { authInstance } from "config/instance";

const INIT_ORDER: AddNull<Order> = {
  address: null,
  number: null,
  name: null,
  payment: PAYMENT.CARD.value,
  totalPrice: null,
  items: null,
};

const OrderView = () => {
  const router = useRouter();
  const { items } = router.query;
  const cartInfo = useContext(CartContext);

  const [order, setOrder] = useState<AddNull<Order>>(INIT_ORDER);

  const onClickOrder = () => {
    if (Object.values(order).some((value) => value === null)) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const resultOrder = {
      ...order,
      items: order.items?.filter((item) => item.checked),
    };

    authInstance
      .post("/order/", resultOrder)
      .then((res) => {
        alert("주문이 완료되었습니다.");
        router.replace("/store");
        cartInfo?.dispatch({ type: "RESET" });
      })
      .catch((err) => {
        alert("주문에 실패했습니다.");
        throw new Error(`error: ${err}`);
      });
  };

  useEffect(() => {
    const orderItems: Cart[] | null =
      typeof items === "string" ? JSON.parse(items) : null;
    const total = orderItems?.reduce(
      (acc, cur) => acc + cur.kitItem.pd_price * cur.count,
      0
    );
    const totalPrice = total ? total : null;

    setOrder({
      ...INIT_ORDER,
      items: orderItems,
      totalPrice,
    });
  }, [items]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      <div css={container}>
        <UserInfoSection />
        <ProdInfoSection />
        <PaymentSection />
        <TotalSection />
        <div css={ButtonBox}>
          {order && (
            <button css={Button} onClick={onClickOrder}>{`${
              order.totalPrice ? order.totalPrice.toLocaleString("ko-KR") : 0
            }원 결제하기`}</button>
          )}
        </div>
      </div>
    </OrderContext.Provider>
  );
};

export default OrderView;

const ButtonBox = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem 0",
  cursor: "pointer",
});

const Button = css({
  width: "24rem",
  height: "3rem",
  backgroundColor: MAIN_COLOR,
  color: "#FFFFFF",
  borderRadius: "0.5rem",
  fontSize: "1.25rem",
  fontWeight: "700",
});

export const section = css({
  width: "100%",
  height: "auto",
  maxWidth: "60rem",
  borderBottom: "1px solid #999999",
  padding: "2rem 0",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const container = css({
  width: "100%",
  height: "auto",
  minHeight: "calc(100vh - 6rem - 3rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
});
