import { css } from "@emotion/react";
import { mq } from "config/styles";
import useSWR from "swr";
import { Hobby } from "types";
import Card from "components/view/store/Card";

const Product = () => {
  const { data } = useSWR<Hobby[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/main/hobby`
  );

  return (
    <>
      <div css={wrapper}>
        <div css={textBox}>
          <h1 css={h1}>신상품</h1>
        </div>
        <div css={prodWrapper}>
          {data?.map((prod) => (
            <Card key={prod.id} prod={prod} />
          ))}
        </div>
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

const prodWrapper = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  flexDirection: "row",
  [mq[1]]: {
    flexDirection: "column",
  },
});

const wrapper = css({
  padding: "2rem 0",
  width: "100%",
  height: "auto",
  minHeight: "30rem",
});
