import { css } from "@emotion/react";
import DaumPostCode from "components/common/DaumPostCode";
import { borderRadius } from "components/common/styles";
import { label } from "components/view/profile/UpdateForm";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input, InputBox } from "../signup/SignUpForm";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  detail: {
    value: string;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    isvalid: boolean;
  };
}

const Address = ({ value, setValue, detail }: Props) => {
  const [daumOpen, setDaumOpen] = useState(false);

  const onClickAddressSearch = () => {
    setDaumOpen(true);
  };

  return (
    <>
      <div css={[InputBox, borderRadius("0.25rem")]}>
        <label css={label}>배송지</label>
        <div onClick={onClickAddressSearch} css={[address(value), Input]}>
          {value || "주소를 입력해주세요"}
        </div>
      </div>
      <div css={InputBox}>
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
        <DaumPostCode setValue={setValue} setDaumOpen={setDaumOpen} />
      )}
    </>
  );
};

export default Address;

const address = (value: string | null) =>
  css({
    width: "15rem",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    fontSize: value ? "1rem" : "0.75rem",
    color: value ? "#000000" : "#999999",
    whiteSpace: "nowrap",
    overflowX: "auto",
  });
