import { css } from "@emotion/react";
import { mq } from "config/styles";
import Star from "public/asset/svg/Star";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import useSWR from "swr";
import { OrderItemListObj, Review } from "types";
import addRef from "util/addRef";
import ReviewCard from "components/view/store/product/ReviewCard";
import { PaddingTop, TapTitle } from "../ProductDetailView";
import { Center, Text } from "components/common/styles";
import useUser from "hooks/useUser";
import { authFetcher } from "config/fetcher";

interface Props {
  prodId: string;
  refArr: MutableRefObject<HTMLElement[]>;
  modalControl: Dispatch<
    SetStateAction<{
      text: string;
      isOpen: boolean;
    }>
  >;
}

const ReviewSection = ({ prodId, refArr, modalControl }: Props) => {
  const { user } = useUser();
  const { data: userOrderList } = useSWR<OrderItemListObj>(
    user ? "/order?type=item" : null,
    authFetcher
  );
  const { data: reviews } = useSWR<Review[]>(`/main/reviews/${prodId}`);
  const [reviewOpen, setReviewOpen] = useState(false);

  const grade = reviews
    ? Math.floor(
        reviews.reduce((acc, cur) => acc + cur.grade, 0) / reviews.length
      )
    : 0;

  const onClickReviewPostOpen = () => {
    modalControl({
      text: "",
      isOpen: true,
    });
  };

  return (
    <section
      css={[reviewSection, PaddingTop("8rem")]}
      ref={addRef(refArr, 1)}
      id="sectionReview"
    >
      <div css={[TapTitle, Center("row")]}>구매후기</div>
      <div css={[Center("column"), gradeWrapper]}>
        <div css={gradeBoxPc}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star isTarget={index < grade} key={index} />
            ))}
        </div>
        <div css={gradeBoxMob}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star
                isTarget={index < grade}
                key={index}
                width={40}
                height={40}
              />
            ))}
        </div>
        <div css={Text("1.5rem", "500", "#999999")}>{`${
          isNaN(grade) ? 0 : grade
        } / 5`}</div>
      </div>
      {user &&
        userOrderList?.order.find((order) =>
          order.o_items.find((item) => item.p_id.toString() === prodId)
        ) && (
          <div css={ReviewPostButtonWrapper}>
            <div css={ReviewPostButtonBox}>
              <div css={ReviewPostButton} onClick={onClickReviewPostOpen}>
                후기 작성
              </div>
            </div>
          </div>
        )}
      <div css={ReviewBox}>
        {reviews && reviews?.length !== 0 ? (
          <>
            {reviews
              .sort((a, b) =>
                new Date(a.create_time) > new Date(b.create_time) ? -1 : 1
              )
              .slice(0, reviewOpen ? undefined : 2)
              .map((review: Review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            {!reviewOpen && (
              <div
                css={reviewMoreButton("#8E8E8E")}
                onClick={() => setReviewOpen(true)}
              >
                구매후기 더보기
              </div>
            )}
          </>
        ) : (
          <div css={noReviewBox}>
            <div>아직 후기가 없어요</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;

const ReviewPostButton = css({
  width: "8rem",
  height: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #999999",
  borderRadius: "0.25rem",
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "#999999",
  cursor: "pointer",
});

const ReviewPostButtonBox = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingBottom: "1rem",
  maxWidth: "40rem",
  [mq[1]]: {
    maxWidth: "20rem",
  },
});

const ReviewPostButtonWrapper = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const gradeWrapper = css({
  paddingBottom: "2rem",
});

const gradeBoxMob = css({
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  [mq[1]]: {
    display: "flex",
  },
});

const gradeBoxPc = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [mq[1]]: {
    display: "none",
  },
});

const noReviewBox = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#999999",
  width: "100%",
  maxWidth: "40rem",
  borderTop: "1px solid #999999",
  padding: "1rem 0",
  gap: "2rem",
});

const reviewMoreButton = (color: string) =>
  css({
    width: "20rem",
    height: "3rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.25rem",
    color,
    fontSize: "1.5rem",
    fontWeight: "500",
    border: `1px solid ${color}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  });

const ReviewBox = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

const reviewSection = css({
  width: "100%",
  height: "100%",
});
