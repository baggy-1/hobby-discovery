import Nav from "components/layout/Nav";
import Footer from "components/layout/Footer";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SimpleNav from "components/layout/SimpleNav";
import Seo from "components/Seo";

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
        <div className="relative">
          <SimpleNav />
          <main>{children}</main>
        </div>
      </>
    ),
    default: (
      <>
        <Seo />
        <div className="relative">
          <Nav />
          <main>{children}</main>
          <Footer home={router.pathname === "/" ? true : false} />
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
