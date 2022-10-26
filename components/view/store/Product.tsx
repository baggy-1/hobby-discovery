import { css } from "@emotion/react";
import ProdSwiper from "components/view/store/ProdSwiper";

interface Props {
  query: string;
  title: string;
}

const Product = ({ query, title }: Props) => {
  return (
    <>
      <div css={wrapper}>
        <div css={textBox}>
          <h1 css={h1}>{title}</h1>
        </div>
        <div css={prodBox}>
          <ProdSwiper query={query} />
        </div>
      </div>
    </>
  );
};

export default Product;

const prodBox = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

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
