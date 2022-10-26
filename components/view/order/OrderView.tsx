import { css } from "@emotion/react";
import { useRouter } from "next/router";
import UserInfoSection from "components/view/order/UserInfoSection";
import ProdInfoSection from "components/view/order/ProdInfoSection";
import { AddNull, Cart, Order } from "types";
import PaymentSection from "components/view/order/PaymentSection";
import TotalSection from "components/view/order/TotalSection";
import { OrderContext } from "config/context";
import { useEffect, useState } from "react";
import { MAIN_COLOR } from "config/styles";

const INIT_ORDER: AddNull<Order> = {
  userId: null,
  address: null,
  number: null,
  name: null,
  payment: null,
  totalPrice: null,
  items: null,
};

const OrderView = () => {
  const router = useRouter();
  const { items } = router.query;
  const orderItems: Cart[] | null =
    typeof items === "string" ? JSON.parse(items) : null;
  const total = orderItems?.reduce(
    (acc, cur) => acc + cur.kitItem.pd_price * cur.count,
    0
  );
  const totalPrice = total ? total : null;

  const [order, setOrder] = useState<AddNull<Order>>({
    ...INIT_ORDER,
    items: orderItems,
    totalPrice,
  });

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      <div css={container}>
        <UserInfoSection />
        {orderItems && <ProdInfoSection />}
        <PaymentSection />
        <TotalSection />
        <div css={ButtonBox}>
          <button css={Button}>{`${totalPrice?.toLocaleString(
            "ko-KR"
          )}원 결제하기`}</button>
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
