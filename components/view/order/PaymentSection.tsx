import { css } from "@emotion/react";
import { CenterFull, Text } from "components/common/styles";
import { section } from "components/view/order/OrderView";
import { OrderContext } from "config/context";
import { PAYMENT } from "config/data/order";
import { useContext, useState } from "react";

const PaymentSection = () => {
  const [active, setActive] = useState(PAYMENT.CARD.value);
  const orderContext = useContext(OrderContext);

  const onClickActive = (value: string) => () => {
    setActive(value);
    orderContext?.setOrder((prev) => ({
      ...prev,
      payment: value,
    }));
  };

  return (
    <section css={section}>
      <h1
        css={[Text("1.25rem", "700", "#000000"), CenterFull("column", "mob")]}
      >
        결제 정보
      </h1>
      <div css={[paymentBox, CenterFull("row", "mob")]}>
        <span
          css={Button(active === PAYMENT.CARD.value)}
          onClick={onClickActive(PAYMENT.CARD.value)}
        >
          {PAYMENT.CARD.label}
        </span>
        <span
          css={Button(active === PAYMENT.DEPOSIT.value)}
          onClick={onClickActive(PAYMENT.DEPOSIT.value)}
        >
          {PAYMENT.DEPOSIT.label}
        </span>
        <span
          css={Button(active === PAYMENT.KAKAOPAY.value)}
          onClick={onClickActive(PAYMENT.KAKAOPAY.value)}
        >
          {PAYMENT.KAKAOPAY.label}
        </span>
      </div>
    </section>
  );
};

export default PaymentSection;

const Button = (active: boolean) =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "7rem",
    height: "3.5rem",
    padding: "1rem",
    color: active ? "#5C96CA" : "#000000",
    border: `1px solid ${active ? "#5C96CA" : "#999999"}`,
    borderRadius: "0.5rem",
    fontWeight: "700",
    cursor: "pointer",
  });

const paymentBox = css({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  height: "100%",
});
