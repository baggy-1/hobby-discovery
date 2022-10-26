import StoreNav from "components/view/store/StoreNav";
import Slider from "components/view/store/Slider";
import Product from "components/view/store/Product";

const PRODUCT_SORT = [
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

const StoreView = () => {
  return (
    <>
      <StoreNav />
      <Slider />
      {PRODUCT_SORT.map((sorting) => (
        <Product key={sorting.title} {...sorting} />
      ))}
    </>
  );
};

export default StoreView;
