import ProductDetailView from "components/view/store/product/ProductDetailView";
import { StoreDetailContext } from "config/context";
import { fetcher } from "config/fetcher";
import { instance } from "config/instance";
import loop from "function/loop";
import { GetServerSideProps } from "next";
import { SWRConfig } from "swr";
import { InitFallback, KitItem, Review } from "types";

interface Props {
  fallback: InitFallback<Review[] | KitItem>;
  id: string;
}

const ProductDetail = ({ fallback, id }: Props) => {
  return (
    <>
      <StoreDetailContext.Provider value={{ id }}>
        <SWRConfig value={{ fallback, fetcher }}>
          <ProductDetailView />
        </SWRConfig>
      </StoreDetailContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const fallback: InitFallback<Review[] | null> = {};
  const { id } = query;
  const reviewKey = `/main/${id}/reviews`;
  const kitItemKey = `/main/${id}`;

  try {
    const { data } = await instance.get(kitItemKey);

    fallback[kitItemKey] = data;
  } catch (error) {
    fallback[kitItemKey] = null;
  }

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
    },
  };
};

export default ProductDetail;
