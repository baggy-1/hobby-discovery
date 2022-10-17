import { css } from "@emotion/react";
import Profile from "components/common/Profile";
import { mq } from "components/styles";
import navLink from "data/navLink";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import Hamburger from "public/asset/svg/Hamburger";
import { useState } from "react";

const Nav = () => {
  const router = useRouter();
  const { pathname } = router;
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <nav css={nav}>
        <div css={wrapper}>
          <div css={imageWrapper}>
            <div css={logo} onClick={() => router.push("/")}>
              <Image
                src="/asset/image/logo.png"
                alt="logo"
                width={32}
                height={32}
              />
            </div>
          </div>
          <div css={navTapWrapper}>
            <div css={taps}>
              {navLink.map((link) => (
                <div key={link.title} onClick={() => router.push(link.path)}>
                  <div>{link.title}</div>
                </div>
              ))}
              {pathname !== "/" && <Profile />}
            </div>
            <div css={hamburger} onClick={() => setNavOpen((prev) => !prev)}>
              {navOpen ? <Close /> : <Hamburger />}
            </div>
          </div>
        </div>
        {navOpen && (
          <div css={mobTapWrapper}>
            {navLink.map((link) => (
              <div
                key={link.title}
                css={mobTap}
                onClick={() => router.push(link.path)}
              >
                <div>{link.title}</div>
              </div>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;

const mobTapWrapper = css({
  position: "absolute",
  top: "100%",
  left: "0",
  backgroundColor: "rgba(0, 29, 54, 0.35)",
  color: "#FFFFFF",
  width: "100%",
});

const mobTap = css({
  display: "block",
  padding: "1rem",
  cursor: "pointer",
  [mq[1]]: {
    display: "none",
  },
});

const taps = css({
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  display: "none",
  color: "#FFFFFF",
  cursor: "pointer",
  [mq[1]]: {
    display: "flex",
  },
});

const hamburger = css({
  width: "2rem",
  height: "2rem",
  color: "#FFFFFF",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [mq[1]]: {
    display: "none",
  },
});

const navTapWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
  paddingRight: "1rem",
});

const logo = css({
  cursor: "pointer",
});

const imageWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  width: "100%",
  height: "100%",
  paddingLeft: "1rem",
});

const wrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "80rem",
});

const nav = css({
  position: "fixed",
  top: "0",
  zIndex: "500",
  width: "100%",
  height: "4rem",
  backgroundColor: "rgba(0, 29, 54, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(10px)",
});
