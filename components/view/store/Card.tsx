import { css } from "@emotion/react";
import { borderRadius } from "components/common/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { KitItem } from "types";

interface Props {
  kitItem: KitItem;
}

const Card = ({ kitItem }: Props) => {
  const router = useRouter();
  const { pd_id, pd_title, images } = kitItem;
  const imagePath = images[0] ? images[0].image : "/asset/image/main-image.png";
  return (
    <div
      css={prodCard}
      onClick={() =>
        router.push(
          {
            pathname: `/store/product/${pd_id}`,
            query: {
              prod: JSON.stringify(kitItem),
            },
          },
          `/store/product/${pd_id}`
        )
      }
    >
      <div css={[image, borderRadius("1.2rem")]}>
        <Image
          src={imagePath}
          alt={pd_title}
          width={250}
          height={300}
          css={[borderRadius("1.2rem"), hoverScale]}
        />
      </div>
      <div>{pd_title}</div>
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
