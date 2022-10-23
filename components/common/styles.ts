import { css } from "@emotion/react";
import { mq } from "config/styles";

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

export const gap = (gap: string) =>
  css({
    display: "flex",
    flexDirection: "column",
    gap,
  });

export const Text = (fontSize: string, fontWeight: string, color: string) =>
  css({
    fontSize,
    fontWeight,
    color,
  });

export const MobileDisplayNone = css({
  [mq[1]]: {
    display: "none",
  },
});
