import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import { changeOverflowHtml } from "util/changeOverflowHtml";

interface Props {
  text: string;
  onClickClose: () => void;
}

const Alert = ({ text, onClickClose }: Props) => {
  useEffect(() => {
    changeOverflowHtml("open");

    return () => {
      changeOverflowHtml("close");
    };
  }, []);

  return (
    <>
      <div css={section}>
        <div css={section} onClick={onClickClose}></div>
        <div css={alertWrapper}>
          <h1 css={textBox}>{text}</h1>
          <div css={buttonBox}>
            <button onClick={onClickClose}>확인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;

const buttonBox = css({
  width: "100%",
  height: "auto",
  minHeight: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTop: "2px solid #E5E5E5",
  button: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
});

const textBox = css({
  width: "100%",
  height: "auto",
  minHeight: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: "700",
  color: "#000000",
});

const alertWrapper = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  height: "auto",
  minHeight: "10rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
  zIndex: "999",
  padding: "1rem",
});

const section = css({
  width: "100%",
  height: "100%",
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "998",
  top: "0",
  left: "0",
});
