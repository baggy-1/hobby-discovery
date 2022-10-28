export interface ProductSort {
  query: string;
  title: string;
}

const PRODUCT_SORT: ProductSort[] = [
  {
    query: "pd_create",
    title: "신상품",
  },
  {
    query: "review_count",
    title: "리뷰 많은 상품",
  },
  {
    query: "pd_price",
    title: "낮은 가격 순",
  },
];

export { PRODUCT_SORT };
