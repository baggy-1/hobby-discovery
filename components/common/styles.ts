import { css } from "@emotion/react";

export const borderRadius = (radius: string) =>
  css({
    borderRadius: radius,
  });

export const hoverTranslateY = css({
  ":hover": {
    transform: "translate3d(0, -1rem, 0)",
  },
  transition: "all 0.3s ease",
});

export const cursorPoint = css({
  cursor: "pointer",
});

export const container = css({
  width: "100%",
  height: "auto",
  minHeight: "calc(100vh - 4rem - 5rem)",
  display: "flex",
  justifyContent: "center",
});

export const maxWidthWrapper = css({
  width: "100%",
  maxWidth: "80rem",
  height: "100%",
});
