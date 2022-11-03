import { css } from "@emotion/react";
import { useRouter } from "next/router";
import UserInfoSection from "components/view/order/UserInfoSection";
import ProdInfoSection from "components/view/order/ProdInfoSection";
import { AddNull, Cart, Order, SubKitItem } from "types";
import PaymentSection from "components/view/order/PaymentSection";
import TotalSection from "components/view/order/TotalSection";
import { CartContext, OrderContext } from "config/context";
import { useContext, useEffect, useState } from "react";
import { MAIN_COLOR, mq } from "config/styles";
import { PAYMENT } from "config/data/order";
import { authInstance } from "config/instance";
import useUser from "hooks/useUser";
import Loading from "components/common/Loading";
import { useAlertControl } from "hooks/useAlertControl";
import Alert from "components/common/Alert";

const INIT_ORDER: AddNull<Order> = {
  address: null,
  number: null,
  name: null,
  payment: PAYMENT.CARD.value,
  totalPrice: null,
  items: null,
  type: null,
};

const OrderView = () => {
  const router = useRouter();
  const { items, type } = router.query;
  const cartInfo = useContext(CartContext);
  const { loading, error } = useUser();
  const { alertControl, setAlertControl, onClickClose } = useAlertControl();

  const [order, setOrder] = useState<AddNull<Order>>(INIT_ORDER);

  const onClickOrder = () => {
    if (Object.values(order).some((value) => value === null)) {
      setAlertControl({
        text: "주문 정보를 모두 입력해주세요.",
        isOpen: true,
      });
      return;
    }

    if (
      order.number &&
      (order.number.includes("-") || ![10, 11].includes(order.number.length))
    ) {
      setAlertControl({
        text: "올바른 휴대폰 번호를 입력해주세요. ('-' 제외, 10~11자리)",
        isOpen: true,
      });
      return;
    }

    authInstance
      .post(`/order/?type=${order.type}`, order)
      .then((res) => {
        setAlertControl({
          text: "주문이 완료되었습니다.",
          isOpen: true,
        });
        setTimeout(() => {
          router.replace("/store");
          cartInfo?.dispatch({ type: "RESET" });
        }, 1000);
      })
      .catch((err) => {
        setAlertControl({
          text: "주문에 실패했습니다.",
          isOpen: true,
        });
        throw new Error(`error: ${err}`);
      });
  };

  const getTotalPrice = (items: Cart[] | SubKitItem[]) => {
    if (items.length === 0) return 0;

    switch (items[0].type) {
      case "product":
        const cartItems = items as Cart[];
        return cartItems.reduce(
          (acc, cur) => acc + cur.kitItem.pd_price * cur.count,
          0
        );

      case "subscription":
        const subItems = items as SubKitItem[];
        return subItems.reduce((acc, cur) => acc + cur.price, 0);

      default:
        return null;
    }
  };

  useEffect(() => {
    const parseItems: Cart[] | SubKitItem[] | null =
      typeof items === "string" ? JSON.parse(items) : null;

    const orderItems: Cart[] | SubKitItem[] | null =
      parseItems instanceof Array ? parseItems : null;

    const totalPrice: Order["totalPrice"] | null =
      orderItems instanceof Array ? getTotalPrice(orderItems) : null;

    setOrder({
      ...INIT_ORDER,
      items: orderItems,
      totalPrice,
      type: typeof type === "string" ? type : null,
    });
  }, [items, type]);

  if (loading) return <Loading />;

  if (error) {
    router.push("/auth/login");
    return <div>에러 발생...</div>;
  }

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {alertControl.isOpen && (
        <Alert text={alertControl.text} onClickClose={onClickClose} />
      )}
      <div css={container}>
        <UserInfoSection />
        <ProdInfoSection />
        <PaymentSection />
        <TotalSection />
        <div css={ButtonBox}>
          {order && (
            <button css={Button} onClick={onClickOrder}>{`${
              order.type === "sub" ? "월 " : ""
            }${
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
  width: "100%",
  maxWidth: "24rem",
  height: "3rem",
  backgroundColor: MAIN_COLOR,
  color: "#FFFFFF",
  borderRadius: "0.5rem",
  fontSize: "1.25rem",
  fontWeight: "700",
  [mq[1]]: {
    maxWidth: "20rem",
  },
});

export const section = css({
  width: "100%",
  height: "auto",
  maxWidth: "60rem",
  borderBottom: "1px solid #999999",
  padding: "2rem 1rem",
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
