const changeOverflowHtml = (type: "open" | "close") => {
  const html = document.querySelector("html");
  if (html) {
    if (type === "open") {
      html.style.overflow = "hidden";
    } else if (type === "close") {
      html.style.overflow = "auto";
    } else {
      return;
    }
  }
};

export { changeOverflowHtml };
