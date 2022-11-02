import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";
import StoreNav from "components/view/store/StoreNav";
import { KitItem, KitItemWithPage } from "types";
import Image from "next/image";
import { css } from "@emotion/react";
import { borderRadius, Text } from "components/common/styles";
import Chevron from "public/asset/svg/Chevron";
import { PAGE_ITEMS_NUM, SORT_QUERY } from "pages/store/list/[sort]";
import { StoreMainContext } from "config/context";
import Seo from "components/Seo";
import Empty from "components/view/order/Empty";
import { cmq } from "config/styles";

const defaultImage = "/asset/image/main-image.png";

const StoreSortView = () => {
  const router = useRouter();
  const { sort, pageIndex, search } = useContext(StoreMainContext);
  const order = SORT_QUERY[sort].order;
  const querySearch = search !== "" ? `&search=${search}` : "";

  const { data, isValidating } = useSWR<KitItemWithPage>(
    `/main/hobby?order=${order}&page=${pageIndex}&items=${PAGE_ITEMS_NUM}${querySearch}`,
    {
      shouldRetryOnError: false,
    }
  );
  const { data: nextData, error: nextDataError } = useSWR<KitItemWithPage>(
    data?.is_next
      ? `/main/hobby?order=${order}&page=${
          pageIndex + 1
        }&items=${PAGE_ITEMS_NUM}${querySearch}`
      : null,
    {
      shouldRetryOnError: false,
    }
  );

  const onClickPageIndex =
    (type: "prev" | "next" | "page", page?: number) => () => {
      if (page) {
        router.push(`/store/list/${sort}?page=${page}`);
        return;
      }

      let resultPageIndex = pageIndex;

      if (type === "prev") {
        if (pageIndex === 1) return;
        resultPageIndex = pageIndex - 1;
      } else if (type === "next") {
        if (nextDataError || nextData?.result.length === 0) return;
        resultPageIndex = pageIndex + 1;
      }
      router.push(`/store/list/${sort}?page=${resultPageIndex}${querySearch}`);
      return;
    };

  const onClickDetail = (item: KitItem) => () => {
    router.push({
      pathname: `/store/product/${item.pd_id}`,
    });
  };

  return (
    <>
      <Seo
        title={SORT_QUERY[sort].label}
        url={`/store/list/${sort}?page=${pageIndex}`}
      />
      <div css={container}>
        <StoreNav />
        <section css={section}>
          {data?.result.length === 0 ? (
            search !== "" ? (
              <Empty
                title={`'${search}'에 대한 검색결과가 없습니다.`}
                pushPath={"/store"}
                height={"calc(100vh - 13.5rem)"}
              />
            ) : (
              <Empty
                title={"상품이 없습니다."}
                pushPath={"/store"}
                height={"calc(100vh - 13.5rem)"}
              />
            )
          ) : (
            <>
              <div css={itemsWrapper}>
                {data?.result.map((item) => (
                  <div
                    key={item.pd_id}
                    css={itemWrapper}
                    onClick={onClickDetail(item)}
                  >
                    <div css={[imageBox, borderRadius("0.25rem")]}>
                      <Image
                        src={
                          item.images[0] ? item.images[0].image : defaultImage
                        }
                        alt={"kit-product"}
                        layout={"fill"}
                        objectFit={"cover"}
                        css={borderRadius("0.25rem")}
                      />
                    </div>
                    <div css={textBox}>
                      <h2 css={Text("1rem", "500", "#999999")}>
                        {item.pd_sell}
                      </h2>
                      <div
                        css={[textBottomBox, Text("1.1rem", "700", "#000000")]}
                      >
                        <h1>
                          {item.pd_title.length <= 12
                            ? item.pd_title
                            : `${item.pd_title.slice(0, 12)}...`}
                        </h1>
                        <h1>{item.pd_price.toLocaleString("ko-KR")}원</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div css={ButtonWrapper}>
                {pageIndex !== 1 && (
                  <button
                    css={Button}
                    disabled={isValidating}
                    onClick={onClickPageIndex("prev")}
                  >
                    <div css={chevron("left")}>
                      <Chevron />
                    </div>
                  </button>
                )}
                <div css={ButtonIndexBox}>
                  {data &&
                    Array(5)
                      .fill(0)
                      .map((_, index) => {
                        const buttonIndex =
                          Math.trunc((pageIndex - 1) / 5) * 5 + index + 1;

                        if (buttonIndex > data.total_page) return null;

                        return (
                          <button
                            css={ButtonIndex(pageIndex === buttonIndex)}
                            key={index}
                            disabled={isValidating}
                            onClick={onClickPageIndex("page", buttonIndex)}
                          >
                            {buttonIndex}
                          </button>
                        );
                      })}
                </div>
                {data && data.is_next && (
                  <button
                    css={Button}
                    disabled={isValidating}
                    onClick={onClickPageIndex("next")}
                  >
                    <div css={chevron("right")}>
                      <Chevron />
                    </div>
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default StoreSortView;

const chevron = (direction: "left" | "right") =>
  css({
    width: "1rem",
    height: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: direction === "left" ? "rotate(90deg)" : "rotate(-90deg)",
  });

const ButtonIndex = (active: boolean) =>
  css({
    width: "2rem",
    height: "2rem",
    borderRadius: "0.25rem",
    border: active ? "1px solid #999999" : "none",
    backgroundColor: "#FFFFFF",
    color: "#999999",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  });

const ButtonIndexBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const ButtonWrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  maxWidth: "80rem",
});

const Button = css({
  width: "2rem",
  height: "2rem",
  backgroundColor: "#E2E2E2",
  borderRadius: "0.25rem",
  color: "#000000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const itemsWrapper = css({
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: "repeat(auto-fill, 18rem)",
  justifyContent: "center",
  gap: "1rem",
  width: "100%",
  height: "100%",
  maxWidth: "80rem",
});

const textBottomBox = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const textBox = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  height: "30%",
  width: "100%",
});

const imageBox = css({
  position: "relative",
  width: "100%",
  height: "70%",
  border: "1px solid #E5E5E5",
});

const itemWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "18rem",
  height: "18rem",
  cursor: "pointer",
});

const section = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 15rem)",
  [cmq("700px")]: {
    minHeight: "calc(100vh - 18rem)",
  },
});

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  gap: "1rem",
  minHeight: "calc(100vh - 9rem)",
  [cmq("700px")]: {
    minHeight: "calc(100vh - 12rem)",
  },
});
