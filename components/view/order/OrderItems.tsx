import Image from "next/image";
import { OrderItemListObj } from "types";
import { authFetcher } from "config/fetcher";
import useSWR from "swr";
import { css } from "@emotion/react";
import { borderRadius, Text } from "components/common/styles";
import { MAIN_COLOR, mq } from "config/styles";
import { useRouter } from "next/router";
import Empty from "components/view/order/Empty";

const OrderItems = () => {
  const router = useRouter();
  const { data } = useSWR<OrderItemListObj>("/order?type=item", authFetcher);

  return (
    <>
      {data?.order.length === 0 && (
        <Empty
          title={"아직 구매한 상품이 없습니다!"}
          pushPath={"/store"}
          height={"calc(100vh - 13rem)"}
        />
      )}
      {data?.order
        .sort((a, b) => (new Date(a.o_create) > new Date(b.o_create) ? -1 : 1))
        .map((order) => (
          <div key={order.o_id} css={wrapper}>
            <h1 css={Time}>{order.o_create.split("T")[0]}</h1>
            {order.o_items.map((item) => (
              <div key={item.p_id} css={itemWrapper}>
                <div css={leftBox}>
                  <div css={ImageBox}>
                    <Image
                      src={item.p_image[0].image}
                      alt={"order-item"}
                      width={100}
                      height={100}
                      css={borderRadius("0.25rem")}
                    />
                  </div>
                  <div css={TextWapper}>
                    <h2
                      css={Title}
                      onClick={() => router.push(`/store/product/${item.p_id}`)}
                    >
                      {item.p_title}
                    </h2>
                    <h2 css={Text("0.8rem", "400", "#999999")}>
                      {item.p_description}
                    </h2>
                    <h2 css={Text("0.8rem", "400", "#999999")}>
                      {item.p_quantity}개
                    </h2>
                    <h2 css={Text("1.1rem", "600", "#000000")}>
                      {`총 ${item.p_total_price.toLocaleString("ko-KR")}원`}
                    </h2>
                  </div>
                </div>
                <button
                  css={Button}
                  onClick={() => router.push(`/store/product/${item.p_id}`)}
                >
                  후기 작성하러 가기
                </button>
              </div>
            ))}
          </div>
        ))}
    </>
  );
};

export default OrderItems;

const TextWapper = css({
  width: "100%",
  maxWidth: "30rem",
  height: "auto",
  [mq[2]]: {
    maxWidth: "20rem",
  },
  [mq[1]]: {
    maxWidth: "15rem",
  },
});

export const Button = css({
  width: "8.4rem",
  height: "3rem",
  border: `2px solid ${MAIN_COLOR}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.25rem",
  color: MAIN_COLOR,
  fontWeight: "600",
});

export const Title = css({
  fontSize: "1.1rem",
  fontWeight: "700",
  color: "#000000",
  cursor: "pointer",
  width: "fit-content",
});

export const ImageBox = css({
  width: "auto",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.25rem",
});

export const leftBox = css({
  display: "flex",
  width: "auto",
  height: "100%",
  gap: "1rem",
  [mq[1]]: {
    justifyContent: "start",
    width: "100%",
  },
});

export const Time = css({
  fontSize: "1.1rem",
  fontWeight: "700",
  color: "#999999",
});

export const itemWrapper = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "1rem 0",
  [mq[1]]: {
    flexDirection: "column",
    gap: "1rem",
  },
});

export const wrapper = css({
  width: "100%",
  height: "auto",
  borderBottom: "1px solid #E5E5E5",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
});
