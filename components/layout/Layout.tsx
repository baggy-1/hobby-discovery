import Nav from "components/layout/Nav";
import Footer from "components/layout/Footer";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <>
      <div className="relative">
        <Nav user={user} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
