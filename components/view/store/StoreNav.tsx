import { css } from "@emotion/react";
import { useRouter } from "next/router";

const NAV_LIST = [
  {
    label: "전체상품",
    path: "/store/list/all",
  },
  {
    label: "신상품",
    path: "/store/list/new",
  },
  {
    label: "인기상품",
    path: "/store/list/popular",
  },
  {
    label: "구독하기",
    path: "/subscription",
  },
];

const StoreNav = () => {
  const router = useRouter();

  return (
    <>
      <div css={wrapper}>
        <ul css={ul}>
          {NAV_LIST.map((nav) => (
            <li key={nav.label} onClick={() => router.push(nav.path)}>
              {nav.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StoreNav;

const ul = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  width: "100%",
  maxWidth: "80rem",
  height: "3rem",
  gap: "1rem",
  paddingLeft: "1rem",
  fontWeight: "600",
  li: {
    cursor: "pointer",
  },
});

const wrapper = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderTop: "2px solid #e5e5e5",
});
