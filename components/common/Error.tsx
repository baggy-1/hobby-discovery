import { css } from "@emotion/react";
import { Text } from "components/common/styles";
import { MAIN_COLOR, mq } from "config/styles";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
  path: string;
}

const ErrorPage = ({ title, description, path }: Props) => {
  const router = useRouter();

  return (
    <div css={contanier}>
      <h1 css={Text("8rem", "700", "#000000")}>{title}</h1>
      <div css={textBox}>
        <h2 css={[Text("2rem", "500", "#999999"), Word]}>{description}</h2>
        <h2
          css={[Text("2rem", "700", "#FFFFFF"), Button]}
          onClick={() => router.replace(path)}
        >
          스토어로 이동하기
        </h2>
      </div>
    </div>
  );
};

export default ErrorPage;

const Word = css({
  wordBreak: "keep-all",
});

const Button = css({
  cursor: "pointer",
  width: "20rem",
  height: "4rem",
  backgroundColor: MAIN_COLOR,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.5rem",
});

const textBox = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  [mq[2]]: {
    textAlign: "center",
  },
});

const contanier = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "calc(100vh - 9rem)",
  gap: "4rem",
  [mq[2]]: {
    flexDirection: "column",
  },
});
