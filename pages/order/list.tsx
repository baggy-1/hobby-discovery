import Seo from "components/Seo";
import OrderListView from "components/view/order/OrderListView";

const OrderList = () => {
  return (
    <>
      <Seo title={"결제 내역"} />
      <OrderListView />
    </>
  );
};

export default OrderList;
