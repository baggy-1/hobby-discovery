import StoreNav from "components/view/store/StoreNav";
import Slider from "components/view/store/Slider";
import Product from "components/view/store/Product";
import { PRODUCT_SORT } from "config/data/mainCategory";

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
