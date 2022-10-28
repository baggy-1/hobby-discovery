import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import StoreNav from "components/view/store/StoreNav";
import { KitItem } from "types";
import Image from "next/image";
import { css } from "@emotion/react";
import { borderRadius, Text } from "components/common/styles";
import Chevron from "public/asset/svg/Chevron";

type AddProps<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P: string]: U;
};

interface SortQuery {
  all: string;
  new: "pd_create";
  popular: "review_count";
}

const SORT_QUERY: AddProps<SortQuery, string> = {
  all: "",
  new: "pd_create",
  popular: "review_count",
};

const PAGE_ITEMS_NUM = 10;

const defaultImage = "/asset/image/main-image.png";

const StoreSortView = () => {
  const router = useRouter();
  const { sort, page } = router.query;
  const [pageIndex, setPageIndex] = useState(1);

  const { data, isValidating } = useSWR<KitItem[]>(
    typeof sort === "string"
      ? `/main/hobby?order=${
          SORT_QUERY[sort] || SORT_QUERY.new
        }&page=${pageIndex}&items=${PAGE_ITEMS_NUM}`
      : null,
    {
      shouldRetryOnError: false,
    }
  );
  const { data: nextData, error: nextDataError } = useSWR<KitItem[]>(
    typeof sort === "string"
      ? `/main/hobby?order=${SORT_QUERY[sort] || SORT_QUERY.new}&page=${
          pageIndex + 1
        }&items=${PAGE_ITEMS_NUM}`
      : null,
    {
      shouldRetryOnError: false,
    }
  );

  const onClickPageIndex =
    (type: "prev" | "next" | "page", page?: number) => () => {
      if (page) {
        setPageIndex(page);
        router.push(`/store/list/${sort}?page=${page}`);
        return;
      }

      let resultPageIndex = pageIndex;

      if (type === "prev") {
        if (pageIndex === 1) return;
        resultPageIndex = pageIndex - 1;
        setPageIndex((prev) => prev - 1);
      } else if (type === "next") {
        if (nextDataError || nextData?.length === 0) return;
        resultPageIndex = pageIndex + 1;
        setPageIndex((prev) => prev + 1);
      } else {
        return;
      }

      router.push(`/store/list/${sort}?page=${resultPageIndex}`);
      return;
    };

  const onClickDetail = (item: KitItem) => () => {
    router.push({
      pathname: `/store/product/${item.pd_id}`,
      query: {
        prod: JSON.stringify(item),
      },
    });
  };

  useEffect(() => {
    setPageIndex(typeof page === "string" ? +page : 1);
  }, [page]);

  return (
    <div css={container}>
      <StoreNav />
      <section css={section}>
        <div css={itemsWrapper}>
          {data?.map((item) => (
            <div
              key={item.pd_id}
              css={itemWrapper}
              onClick={onClickDetail(item)}
            >
              <div css={[imageBox, borderRadius("0.25rem")]}>
                <Image
                  src={item.images[0] ? item.images[0].image : defaultImage}
                  alt={"kit-product"}
                  layout={"fill"}
                  objectFit={"cover"}
                  css={borderRadius("0.25rem")}
                />
              </div>
              <div css={textBox}>
                <h2 css={Text("1rem", "500", "#999999")}>{item.pd_sell}</h2>
                <div css={[textBottomBox, Text("1.1rem", "700", "#000000")]}>
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
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const buttonIndex =
                  Math.trunc((pageIndex - 1) / 5) * 5 + index + 1;

                if (nextDataError) {
                  if (buttonIndex > pageIndex) return null;
                }

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
          {!nextDataError && (
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
      </section>
    </div>
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
  justifyContent: "center",
  width: "100%",
  height: "100%",
  maxWidth: "80rem",
});

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  gap: "1rem",
});
