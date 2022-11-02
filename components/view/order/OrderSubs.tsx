import { authFetcher } from "config/fetcher";
import useSWR, { mutate } from "swr";
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
import { authInstance } from "config/instance";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { mq } from "config/styles";
import { changeOverflowHtml } from "util/changeOverflowHtml";
import Alert from "components/common/Alert";
import { useAlertControl } from "hooks/useAlertControl";

const OrderSubs = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState<{
    id: string | null;
    state: boolean;
  }>({ id: null, state: false });
  const { alertControl, setAlertControl, onClickClose } = useAlertControl();

  const { data } = useSWR<OrderSubListObj>("/order?type=sub", authFetcher);

  const onClickDeleteSub = (subId: string) => () => {
    changeOverflowHtml("open");
    setOpenDelete({ id: subId, state: true });
  };

  const onClickDelResult = (result: boolean) => () => {
    if (result) {
      const { id } = openDelete;
      authInstance
        .patch(`user/sub`, { sub_id: id })
        .then((res) => {
          setAlertControl({
            text: "구독이 취소되었습니다.",
            isOpen: true,
          });
          mutate("/order?type=sub");
        })
        .catch((err) => {
          setAlertControl({
            text: "구독 취소에 실패했습니다.",
            isOpen: true,
          });
          throw new Error(`error: ${err}`);
        });
    }

    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "";
    }

    changeOverflowHtml("close");
    setOpenDelete({ id: null, state: false });
  };

  useEffect(() => {
    return () => {
      changeOverflowHtml("close");
    };
  }, []);

  return (
    <>
      {alertControl.isOpen && (
        <Alert text={alertControl.text} onClickClose={onClickClose} />
      )}
      {openDelete.state && (
        <>
          <div css={delPopUpBack}></div>
          <div css={delPopUp}>
            <h1 css={delText}>구독을 취소하시겠습니까?</h1>
            <div css={delButtonBox}>
              <button onClick={onClickDelResult(true)}>확인</button>
              <button onClick={onClickDelResult(false)}>취소</button>
            </div>
          </div>
        </>
      )}
      {data?.order.length === 0 && (
        <Empty
          title={"아직 구독한 상품이 없습니다!"}
          pushPath={"/subscription"}
          height={"calc(100vh - 13rem)"}
        />
      )}
      {data?.order
        .sort((a, b) => (new Date(a.o_create) > new Date(b.o_create) ? -1 : 1))
        .map((order) => (
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
                    <h2
                      css={Title}
                      onClick={() => router.push("/subscription")}
                    >
                      <div css={TextBox}>
                        <h3>{item.s_title}</h3>
                        <h3 css={Text("1rem", "500", "#999999")}>
                          {item.s_delete
                            ? ` 구독취소:${item.s_delete.split("T")[0]}`
                            : ""}
                        </h3>
                      </div>
                    </h2>
                    <h2 css={Text("0.8rem", "400", "#999999")}>
                      {item.s_body}
                    </h2>
                    <h2 css={Text("0.8rem", "400", "#999999")}>1개</h2>
                    <h2
                      css={
                        item.s_delete
                          ? Text("1.1rem", "600", "#999999")
                          : Text("1.1rem", "600", "#000000")
                      }
                    >
                      {`월 ${item.s_price.toLocaleString("ko-KR")}원`}
                    </h2>
                  </div>
                </div>
                {!item.s_delete && (
                  <button onClick={onClickDeleteSub(item.sub_id)} css={Button}>
                    구독 중
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
    </>
  );
};

export default OrderSubs;

const TextBox = css({
  display: "flex",
  gap: "1rem",
  [mq[1]]: {
    flexDirection: "column",
    gap: "0",
  },
});

const delText = css({
  width: "100%",
  height: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const delButtonBox = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  borderTop: "2px solid #E5E5E5",
  button: {
    width: "50%",
    height: "100%",
  },
  "button:nth-of-type(1)": {
    borderRight: "2px solid #E5E5E5",
  },
});

const delPopUp = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  height: "10rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: "100",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
});

const delPopUpBack = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "99",
});
