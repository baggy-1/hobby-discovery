import { css } from "@emotion/react";
import { CenterFull, None, Text } from "components/common/styles";
import { section } from "components/view/order/OrderView";
import { OrderContext } from "config/context";
import { mq } from "config/styles";
import Image from "next/image";
import { useContext } from "react";

const ProdInfoSection = () => {
  const orderContext = useContext(OrderContext);
  const items = orderContext?.order.items;

  return (
    <section css={section}>
      <h1
        css={[Text("1.25rem", "700", "#000000"), CenterFull("column", "mob")]}
      >
        상품 정보
      </h1>
      {items &&
        items.map(({ kitItem, count }) => (
          <div key={kitItem.pd_id} css={ItemWrapper}>
            <div css={leftBox}>
              <div>
                <Image
                  src={kitItem.images[0].image}
                  alt={"product"}
                  width={150}
                  height={150}
                />
              </div>
              <div css={textBox}>
                <span css={Text("0.75rem", "500", "#999999")}>
                  {kitItem.pd_sell}
                </span>
                <span css={Text("1.25rem", "700", "#000000")}>
                  {kitItem.pd_title}
                </span>
                <span css={Text("1rem", "500", "#999999")}>
                  {kitItem.pd_descrition}
                </span>
                <span
                  css={Text("1.1rem", "600", "#000000")}
                >{`수량 ${count.toLocaleString("ko-KR")}개`}</span>
              </div>
            </div>
            <div css={priceBox}>
              <span css={[None("pc"), Text("1.25rem", "700", "#000000")]}>
                {"금액"}
              </span>
              <span css={Text("1.25rem", "700", "#000000")}>{`${(
                kitItem.pd_price * count
              ).toLocaleString("ko-KR")}원`}</span>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ProdInfoSection;

const priceBox = css({
  [mq[1]]: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "20rem",
  },
});

const textBox = css({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
});

const leftBox = css({
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  width: "auto",
  height: "auto",
  gap: "1rem",
});

const ItemWrapper = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "auto",
  flexDirection: "row",
  [mq[1]]: {
    flexDirection: "column",
  },
});
