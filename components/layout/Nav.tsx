import { css } from "@emotion/react";
import Cart from "components/common/Cart";
import Profile from "components/common/Profile";
import { CartContext } from "config/context";
import navLink from "config/data/navLink";
import { mq } from "config/styles";
import useUser from "hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import Hamburger from "public/asset/svg/Hamburger";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";
import { deleteCookie } from "util/cookie";

const Nav = () => {
  const cartInfo = useContext(CartContext);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pathname } = router;
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();
  const isHome = pathname === "/";

  const onClickMoveTap = (path: string) => () => {
    router.push(path);
    setNavOpen(false);
  };

  const push = (path: string) => () => {
    router.push(path);
  };

  const onClickLogout = () => {
    deleteCookie("_hobby_rt");
    deleteCookie("_hobby_ae");
    deleteCookie("_hobby_at");
    localStorage.removeItem("cart");
    cartInfo?.dispatch({ type: "RESET" });

    router.replace("/store");
    setNavOpen(false);
    mutate("/user/user", null, {
      revalidate: true,
    });
  };

  return (
    <>
      <nav css={nav(pathname)}>
        <div css={wrapper}>
          <div css={imageWrapper} onClick={isHome ? push("/") : push("/store")}>
            <div css={logo}>
              <Image
                src="/asset/image/logo.png"
                alt="logo"
                width={32}
                height={32}
              />
            </div>
            <span css={logoText}>CHIHAM</span>
          </div>
          <div css={navTapWrapper}>
            <div css={taps}>
              {navLink.map((link) => (
                <div key={link.title} onClick={onClickMoveTap(link.path)}>
                  <div>{link.title}</div>
                </div>
              ))}
              {!isHome && (
                <>
                  {user ? (
                    <>
                      <div onClick={onClickLogout}>로그아웃</div>
                    </>
                  ) : (
                    <>
                      <div onClick={onClickMoveTap(`/auth/login`)}>로그인</div>
                      <div onClick={onClickMoveTap(`/auth/signup`)}>
                        회원가입
                      </div>
                    </>
                  )}
                  <Cart />
                  <Profile />
                </>
              )}
            </div>
            <div css={mobNav}>
              {!isHome && (
                <>
                  <Cart />
                  <Profile />
                </>
              )}
              <div css={hamburger} onClick={() => setNavOpen((prev) => !prev)}>
                {navOpen ? <Close /> : <Hamburger />}
              </div>
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
            {!isHome && (
              <>
                {user ? (
                  <div css={mobTap} onClick={onClickLogout}>
                    로그아웃
                  </div>
                ) : (
                  <>
                    <div css={mobTap} onClick={onClickMoveTap(`/auth/login`)}>
                      로그인
                    </div>
                    <div css={mobTap} onClick={onClickMoveTap(`/auth/signup`)}>
                      회원가입
                    </div>
                  </>
                )}
              </>
            )}
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
  height: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
  padding: "1rem",
  display: "none",
  cursor: "pointer",
  [mq[1]]: {
    display: "block",
  },
});

const taps = css({
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  display: "flex",
  cursor: "pointer",
  [mq[1]]: {
    display: "none",
  },
});

const mobNav = css({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  [mq[1]]: {
    display: "flex",
  },
});

const hamburger = css({
  width: "2rem",
  height: "2rem",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
});

const navTapWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
  [mq[2]]: {
    fontSize: "0.8rem",
    paddingRight: "1rem",
  },
});

const logo = css({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const imageWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  width: "10rem",
  height: "100%",
  gap: "0.5rem",
  [mq[2]]: {
    paddingLeft: "1rem",
  },
  [mq[1]]: {
    width: "100%",
  },
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
