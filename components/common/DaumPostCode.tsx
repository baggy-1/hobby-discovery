import { css } from "@emotion/react";
import Close from "public/asset/svg/Close";
import { Dispatch, SetStateAction } from "react";
import Daum from "react-daum-postcode";
import { DaumPostCodeData } from "types";

interface Props {
  onComplete: (address: string) => void;
  setDaumOpen: Dispatch<SetStateAction<boolean>>;
}

const DaumPostCode = ({ onComplete, setDaumOpen }: Props) => {
  const onClickClose = () => {
    setDaumOpen(false);
  };

  const onCompleteOrigin = (data: DaumPostCodeData) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete(fullAddress);
    setDaumOpen(false);
  };

  return (
    <>
      <div css={back} onClick={onClickClose}></div>
      <div css={container}>
        <div css={wrapper}>
          <Daum
            onComplete={onCompleteOrigin}
            autoClose={false}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <div css={close} onClick={onClickClose}>
            <Close />
          </div>
        </div>
      </div>
    </>
  );
};

export default DaumPostCode;

const close = css({
  position: "absolute",
  top: "0",
  right: "5px",
  cursor: "pointer",
  width: "1.6rem",
  height: "1.6rem",
  backgroundColor: "#000000",
  color: "#FFFFFF",
});

const wrapper = css({
  width: "100%",
  maxWidth: "500px",
  height: "400px",
  margin: "5px 0",
  position: "relative",
});

const container = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "100",
});

const back = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "#000000",
  opacity: "0.5",
  zIndex: "1",
});
