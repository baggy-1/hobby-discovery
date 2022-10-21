import Seo from "components/Seo";
import { useRouter } from "next/router";

const ProductDetailView = () => {
  const router = useRouter();
  const { id, prod } = router.query;

  const data = typeof prod === "string" ? JSON.parse(prod) : null;
  console.log(data);

  return (
    <>
      <Seo />
      <div>{id}</div>
    </>
  );
};

export default ProductDetailView;
