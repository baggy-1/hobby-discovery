import { css } from "@emotion/react";
import Cart from "components/common/Cart";
import Profile from "components/common/Profile";
import { CartContext } from "config/context";
import navLink from "config/data/navLink";
import { authInstance } from "config/instance";
import { cmq, MAIN_COLOR, mq } from "config/styles";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { SORT_QUERY } from "pages/store/list/[sort]";
import Close from "public/asset/svg/Close";
import Hamburger from "public/asset/svg/Hamburger";
import Search from "public/asset/svg/Search";
import { FormEvent, useContext, useState } from "react";
import { useSWRConfig } from "swr";
import { deleteCookie } from "util/cookie";

const Nav = () => {
  const cartInfo = useContext(CartContext);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pathname } = router;
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();
  const searchInput = useInput();
  const isHome = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);

  const onClickSearchIcon = () => {
    if (searchOpen && searchInput.value.trim() !== "") {
      router.push(`/store/list/new?search=${searchInput.value}`);
      setSearchOpen((prev) => !prev);
      searchInput.setValue("");
    } else {
      setSearchOpen((prev) => !prev);
    }
  };

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/store/list/new?search=${searchInput.value}`);
    setSearchOpen(false);
    searchInput.setValue("");
  };

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
    authInstance.defaults.headers.common["Authorization"] = "";

    localStorage.removeItem("cart");
    cartInfo?.dispatch({ type: "RESET" });

    router.replace("/store");
    setNavOpen(false);
    mutate("/user", null, {
      revalidate: true,
    });
  };

  return (
    <>
      <nav css={nav(pathname)}>
        <div css={wrapper}>
          <div css={imageWrapper}>
            <div css={imageBox} onClick={isHome ? push("/") : push("/store")}>
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
            {pathname.includes("store") && !pathname.includes("cart") && (
              <form onSubmit={onSubmitSearch} css={searchWrapper}>
                <input
                  type="text"
                  value={searchInput.value}
                  onChange={searchInput.onChange}
                  css={S_searchInput(searchOpen)}
                  placeholder="어떤 상품을 찾고 있나요?"
                />
                <button css={searchButton} type="submit"></button>
                <div css={searchBox(searchOpen)} onClick={onClickSearchIcon}>
                  <Search />
                </div>
              </form>
            )}
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
      {pathname.includes("store") && !pathname.includes("cart") && (
        <form onSubmit={onSubmitSearch} css={[mobSearchWrapper]}>
          <input
            type="text"
            value={searchInput.value}
            onChange={searchInput.onChange}
            css={mobSearchInput}
            placeholder="어떤 상품을 찾고 있나요?"
          />
          <button type="submit" css={searchButton}></button>
          <div css={mobSearchBox} onClick={onClickSearchIcon}>
            <Search />
          </div>
        </form>
      )}
    </>
  );
};

export default Nav;

const imageBox = css({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  width: "auto",
  height: "100%",
  gap: "0.5rem",
});

const searchButton = css({
  display: "none",
});

const mobSearchBox = css({
  width: "2.4rem",
  height: "2.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.2rem",
  border: `2px solid ${MAIN_COLOR}`,
  borderLeft: "none",
  borderRadius: "0 0.25rem 0.25rem 0",
});

const mobSearchInput = css({
  width: "80%",
  height: "2.4rem",
  border: `2px solid ${MAIN_COLOR}`,
  borderRight: "none",
  borderRadius: "0.25rem 0 0 0.25rem",
  padding: "1rem",
});

const mobSearchWrapper = css({
  display: "none",
  [cmq("700px")]: {
    display: "flex",
    width: "auto",
    height: "3rem",
    alignItems: "center",
    justifyContent: "center",
  },
});

const S_searchInput = (active: boolean) =>
  css({
    width: active ? "12rem" : "0",
    height: "2rem",
    padding: active ? "0 1rem" : "0",
    border: active ? `2px solid ${MAIN_COLOR}` : "none",
    borderRight: "none",
    borderRadius: "0.25rem 0 0 0.25rem",
    transitionDuration: "0.3s",
  });

const searchWrapper = css({
  width: "auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [cmq("700px")]: {
    display: "none",
  },
});

const searchBox = (active: boolean) =>
  css({
    width: "2rem",
    height: "2rem",
    padding: "0.2rem",
    border: active ? `2px solid ${MAIN_COLOR}` : "none",
    borderLeft: "none",
    borderRadius: "0 0.25rem 0.25rem 0",
  });

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
  width: "auto",
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
  width: "auto",
  minWidth: "10rem",
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
