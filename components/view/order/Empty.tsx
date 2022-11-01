import { css } from "@emotion/react";
import { Text } from "components/common/styles";
import { MAIN_COLOR } from "config/styles";
import { useRouter } from "next/router";

interface Props {
  title: string;
}

const Empty = ({ title }: Props) => {
  const router = useRouter();

  return (
    <div css={empty}>
      <h1 css={Text("1.5rem", "700", "#000000")}>{title}</h1>
      <h2
        css={[Text("1.8rem", "700", MAIN_COLOR), emptyProd]}
        onClick={() => router.push("/store")}
      >
        상품 둘러보러 가기
      </h2>
    </div>
  );
};

export default Empty;

const emptyProd = css({
  borderBottom: "0.2rem solid",
  width: "fit-content",
  cursor: "pointer",
});

const empty = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  height: "calc(100vh - 13rem)",
});
