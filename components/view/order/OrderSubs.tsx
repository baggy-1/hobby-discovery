import { authFetcher } from "config/fetcher";
import useSWR from "swr";
import Empty from "components/view/order/Empty";
import { OrderSubListObj } from "types";
import {
  Button,
  ImageBox,
  itemWrapper,
  leftBox,
  Time,
  Title,
  wrapper,
} from "components/view/order/OrderItems";
import Image from "next/image";
import { borderRadius, Text } from "components/common/styles";
import { useRouter } from "next/router";

const OrderSubs = () => {
  const router = useRouter();
  const { data } = useSWR<OrderSubListObj>("/order?type=sub", authFetcher);

  return (
    <>
      {data?.order.length === 0 && (
        <Empty
          title={"아직 구독한 상품이 없습니다!"}
          pushPath={"/subscription"}
        />
      )}
      {data?.order.map((order) => (
        <div key={order.o_id} css={wrapper}>
          <h1 css={Time}>{order.o_create.split("T")[0]}</h1>
          {order.o_items.map((item) => (
            <div key={item.s_id} css={itemWrapper}>
              <div css={leftBox}>
                <div css={ImageBox}>
                  <Image
                    src={item.s_sub_image}
                    alt={"order-item"}
                    width={100}
                    height={100}
                    css={borderRadius("0.25rem")}
                  />
                </div>
                <div>
                  <h2 css={Title} onClick={() => router.push("/subscription")}>
                    {item.s_title}
                  </h2>
                  <h2 css={Text("0.8rem", "400", "#999999")}>{item.s_body}</h2>
                  <h2 css={Text("0.8rem", "400", "#999999")}>1개</h2>
                  <h2 css={Text("1.1rem", "600", "#000000")}>
                    {`월 ${item.s_price.toLocaleString("ko-KR")}원`}
                  </h2>
                </div>
              </div>
              {!item.s_delete && <button css={Button}>구독 중</button>}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default OrderSubs;
