import { useEffect } from "react";
import scrollAddFadeInUp from "util/scrollAddFadeInUp";

const useFadeIn = (elements: HTMLElement[], addDelayPx: number) => {
  useEffect(() => {
    window.addEventListener("scroll", scrollAddFadeInUp(elements, addDelayPx));
  }, [elements, addDelayPx]);
};

export default useFadeIn;
