import { css } from "@emotion/react";
import DaumPostCode from "components/common/DaumPostCode";
import { borderRadius, cursorPoint, Gap } from "components/common/styles";
import { label } from "components/view/profile/UpdateForm";
import { ChangeEvent, useState } from "react";
import { Input, InputBox } from "../signup/SignUpForm";

interface Props {
  value: string;
  onComplete: (address: string) => void;
  detail: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
}

const Address = ({ value, onComplete, detail }: Props) => {
  const [daumOpen, setDaumOpen] = useState(false);

  const onClickAddressSearch = () => {
    setDaumOpen(true);
  };

  return (
    <>
      <div css={[InputBox, borderRadius("0.25rem"), Gap("2rem")]}>
        <label css={label}>배송지</label>
        <div
          onClick={onClickAddressSearch}
          css={[Input, address(value), cursorPoint]}
        >
          {value || "주소를 입력해주세요"}
        </div>
      </div>
      <div css={[InputBox]}>
        <label css={label}>상세주소</label>
        <input
          css={Input}
          type="text"
          value={detail.value}
          onChange={detail.onChange}
          placeholder="상세주소를 입력해주세요"
        />
      </div>
      {daumOpen && (
        <DaumPostCode onComplete={onComplete} setDaumOpen={setDaumOpen} />
      )}
    </>
  );
};

export default Address;

const address = (value: string | null) =>
  css({
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    fontSize: value ? "1rem" : "0.75rem",
    color: value ? "#000000" : "#999999",
    whiteSpace: "nowrap",
    overflowX: "auto",
  });
