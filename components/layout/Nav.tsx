import { css } from "@emotion/react";
import Profile from "components/common/Profile";
import { mq } from "config/styles";
import navLink from "data/navLink";
import useUser from "hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import Close from "public/asset/svg/Close";
import Hamburger from "public/asset/svg/Hamburger";
import { useState } from "react";
import { useSWRConfig } from "swr";

const Nav = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pathname } = router;
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();

  const onClickMoveTap = (path: string) => () => {
    router.push(path);
    setNavOpen(false);
  };

  const push = (path: string) => () => {
    router.push(path);
  };

  const onClickLogout = () => {
    document.cookie = "_hobby_rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "_hobby_ae=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "_hobby_at=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

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
              {pathname !== "/" && (
                <>
                  {user ? (
                    <div onClick={onClickLogout}>로그아웃</div>
                  ) : (
                    <>
                      <div onClick={onClickMoveTap(`/login`)}>로그인</div>
                      <div onClick={onClickMoveTap(`/signup`)}>회원가입</div>
                    </>
                  )}
                  <Profile />
                </>
              )}
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
            {pathname !== "/" && (
              <>
                {user ? (
                  <div css={mobTap} onClick={onClickLogout}>
                    로그아웃
                  </div>
                ) : (
                  <>
                    <div css={mobTap} onClick={onClickMoveTap(`/login`)}>
                      로그인
                    </div>
                    <div css={mobTap} onClick={onClickMoveTap(`/signup`)}>
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

const hamburger = css({
  width: "2rem",
  height: "2rem",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  display: "none",
  [mq[1]]: {
    display: "flex",
  },
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
  width: "100%",
  height: "100%",
  gap: "0.5rem",
  [mq[2]]: {
    paddingLeft: "1rem",
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
