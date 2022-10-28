import { css } from "@emotion/react";
import { borderRadius, hoverScale } from "components/common/styles";
import { mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { KitItem } from "types";

interface Props {
  kitItem: KitItem;
}

const Card = ({ kitItem }: Props) => {
  const router = useRouter();
  const { pd_id, pd_title, images, pd_price } = kitItem;
  const imagePath = images[0] ? images[0].image : "/asset/image/main-image.png";
  return (
    <div
      css={prodCard}
      onClick={() =>
        router.push({
          pathname: `/store/product/${pd_id}`,
          query: {
            prod: JSON.stringify(kitItem),
          },
        })
      }
    >
      <div css={[image, borderRadius("1.2rem")]}>
        <Image
          src={imagePath}
          alt={pd_title}
          width={250}
          height={300}
          css={[borderRadius("1.2rem"), hoverScale, imageO]}
        />
      </div>
      <div>{pd_title}</div>
      <div>{pd_price.toLocaleString("ko-KR")}원</div>
    </div>
  );
};

export default Card;

const imageO = css({
  [mq[1]]: {
    ":hover": {
      transform: "none",
    },
  },
});

const prodCard = css({
  cursor: "pointer",
});

const image = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  width: "250px",
  height: "300px",
  scrollSnapAlign: "start",
  [mq[1]]: {
    width: "200px",
    height: "250px",
  },
});
