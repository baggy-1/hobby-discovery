import { css } from "@emotion/react";
import ProdSwiper from "components/view/store/ProdSwiper";

const Product = () => {
  return (
    <>
      <div css={wrapper}>
        <div css={textBox}>
          <h1 css={h1}>신상품</h1>
        </div>
        <ProdSwiper />
      </div>
    </>
  );
};

export default Product;

const h1 = css({
  fontSize: "2rem",
  fontWeight: "700",
});

const textBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "4rem",
});

const wrapper = css({
  padding: "2rem 0",
  width: "100%",
  height: "auto",
  minHeight: "30rem",
  overflow: "hidden",
});
