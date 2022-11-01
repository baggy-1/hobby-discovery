import Loading from "components/common/Loading";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useState } from "react";
import OrderItems from "components/view/order/OrderItems";
import OrderSubs from "components/view/order/OrderSubs";
import { css } from "@emotion/react";
import { MAIN_COLOR } from "config/styles";

type Taps = "item" | "sub";

const OrderListView = () => {
  const router = useRouter();
  const { loading, error } = useUser();
  const [currentTap, setCurrentTap] = useState<Taps>("item");

  const onClickChangeTap = (tap: Taps) => () => {
    setCurrentTap(tap);
  };

  if (loading) return <Loading />;

  if (error) {
    router.push("/auth/login");
    return <div>error</div>;
  }

  return (
    <>
      <div css={container}>
        <div css={wrapper}>
          <div css={TapBox}>
            <h1
              css={H1(currentTap === "item")}
              onClick={onClickChangeTap("item")}
            >
              구매내역
            </h1>
            <h1
              css={H1(currentTap === "sub")}
              onClick={onClickChangeTap("sub")}
            >
              구독내역
            </h1>
          </div>
          <div css={orderList}>
            {currentTap === "item" && <OrderItems />}
            {currentTap === "sub" && <OrderSubs />}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderListView;

const H1 = (active: boolean) =>
  css({
    fontSize: "1.25rem",
    fontWeight: "700",
    color: active ? "#000000" : "#999999",
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: active ? `2px solid ${MAIN_COLOR}` : "none",
    cursor: "pointer",
  });

const orderList = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  minHeight: "calc(100vh - 13rem)",
});

const TapBox = css({
  width: "100%",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "1px solid #E5E5E5",
});

const wrapper = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "80rem",
  padding: "0 1rem",
});

const container = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
