import { css } from "@emotion/react";
import { container, maxWidthWrapper } from "components/common/styles";
import Seo from "components/Seo";
import { CartContext } from "config/context";
import { MAIN_COLOR, mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import { useContext, useState } from "react";
import useSWR from "swr";
import { KitItem } from "types";

const ProductDetailView = () => {
  const cartInfo = useContext(CartContext);
  const router = useRouter();
  const { id, prod } = router.query;
  const [isCartBack, setIsCartBack] = useState(false);
  // const { data: reviews } = useSWR(`/main/reviews/`);

  const query: KitItem | null =
    typeof prod === "string" ? JSON.parse(prod) : null;
  const { data, error } = useSWR<KitItem>(query ? null : `/main/${id}`);
  const kitItem = query || data;
  if (!kitItem && error) return <div>상품 정보가 없습니다</div>;
  if (!kitItem) return <div>로딩중...</div>;

  const {
    pd_title,
    pd_descrition,
    pd_create,
    pd_info,
    pd_price,
    pd_sell,
    images,
  } = kitItem;

  const defaultImage = "/asset/image/main-image.png";

  const onClickCart = () => {
    cartInfo?.dispatch({ type: "ADD", kitItem });
    setIsCartBack(true);
  };

  return (
    <>
      <Seo />
      <div css={container}>
        <div css={[maxWidthWrapper]}>
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
              <div css={buttonBox}>
                <div css={CartBox}>
                  <button
                    css={button("#FFFFFF", MAIN_COLOR)}
                    onClick={onClickCart}
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
                <button css={button(MAIN_COLOR, "#FFFFFF")}>바로구매</button>
              </div>
            </div>
          </div>
          <div css={descSection}>
            <div css={imageDesc}>
              <img
                src={images[0].pd_image || defaultImage}
                alt={"product-description"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailView;

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
  display: " flex",
  justifyContent: "center",
  alignItems: "center",
});

const button = (backgroundColor: string, color: string) =>
  css({
    width: "10rem",
    height: "3rem",
    backgroundColor,
    color,
    border: "1px solid",
  });

const buttonBox = css({
  display: "flex",
  justifyContent: "start",
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
  [mq[2]]: {
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
  [mq[2]]: {
    flexDirection: "column",
    alignItems: "center",
  },
});

const descSection = css({
  width: "100%",
  height: "100%",
  padding: "4rem",
  [mq[2]]: {
    padding: "0",
  },
});
