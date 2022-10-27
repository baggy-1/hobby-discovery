import { css } from "@emotion/react";
import { CenterFull, Text } from "components/common/styles";
import { section } from "components/view/order/OrderView";
import { OrderContext } from "config/context";
import { mq } from "config/styles";
import { useContext } from "react";

const TotalSection = () => {
  const orderContext = useContext(OrderContext);
  const totalPrice = orderContext?.order.totalPrice;

  return (
    <section css={[section, BorderBottom]}>
      <h1
        css={[Text("1.25rem", "700", "#000000"), CenterFull("column", "mob")]}
      >
        최종 결제 금액
      </h1>
      <div css={totalBox}>
        <span css={Text("1rem", "600", "#000000")}>상품 금액</span>
        <span css={Text("1.25rem", "700", "#000000")}>{`${(totalPrice
          ? totalPrice
          : 0
        ).toLocaleString("ko-KR")}원`}</span>
      </div>
    </section>
  );
};

export default TotalSection;

const BorderBottom = css({
  borderBottom: "none",
});

const totalBox = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [mq[1]]: {
    padding: "0 1rem",
  },
});
