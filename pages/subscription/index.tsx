import Seo from "components/Seo";
import SubscriptionView from "components/view/subscription/SubscriptionView";
import { instance } from "config/instance";
import { SWRConfig } from "swr";
import { DelProp, SubKitItem } from "types";
import { fetcher } from "config/fetcher/index";

type OriginalSubKitItem = DelProp<SubKitItem, "type">;

interface Props {
  fallback: {
    subKitItems: OriginalSubKitItem[];
  };
}

const Subscription = ({ fallback }: Props) => {
  return (
    <>
      <Seo title={"구독"} url={`/subscription`} />
      <SWRConfig value={{ fallback, fetcher }}>
        <SubscriptionView />
      </SWRConfig>
    </>
  );
};

export const getStaticProps = async () => {
  const { data } = await instance.get("user/sub_pd");

  return {
    props: {
      fallback: {
        "user/sub_pd": data,
      },
    },
  };
};

export default Subscription;
