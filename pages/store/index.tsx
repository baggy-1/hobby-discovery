import Seo from "components/Seo";
import StoreView from "components/view/store/StoreView";
import { PRODUCT_SORT } from "config/data/mainCategory";
import { fetcher } from "config/fetcher";
import loop from "function/loop";
import { SWRConfig } from "swr";
import { InitFallback, KitItem } from "types";

interface Props {
  fallback: InitFallback<KitItem[]>;
}

const Store = ({ fallback }: Props) => {
  return (
    <>
      <Seo title="스토어" url={`/store`} />
      <SWRConfig value={{ fallback, fetcher }}>
        <StoreView />
      </SWRConfig>
    </>
  );
};

export const getStaticProps = async () => {
  const fallback: InitFallback<KitItem[]> = {};

  const getKey = (query: string) =>
    `/main/hobby?order=${query}&items=10&page=1`;
  await loop(PRODUCT_SORT, "query", fallback, getKey);

  return {
    props: {
      fallback,
    },
    revalidate: 60 * 60 * 24 * 7, // 1 week
  };
};

export default Store;
