import Seo from "components/Seo";
import CartView from "components/view/cart/CartView";

const Cart = () => {
  return (
    <>
      <Seo title={"장바구니"} />
      <CartView />
    </>
  );
};

export default Cart;
