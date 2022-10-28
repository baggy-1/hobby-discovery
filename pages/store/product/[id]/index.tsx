import Seo from "components/Seo";
import ProductDetailView from "components/view/store/product/ProductDetailView";
import { StoreDetailContext } from "config/context";
import { fetcher } from "config/fetcher";
import { instance } from "config/instance";
import loop from "function/loop";
import { GetServerSideProps } from "next";
import { SWRConfig } from "swr";
import { InitFallback, KitItem, Review } from "types";

interface Props {
  fallback: InitFallback<Review[]>;
  id: string;
  kitItem: string;
}

const ProductDetail = ({ fallback, id, kitItem }: Props) => {
  const parseKitItem: KitItem = JSON.parse(kitItem);

  return (
    <>
      <Seo
        title={parseKitItem.pd_title}
        description={parseKitItem.pd_descrition}
        image={parseKitItem.images[0].image}
      />
      <StoreDetailContext.Provider value={{ id, kitItem: parseKitItem }}>
        <SWRConfig value={{ fallback, fetcher }}>
          <ProductDetailView />
        </SWRConfig>
      </StoreDetailContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const fallback: InitFallback<Review[] | null> = {};
  const { id, prod } = query;
  const reviewKey = `/main/${id}/reviews`;

  try {
    const { data } = await instance.get(reviewKey);
    const reviews: Review[] = data;
    fallback[reviewKey] = reviews;

    const getKey = (query: string) => `/user/${query}`;
    await loop(reviews, "user", fallback, getKey);
  } catch (error) {
    fallback[reviewKey] = null;
  }

  return {
    props: {
      fallback,
      id,
      kitItem: prod,
    },
  };
};

export default ProductDetail;
