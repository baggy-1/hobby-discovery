import { css } from "@emotion/react";

export const MAIN_COLOR = "#F4BB5F";

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
