import { useRouter } from "next/router";

const OrderView = () => {
  const router = useRouter();
  const { userId, items } = router.query;

  if (typeof items === "string") {
    console.log(userId, JSON.parse(items));
  }

  return (
    <div>
      <div>주문서 작성</div>
    </div>
  );
};

export default OrderView;
