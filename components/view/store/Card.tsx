import { css } from "@emotion/react";
import { borderRadius } from "components/common/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { Hobby } from "types";

interface Props {
  prod: Hobby;
}

const Card = ({ prod }: Props) => {
  const router = useRouter();
  const { id, hobby_title, images } = prod;
  const imagePath = images[0] ? images[0].image : "/asset/image/main-image.png";
  return (
    <div
      css={prodCard}
      onClick={() =>
        router.push(
          {
            pathname: `/store/product/${id}`,
            query: {
              prod: JSON.stringify(prod),
            },
          },
          `/store/product/${id}`
        )
      }
    >
      <div css={[image, borderRadius("1.2rem")]}>
        <Image
          src={imagePath}
          alt={hobby_title}
          width={250}
          height={300}
          css={[borderRadius("1.2rem"), hoverScale]}
        />
      </div>
      <div>{hobby_title}</div>
      <div>{`39000`}원</div>
    </div>
  );
};

export default Card;

const hoverScale = css({
  ":hover": {
    transform: "scale(1.2)",
  },
  transition: "all 0.3s ease-in-out",
});

const prodCard = css({
  cursor: "pointer",
});

const image = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});
