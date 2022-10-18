import { css } from "@emotion/react";
import { MAIN_COLOR } from "components/common/styles";

interface Props {
  text: string;
}

const LogoWithText = ({ text }: Props) => {
  return (
    <div css={wrapper}>
      <span css={span}>C H I H A M</span>
      <span>{text}</span>
    </div>
  );
};

export default LogoWithText;

const wrapper = css({
  display: "flex",
  flexDirection: "column",
  margin: "2rem",
  fontSize: "1.5rem",
  fontWeight: "700",
  textAlign: "center",
  gap: "1rem",
});

const span = css({
  color: MAIN_COLOR,
  fontSize: "2rem",
});
