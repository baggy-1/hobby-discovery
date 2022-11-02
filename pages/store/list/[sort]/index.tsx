import StoreSortView from "components/view/store/list/sort/StoreSortView";
import { StoreMainContext } from "config/context";
import { fetcher } from "config/fetcher";
import { instance } from "config/instance";
import { GetServerSideProps } from "next";
import { SWRConfig } from "swr";
import { InitFallback, KitItem } from "types";

interface Sort {
  label: string;
  order: string;
}

interface SortQuery {
  [key: string]: Sort;
  all: Sort;
  new: Sort;
  popular: Sort;
}

interface Props {
  fallback: InitFallback<KitItem[]>;
  pageIndex: number;
  sort: string;
}

export const SORT_QUERY: SortQuery = {
  all: {
    label: "전체 상품",
    order: "pd_create",
  },
  new: {
    label: "신상품",
    order: "pd_create",
  },
  popular: {
    label: "인기상품",
    order: "review_count",
  },
};

export const PAGE_ITEMS_NUM = 1;

const StoreSortPage = ({ fallback, sort, pageIndex }: Props) => {
  return (
    <>
      <StoreMainContext.Provider value={{ sort, pageIndex }}>
        <SWRConfig value={{ fallback, fetcher }}>
          <StoreSortView />
        </SWRConfig>
      </StoreMainContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { sort, page } = query;
  const order = SORT_QUERY[sort as string].order || SORT_QUERY.new.order;
  const pageIndex = page ? parseInt(page as string) : 1;
  const key = `/main/hobby?order=${order}&page=${pageIndex}&items=${PAGE_ITEMS_NUM}`;
  const nextKey = `/main/hobby?order=${order}&page=${
    pageIndex + 1
  }&items=${PAGE_ITEMS_NUM}`;

  const fallback: InitFallback<KitItem[] | null> = {};

  try {
    const { data } = await instance.get(key);

    fallback[key] = data;
  } catch (error) {
    fallback[key] = null;
  }

  try {
    const { data: nextData } = await instance.get(nextKey);

    fallback[nextKey] = nextData;
  } catch (error) {
    fallback[nextKey] = null;
  }

  return {
    props: {
      fallback,
      pageIndex,
      sort,
    },
  };
};

export default StoreSortPage;
