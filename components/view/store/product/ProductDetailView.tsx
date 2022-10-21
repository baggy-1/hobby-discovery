import { css } from "@emotion/react";
import { container, maxWidthWrapper } from "components/common/styles";
import Seo from "components/Seo";
import { CartContext } from "config/context";
import { MAIN_COLOR, mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";
import { KitItem } from "types";

const ProductDetailView = () => {
  const cartInfo = useContext(CartContext);
  const router = useRouter();
  const { id, prod } = router.query;

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
    // TODO
    // 장바구니에 담고 확인 모달창 팝업

    alert("장바구니에 담겼습니다");
    cartInfo?.dispatch({ type: "ADD", kitItem });
  };

  return (
    <>
      <Seo />
      <div css={container}>
        <div css={[maxWidthWrapper]}>
          <div css={topWrapper}>
            {images[0] && (
              <div css={imageWrapper}>
                <Image
                  src={images[0].image || defaultImage}
                  alt={"product"}
                  width={300}
                  height={300}
                />
              </div>
            )}
            <div css={prodWrapper}>
              <div css={textBox}>
                <h1 css={text("2rem", "700")}>{pd_title}</h1>
                <h2 css={text("1.4rem", "500")}>{pd_descrition}</h2>
                <h2 css={text("1.4rem", "700")}>
                  {pd_price.toLocaleString("ko-KR")}원
                </h2>
              </div>
              <div css={buttonBox}>
                <button
                  css={button("#FFFFFF", MAIN_COLOR)}
                  onClick={onClickCart}
                >
                  장바구니 담기
                </button>
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

const imageDesc = css({
  width: "100%",
  height: "auto",
  position: "relative",
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
  [mq[2]]: {
    flexDirection: "column",
    alignItems: "start",
  },
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
});

const prodWrapper = css({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
});

const imageWrapper = css({
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const topWrapper = css({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const descSection = css({
  width: "100%",
  height: "100%",
  padding: "4rem",
  [mq[2]]: {
    padding: "0",
  },
});
