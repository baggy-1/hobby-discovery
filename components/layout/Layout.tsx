import Nav from "components/layout/Nav";
import Footer from "components/layout/Footer";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SimpleNav from "components/layout/SimpleNav";
import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.querySelector("html")?.classList.add("dark");
    }
  }, []);

  const template = {
    loginSingup: (
      <>
        <div css={layout}>
          <div css={wrapper}>
            <SimpleNav />
            <main>{children}</main>
          </div>
        </div>
      </>
    ),
    default: (
      <>
        <div css={layout}>
          <div css={wrapper}>
            <Nav />
            <main>{children}</main>
            <Footer home={router.pathname === "/" ? true : false} />
          </div>
        </div>
      </>
    ),
  };

  return (
    <>
      {router.pathname === "/login" || router.pathname === "/signup"
        ? template.loginSingup
        : template.default}
    </>
  );
};

export default Layout;

const wrapper = css({
  position: "relative",
  width: "100%",
});

const layout = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
});
