import { css } from "@emotion/react";
import { borderRadius, hoverTranslateY } from "components/common/styles";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  title: string;
  price: number;
  id: number;
  images: { image: string }[];
  prod: any;
}

const Card = ({ title, images, price, id, prod }: Props) => {
  const router = useRouter();

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
      {images.length === 0 ? (
        <div css={[noImage, borderRadius("1.2rem")]}></div>
      ) : (
        <div css={[image, borderRadius("1.2rem")]}>
          <Image
            src={images[0]["image"]}
            alt={title}
            width={250}
            height={300}
            css={[borderRadius("1.2rem"), hoverScale]}
          />
        </div>
      )}
      <div>{title}</div>
      <div>{price}원</div>
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

const noImage = css({
  width: "250px",
  height: "300px",
  backgroundColor: "#f5f5f5",
});

const image = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});
