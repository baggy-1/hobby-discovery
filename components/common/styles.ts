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

export const maxWidthWrapper = (maxWidth: string) =>
  css({
    width: "100%",
    maxWidth,
    height: "100%",
  });

export const Center = (flexDirection: "column" | "row") =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection,
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

export const WidthHeight = (width: string, height: string) =>
  css({
    width,
    height,
  });

export const Position = (position: "absolute" | "relative" | "static") =>
  css({
    position,
  });

export const Gap = (gap: string) =>
  css({
    display: "flex",
    gap,
  });

export const None = (type: "pc" | "mob") =>
  css({
    display: type === "pc" ? "none" : "block",
    [mq[1]]: {
      display: type === "pc" ? "block" : "none",
    },
  });

export const CenterFull = (
  flexDirection: "column" | "row",
  type: "pc" | "mob"
) =>
  css(
    type === "pc"
      ? {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection,
          width: "100%",
          height: "auto",
        }
      : {
          [mq[1]]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection,
            width: "100%",
            height: "auto",
          },
        }
  );
