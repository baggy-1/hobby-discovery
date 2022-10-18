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

  const onClickMoveTap = (path: string) => () => {
    router.push(path);
    setNavOpen(false);
  };

  const push = (path: string) => () => {
    router.push(path);
  };

  return (
    <>
      <nav css={nav(pathname)}>
        <div css={wrapper}>
          <div css={imageWrapper}>
            <div css={logo} onClick={push("/")}>
              <Image
                src="/asset/image/logo.png"
                alt="logo"
                width={32}
                height={32}
              />
            </div>
            <span css={logoText} onClick={push("/")}>
              CHIHAM
            </span>
          </div>
          <div css={navTapWrapper}>
            <div css={taps}>
              {navLink.map((link) => (
                <div key={link.title} onClick={onClickMoveTap(link.path)}>
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
          <div css={mobTapWrapper(pathname)}>
            {navLink.map((link) => (
              <div
                key={link.title}
                css={mobTap}
                onClick={onClickMoveTap(link.path)}
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

const logoText = css({
  fontSize: "1.1rem",
  fontWeight: "700",
  cursor: "pointer",
});

const mobTapWrapper = (path: string) =>
  css({
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: path === "/" ? "rgba(0, 29, 54, 0.35)" : "#FFFFFF",
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
  cursor: "pointer",
  [mq[1]]: {
    display: "flex",
  },
});

const hamburger = css({
  width: "2rem",
  height: "2rem",
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
  gap: "1rem",
});

const wrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "80rem",
});

const nav = (path: string) =>
  css({
    position: "sticky",
    top: "0",
    zIndex: "500",
    width: "100%",
    height: "4rem",
    backgroundColor: path === "/" ? "rgba(0, 29, 54, 0.25)" : "#FFFFFF",
    color: path === "/" ? "#FFFFFF" : "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: path === "/" ? "blur(10px)" : "none",
  });
