import { css } from "@emotion/react";
import { container, maxWidthWrapper } from "components/common/styles";
import Seo from "components/Seo";
import { CartContext } from "config/context";
import Image from "next/image";
import { useContext } from "react";
import { KitItem } from "types";

const CartView = () => {
  const cartInfo = useContext(CartContext);
  const defaultImage = "/asset/image/main-image.png";

  const onClickAdd = (kitItem: KitItem) => () => {
    cartInfo?.dispatch({ type: "ADD", kitItem });
  };

  const onClickDec = (kitItem: KitItem) => () => {
    cartInfo?.dispatch({ type: "DEC", kitItem });
  };

  const onClickDel = (kitItem: KitItem) => () => {
    cartInfo?.dispatch({ type: "DEL", kitItem });
  };

  return (
    <>
      <Seo />
      <div css={container}>
        <div css={maxWidthWrapper}>
          <div>장바구니</div>
          <div>
            {cartInfo?.state.map((item) => (
              <div key={item.kitItem.pd_id}>
                {item.kitItem.images[0] && (
                  <div>
                    <Image
                      src={item.kitItem.images[0].image || defaultImage}
                      alt={"product"}
                      width={150}
                      height={150}
                    />
                  </div>
                )}
                <div>{item.kitItem.pd_title}</div>
                <div>{item.kitItem.pd_price.toLocaleString("ko-KR")}원</div>
                <div>
                  {(item.kitItem.pd_price * item.count).toLocaleString("ko-KR")}
                  원
                </div>
                <div>{item.count}</div>
                <button
                  onClick={onClickAdd(item.kitItem)}
                  css={button}
                >{`+`}</button>
                <button
                  onClick={onClickDec(item.kitItem)}
                  css={button}
                >{`-`}</button>
                <button
                  onClick={onClickDel(item.kitItem)}
                  css={button}
                >{`X`}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartView;

const button = css({
  width: "2rem",
  height: "2rem",
  border: "1px solid #000",
  borderRadius: "0.25rem",
  fontWeight: "700",
});
