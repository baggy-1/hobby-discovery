import { css } from "@emotion/react";
import { borderRadius, Text } from "components/common/styles";
import { mq } from "config/styles";
import Image from "next/image";
import Star from "public/asset/svg/Star";
import useSWR from "swr";
import { PublicUser, Review } from "types";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const { user, images, title, body, grade, create_time } = review;
  const { data } = useSWR<PublicUser>(`/user/${user}`);
  const profilePath = data?.profile || "/asset/image/default-profile.jpg";

  return (
    <>
      {data && (
        <div css={container}>
          <div css={UpdateWrapper}>
            <div css={UpdateButton}>수정</div>
          </div>
          <div css={topWrapper}>
            <div css={leftBox}>
              <div css={[borderRadius("50%"), imageBox]}>
                <Image
                  src={profilePath}
                  alt={"profile"}
                  width={32}
                  height={32}
                  css={borderRadius("50%")}
                />
              </div>
              <div>
                <div>{data.nickname}</div>
                <div css={gradeTitle}>
                  <div css={Grade}>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <Star
                          key={index}
                          width={16}
                          height={16}
                          isTarget={index < grade}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div css={Text("1rem", "400", "#999999")}>
                {create_time.split("T")[0]}
              </div>
            </div>
          </div>
          <div css={bottomWrapper}>
            <>
              {images.map((image) => (
                <Image
                  src={image.image}
                  alt={"review-image"}
                  width={150}
                  height={150}
                  key={image.image}
                  css={borderRadius("0.25rem")}
                />
              ))}
            </>
            <div>
              <div css={Text("1rem", "700", "#000000")}>{title}</div>
              <div>{body}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;

const UpdateButton = css({
  width: "fit-content",
  height: "fit-content",
  fontSize: "1rem",
  cursor: "pointer",
});

const UpdateWrapper = css({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "#999999",
  width: "100%",
  height: "auto",
});

const Grade = css({
  display: "flex",
  gap: "0.1rem",
  alignItems: "center",
  justifyContent: "center",
});

const imageBox = css({
  width: "2rem",
  height: "2rem",
});

const bottomWrapper = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "start",
  gap: "1rem",
  [mq[1]]: {
    flexDirection: "column",
  },
});

const gradeTitle = css({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
});

const leftBox = css({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
});

const topWrapper = css({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
});

const container = css({
  width: "100%",
  maxWidth: "40rem",
  height: "100%",
  borderTop: "1px solid #D9D9D9",
  paddingTop: "0.5rem",
  display: "flex",
  flexDirection: "column",
  [mq[1]]: {
    maxWidth: "20rem",
  },
});
