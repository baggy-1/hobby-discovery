import Nav from "components/layout/Nav";
import Footer from "components/layout/Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SimpleNav from "components/layout/SimpleNav";
import Seo from "components/Seo";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.querySelector("html")?.classList.add("dark");
    }
  }, []);

  if (router.pathname === "/login" || router.pathname === "/signup") {
    return (
      <>
        <Seo />
        <div className="relative">
          <SimpleNav />
          <main>{children}</main>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="relative">
          <Nav user={user} />
          <main>{children}</main>
          <Footer home={router.pathname === "/" ? true : false} />
        </div>
      </>
    );
  }
};

export default Layout;
