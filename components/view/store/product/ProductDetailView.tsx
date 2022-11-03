import { css } from "@emotion/react";
import { Center, container, maxWidthWrapper } from "components/common/styles";
import { StoreDetailContext } from "config/context";
import { MAIN_COLOR, mq } from "config/styles";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { KitItem } from "types";
import Seo from "components/Seo";
import Alert from "components/common/Alert";
import { useAlertControl } from "hooks/useAlertControl";
import ReviewSection from "components/view/store/product/section/ReviewSection";
import ProdInfoSection from "components/view/store/product/section/ProdInfoSection";
import MainSection from "components/view/store/product/section/MainSection";
import ReviewPostModal from "components/view/store/product/ReviewPostModal";
import { DEFAULT_IMAGE } from "config/data";

const ProductDetailView = () => {
  // etc
  const router = useRouter();

  // data
  const { id } = useContext(StoreDetailContext) as StoreDetailContext;
  const { data: kitItem } = useSWR<KitItem>(`/main/hobby/${id}`);

  // state
  const [currentTap, setCurrentTap] = useState(0);

  const refArr = useRef<HTMLElement[]>([]);
  const { alertControl, setAlertControl, onClickClose } = useAlertControl();
  const reviewModalControl = useAlertControl();

  const handleScroll = useCallback(
    (refArr: HTMLElement[]) => () => {
      refArr.forEach((ref, index) => {
        const { top, height } = ref.getBoundingClientRect();
        const topValue = top - 64 - 48;
        const isCurrentTap = topValue <= 0 && topValue + height >= 0;
        if (isCurrentTap) {
          setCurrentTap((prev) => {
            if (prev === index) {
              return prev;
            }
            return index;
          });
        }

        return;
      });
    },
    []
  );

  // useEffect
  useEffect(() => {
    const refarr = refArr.current;

    window.addEventListener("scroll", handleScroll(refarr));

    return () => {
      window.removeEventListener("scroll", handleScroll(refarr));
    };
  }, [handleScroll]);

  if (!kitItem) return <div>상품이 없습니다</div>;
  const { pd_title, images, pd_descrition, pd_id } = kitItem;

  return (
    <>
      <Seo
        title={pd_title}
        description={pd_descrition}
        url={`/store/product/${pd_id}`}
        image={images[0].image}
      />
      {alertControl.isOpen && (
        <Alert text={alertControl.text} onClickClose={onClickClose} />
      )}
      {reviewModalControl.alertControl.isOpen && (
        <ReviewPostModal
          prodId={id}
          onClickClose={reviewModalControl.onClickClose}
        />
      )}
      <div css={[container, Wrapper]}>
        <div css={[maxWidthWrapper("100%"), Center("column")]}>
          <MainSection
            kitItem={kitItem}
            image={images[0] ? images[0].image || DEFAULT_IMAGE : DEFAULT_IMAGE}
            setAlertControl={setAlertControl}
          />
          <div css={descSection}>
            <div css={detailNav}>
              <div
                css={navTap(currentTap === 0)}
                onClick={() => router.push("#sectionInfo")}
              >
                상품정보
              </div>
              <div
                css={navTap(currentTap === 1)}
                onClick={() => router.push("#sectionReview")}
              >
                구매후기
              </div>
            </div>
            <ProdInfoSection
              image={images[0].pd_image || DEFAULT_IMAGE}
              refArr={refArr}
            />
            <ReviewSection
              prodId={id}
              refArr={refArr}
              modalControl={reviewModalControl.setAlertControl}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailView;

export const PaddingTop = (paddingTop: string) =>
  css({
    paddingTop,
  });

export const TapTitle = css({
  width: "100%",
  height: "auto",
  fontSize: "2rem",
  fontWeight: "700",
  padding: "1rem 0",
});

const navTap = (currentTap: boolean) =>
  css({
    width: "15rem",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: currentTap ? `3px solid ${MAIN_COLOR}` : "none",
    fontSize: "1.2rem",
    fontWeight: "700",
    color: currentTap ? MAIN_COLOR : "#000000",
    cursor: "pointer",
  });

const detailNav = css({
  zIndex: "10",
  position: "sticky",
  top: "4rem",
  left: "0",
  backgroundColor: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "5rem",
  borderTop: "0.5rem solid #D9D9D9",
  borderBottom: "1px solid #D9D9D9",
});

const descSection = css({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  [mq[1]]: {
    padding: "0",
  },
});

const Wrapper = css({
  [mq[1]]: {
    marginBottom: "3rem",
  },
});
