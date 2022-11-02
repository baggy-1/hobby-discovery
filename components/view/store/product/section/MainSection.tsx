import { css } from "@emotion/react";
import { Center, Position, Text, WidthHeight } from "components/common/styles";
import { CartContext } from "config/context";
import { ITEM_TYPE } from "config/data/order";
import { MAIN_COLOR, mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import Chevron from "public/asset/svg/Chevron";
import Close from "public/asset/svg/Close";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cart, KitItem } from "types";

interface Props {
  kitItem: KitItem;
  image: string;
  setAlertControl: Dispatch<
    SetStateAction<{
      text: string;
      isOpen: boolean;
    }>
  >;
}

const MainSection = ({ kitItem, image, setAlertControl }: Props) => {
  const router = useRouter();
  const cartInfo = useContext(CartContext);
  const [isCartBack, setIsCartBack] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [resultKitItem, setResultKitItem] = useState<Cart[]>([]);
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { pd_title, pd_price, pd_descrition, pd_sell, pd_info } = kitItem;

  // onClick event
  const onClickCart = (type: "cart" | "order") => () => {
    if (isMobile && !optionOpen) {
      setOptionOpen(true);
      return;
    } else {
      if (type === "cart") {
        resultKitItem.forEach((item) => {
          cartInfo?.dispatch({ type: "ADD", cart: item });
          setIsCartBack(true);
        });
      } else {
        if (resultKitItem.length === 0) {
          setAlertControl({
            text: "상품을 선택해주세요.",
            isOpen: true,
          });
          return;
        }

        router.push({
          pathname: "/order",
          query: {
            type: ITEM_TYPE.PRODUCT.order,
            items: JSON.stringify(resultKitItem),
          },
        });
      }
    }
  };

  const onClickSelect = (value: string) => () => {
    setSelectBoxOpen(false);
    const exist = resultKitItem.find((item) => item.kitItem.pd_title === value);

    if (exist) return;
    if (!kitItem) return;

    setResultKitItem((prev) => {
      return [...prev, { kitItem, count: 1, checked: true, type: "product" }];
    });
  };

  const onClickCount = (type: "ADD" | "DESC" | "DEL", item: Cart) => () => {
    setResultKitItem((prev) => {
      const index = prev.findIndex((prevItem) => prevItem === item);
      if (index === -1) return prev;

      if (type === "ADD") {
        prev[index].count++;
      } else if (type === "DESC" && prev[index].count > 1) {
        prev[index].count--;
      } else if (type === "DEL") {
        prev.splice(index, 1);
      }

      return [...prev];
    });
  };

  // function
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // useEffect
  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div css={topWrapper}>
      <div css={imageWrapper}>
        <Image src={image} alt={"product"} width={500} height={500} />
      </div>
      <div css={prodWrapper}>
        <div css={textBox}>
          <div>
            <h3 css={text("1rem", "500")}>{pd_sell}</h3>
            <h1 css={text("2rem", "700")}>{pd_title}</h1>
            <h2 css={text("1.4rem", "500")}>{pd_descrition}</h2>
            <h2 css={text("1.4rem", "700")}>
              {pd_price.toLocaleString("ko-KR")}원
            </h2>
          </div>
          <h3 css={[text("1.2rem", "500"), BorderTop]}>{pd_info}</h3>
        </div>
        <div css={optionWrapper(optionOpen)}>
          {(!isMobile || (isMobile && optionOpen)) && (
            <>
              <div css={WidthHeight("100%", "auto")}>
                {isMobile && (
                  <div css={chevron} onClick={() => setOptionOpen(false)}>
                    <Chevron />
                  </div>
                )}
                <div css={[WidthHeight("100%", "auto"), Position("relative")]}>
                  <button
                    css={selectBox}
                    onClick={() => setSelectBoxOpen((prev) => !prev)}
                  >
                    상품 선택
                  </button>
                  {selectBoxOpen && (
                    <div css={[selectBoxOpenWrapper]}>
                      <span
                        css={selectBoxOpenBox}
                        onClick={onClickSelect(pd_title)}
                      >
                        {pd_title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {resultKitItem.map((item) => (
                <div key={item.kitItem.pd_id} css={optionBox}>
                  <div css={closeBox} onClick={onClickCount("DEL", item)}>
                    <Close />
                  </div>
                  <div>{item.kitItem.pd_title}</div>
                  <div css={optionBottomBox}>
                    <div css={CountButtonBox}>
                      <button
                        css={Button}
                        onClick={onClickCount("DESC", item)}
                      >{`-`}</button>
                      <div css={[Count, Text("1rem", "500", "#000000")]}>
                        {item.count}
                      </div>
                      <button
                        css={Button}
                        onClick={onClickCount("ADD", item)}
                      >{`+`}</button>
                    </div>
                    <div css={Center("row")}>
                      <div css={Text("1rem", "500", "#000000")}>{`${(
                        item.kitItem.pd_price * item.count
                      ).toLocaleString("ko-KR")}원`}</div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          <div css={WidthHeight("100%", "auto")}>
            {optionOpen && (
              <div css={totalPriceBox}>
                <span>총 상품 금액</span>
                <span>{`${resultKitItem
                  .reduce(
                    (acc, cur) => acc + cur.count * cur.kitItem.pd_price,
                    0
                  )
                  .toLocaleString("ko-KR")}원`}</span>
              </div>
            )}
            <div css={buttonBox}>
              <div css={CartBox}>
                <button
                  css={button("#FFFFFF", MAIN_COLOR)}
                  onClick={onClickCart("cart")}
                >
                  장바구니 담기
                </button>
                {isCartBack && (
                  <div css={cartBackInfo}>
                    장바구니에
                    <br /> 상품이 담겼습니다
                    <div css={close} onClick={() => setIsCartBack(false)}>
                      <Close />
                    </div>
                  </div>
                )}
              </div>
              <button
                css={button(MAIN_COLOR, "#FFFFFF")}
                onClick={onClickCart("order")}
              >
                바로구매
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;

const selectBoxOpenBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "3rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "0.25rem",
  border: "1px solid #E5E5E5",
  zIndex: "1",
  cursor: "pointer",
  fontSize: "1.2rem",
});

const selectBoxOpenWrapper = css({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "4rem",
  borderBottom: "1px solid #E5E5E5",
  borderRadius: "0.25rem",
});

const chevron = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const optionBottomBox = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "auto",
});

const selectBox = css({
  width: "100%",
  height: "2rem",
  border: "1px solid #E5E5E5",
  borderRadius: "0.25rem",
  cursor: "pointer",
});

const totalPriceBox = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 0",
  borderTop: `1px solid ${MAIN_COLOR}`,
  borderBottom: `1px solid ${MAIN_COLOR}`,
  fontSize: "1.25rem",
  fontWeight: "500",
  color: "#000000",
  marginBottom: "2rem",
  [mq[1]]: {
    borderBottom: "none",
    marginBottom: "0",
  },
});

const closeBox = css({
  width: "1.4rem",
  height: "1.4rem",
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  cursor: "pointer",
});

const CountButtonBox = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const optionBox = css({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "start",
  width: "100%",
  height: "6rem",
  position: "relative",
  padding: "1rem",
  gap: "1rem",
  backgroundColor: "#EBEBEB",
  borderRadius: "0.5rem",
});

const Button = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  width: "1.5rem",
  height: "1.5rem",
  border: "1px solid #000",
  fontWeight: "500",
});

const Count = css({
  width: "auto",
  padding: "0 10px",
  minWidth: "1.5rem",
  height: "1.5rem",
  textAlign: "center",
  border: "1px solid #000000",
  borderLeft: "none",
  borderRight: "none",
  fontSize: "1rem",
  fontWeight: "700",
});

const optionWrapper = (isOpen: boolean) =>
  css({
    position: "static",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    padding: "1rem",
    gap: "1rem",
    [mq[1]]: {
      position: "fixed",
      bottom: "0",
      left: "0",
      minHeight: isOpen ? "20rem" : "0",
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      zIndex: "500",
      border: isOpen ? `1px solid ${MAIN_COLOR}` : "none",
      borderTop: isOpen ? "none" : `1px solid ${MAIN_COLOR}`,
      borderTopLeftRadius: isOpen ? "1.5rem" : "0",
      borderTopRightRadius: isOpen ? "1.5rem" : "0",
      boxShadow: isOpen ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "none",
    },
  });

const close = css({
  position: "absolute",
  top: "0",
  right: "0",
  cursor: "pointer",
  width: "1.5rem",
  height: "1.5rem",
});

const cartBackInfo = css({
  position: "absolute",
  top: "-6rem",
  left: "50%",
  transform: "translateX(-50%)",
  width: "110%",
  height: "150%",
  padding: "1rem",
  fontSize: "0.9rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: MAIN_COLOR,
  "::after": {
    content: "''",
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    margin: "0 auto",
    width: "0",
    height: "0",
    borderTop: `1rem solid ${MAIN_COLOR}`,
    borderLeft: "1rem solid transparent",
    borderRight: "1rem solid transparent",
  },
});

const CartBox = css({
  position: "relative",
});

const button = (backgroundColor: string, color: string) =>
  css({
    width: "10rem",
    height: "3rem",
    backgroundColor,
    color,
    border: "1px solid",
    [mq[2]]: {
      width: "8rem",
    },
    [mq[1]]: {
      width: "10rem",
    },
  });

const buttonBox = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  fontSize: "1.2rem",
  fontWeight: "700",
});

const text = (fontSize: string, fontWeight: string) =>
  css({
    wordBreak: "keep-all",
    fontSize,
    fontWeight,
  });

const textBox = css({
  width: "100%",
  height: "auto",
  maxWidth: "30rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const BorderTop = css({
  borderTop: "1px solid #",
});

const prodWrapper = css({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  [mq[1]]: {
    width: "100%",
    alignItems: "center",
  },
});

const imageWrapper = css({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const topWrapper = css({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  maxWidth: "80rem",
  padding: "3rem 0",
  [mq[1]]: {
    flexDirection: "column",
    alignItems: "center",
  },
});
