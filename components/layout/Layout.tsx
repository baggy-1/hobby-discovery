import Nav from "components/layout/Nav";
import Footer from "components/layout/Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SimpleNav from "components/layout/SimpleNav";
import Seo from "components/Seo";
import { UserContext } from "contexts/contexts";
import { getCookie } from "util/cookie";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.querySelector("html")?.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const user = getCookie("accessToken");

    if (user) {
      setUser(user);
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
    <UserContext.Provider value={{ user, setUser }}>
      {router.pathname === "/login" || router.pathname === "/signup"
        ? template.loginSingup
        : template.default}
    </UserContext.Provider>
  );
};

export default Layout;
