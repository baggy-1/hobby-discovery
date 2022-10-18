import StoreNav from "components/view/store/StoreNav";
import Slider from "components/view/store/Slider";
import Product from "components/view/store/Product";

const StoreView = () => {
  return (
    <>
      <StoreNav />
      <Slider />
      <Product />
      <Product />
      <Product />
    </>
  );
};

export default StoreView;
