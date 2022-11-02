import { css } from "@emotion/react";
import { Center } from "components/common/styles";
import { MutableRefObject } from "react";
import addRef from "util/addRef";
import {
  PaddingTop,
  TapTitle,
} from "components/view/store/product/ProductDetailView";

interface Props {
  image: string;
  refArr: MutableRefObject<HTMLElement[]>;
}

const ProdInfoSection = ({ image, refArr }: Props) => {
  return (
    <section
      css={[imageDesc, PaddingTop("8rem")]}
      ref={addRef(refArr, 0)}
      id="sectionInfo"
    >
      <div css={[TapTitle, Center("row")]}>상품정보</div>
      <img src={image} alt={"product-description"} />
    </section>
  );
};

export default ProdInfoSection;

const imageDesc = css({
  width: "100%",
  height: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "0.5rem solid #D9D9D9",
  paddingBottom: "10rem",
});
