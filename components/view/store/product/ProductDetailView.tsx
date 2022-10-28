import { css } from "@emotion/react";
import {
  Center,
  container,
  maxWidthWrapper,
  Position,
  Text,
  WidthHeight,
} from "components/common/styles";
import { CartContext, StoreDetailContext } from "config/context";
import { MAIN_COLOR, mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Cart, Review } from "types";
import addRef from "util/addRef";
import ReviewCard from "components/view/store/product/ReviewCard";
import Star from "public/asset/svg/Star";
import Chevron from "public/asset/svg/Chevron";
import { ITEM_TYPE } from "config/data/order";

const defaultImage = "/asset/image/main-image.png";

const ProductDetailView = () => {
  // data
  const cartInfo = useContext(CartContext);
  const {
    id,
    kitItem,
    kitItem: { pd_title, pd_descrition, pd_info, pd_price, pd_sell, images },
  } = useContext(StoreDetailContext) as StoreDetailContext;
  const { data: reviews } = useSWR<Review[]>(`/main/${id}/reviews`);

  // state
  const [isCartBack, setIsCartBack] = useState(false);
  const [currentTap, setCurrentTap] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resultKitItem, setResultKitItem] = useState<Cart[]>([]);
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);
  const refArr = useRef<HTMLElement[]>([]);

  // etc
  const router = useRouter();
  const grade = reviews
    ? Math.floor(
        reviews.reduce((acc, cur) => acc + cur.grade, 0) / reviews.length
      )
    : 0;

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
          alert("상품을 선택해주세요");
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

  const handleScroll = useCallback(
    (refArr: HTMLElement[]) => () => {
      refArr.forEach((ref, index) => {
        const { top, height } = ref.getBoundingClientRect();
        const topValue = top - 64 - 48;
        const isCurrentTap = topValue <= 0 && topValue + height >= 0;
        if (isCurrentTap) {
          setCurrentTap((prev) => {
            if (prev === index) {
              return prev;
            }
            return index;
          });
        }

        return;
      });
    },
    []
  );

  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // useEffect
  useEffect(() => {
    const refarr = refArr.current;

    window.addEventListener("scroll", handleScroll(refarr));

    return () => {
      window.removeEventListener("scroll", handleScroll(refarr));
    };
  }, [handleScroll]);

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
    <>
      <div css={[container, Wrapper]}>
        <div css={[maxWidthWrapper("100%"), Center("column")]}>
          <div css={topWrapper}>
            <div css={imageWrapper}>
              <Image
                src={images[0] ? images[0].image || defaultImage : defaultImage}
                alt={"product"}
                width={500}
                height={500}
              />
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
                      <div
                        css={[
                          WidthHeight("100%", "auto"),
                          Position("relative"),
                        ]}
                      >
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
          <div css={descSection}>
            <div css={detailNav}>
              <div
                css={navTap(currentTap === 0)}
                onClick={() => router.push("#sectionInfo")}
              >
                상품정보
              </div>
              <div
                css={navTap(currentTap === 1)}
                onClick={() => router.push("#sectionReview")}
              >
                구매후기
              </div>
            </div>
            <section
              css={[imageDesc, PaddingTop("8rem")]}
              ref={addRef(refArr, 0)}
              id="sectionInfo"
            >
              <div css={[TapTitle, Center("row")]}>상품정보</div>
              <img
                src={images[0].pd_image || defaultImage}
                alt={"product-description"}
              />
            </section>
            <section
              css={[reviewSection, PaddingTop("8rem")]}
              ref={addRef(refArr, 1)}
              id="sectionReview"
            >
              <div css={[TapTitle, Center("row")]}>구매후기</div>
              <div css={[Center("column"), gradeWrapper]}>
                <div css={gradeBoxPc}>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star isTarget={index < grade} key={index} />
                    ))}
                </div>
                <div css={gradeBoxMob}>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        isTarget={index < grade}
                        key={index}
                        width={40}
                        height={40}
                      />
                    ))}
                </div>
                <div css={Text("1.5rem", "500", "#999999")}>{`${
                  isNaN(grade) ? 0 : grade
                } / 5`}</div>
              </div>
              <div css={ReviewBox}>
                {reviews && reviews?.length !== 0 ? (
                  <>
                    {reviews
                      .slice(0, reviewOpen ? undefined : 2)
                      .map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    {!reviewOpen && (
                      <div
                        css={reviewMoreButton("#8E8E8E")}
                        onClick={() => setReviewOpen(true)}
                      >
                        구매후기 더보기
                      </div>
                    )}
                  </>
                ) : (
                  <div css={noReviewBox}>
                    <div>아직 후기가 없어요</div>
                    <div css={reviewMoreButton(MAIN_COLOR)}>
                      구매후기 작성하기
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailView;

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

const gradeWrapper = css({
  paddingBottom: "2rem",
});

const gradeBoxMob = css({
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  [mq[1]]: {
    display: "flex",
  },
});

const gradeBoxPc = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [mq[1]]: {
    display: "none",
  },
});

const noReviewBox = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#999999",
  width: "100%",
  maxWidth: "40rem",
  borderTop: "1px solid #999999",
  padding: "1rem 0",
  gap: "2rem",
});

const reviewMoreButton = (color: string) =>
  css({
    width: "20rem",
    height: "3rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.25rem",
    color,
    fontSize: "1.5rem",
    fontWeight: "500",
    border: `1px solid ${color}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  });

const ReviewBox = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

const PaddingTop = (paddingTop: string) =>
  css({
    paddingTop,
  });

const reviewSection = css({
  width: "100%",
  height: "100%",
});

const TapTitle = css({
  width: "100%",
  height: "auto",
  fontSize: "2rem",
  fontWeight: "700",
  padding: "1rem 0",
});

const navTap = (currentTap: boolean) =>
  css({
    width: "15rem",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: currentTap ? `3px solid ${MAIN_COLOR}` : "none",
    fontSize: "1.2rem",
    fontWeight: "700",
    color: currentTap ? MAIN_COLOR : "#000000",
    cursor: "pointer",
  });

const detailNav = css({
  zIndex: "10",
  position: "sticky",
  top: "4rem",
  left: "0",
  backgroundColor: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "5rem",
  borderTop: "0.5rem solid #D9D9D9",
  borderBottom: "1px solid #D9D9D9",
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

const imageDesc = css({
  width: "100%",
  height: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "0.5rem solid #D9D9D9",
  paddingBottom: "10rem",
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

const descSection = css({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  [mq[1]]: {
    padding: "0",
  },
});

const Wrapper = css({
  [mq[1]]: {
    marginBottom: "3rem",
  },
});
