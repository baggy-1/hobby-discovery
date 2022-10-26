import { css } from "@emotion/react";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import { useState } from "react";
import Address from "components/view/profile/Address";
import { label } from "components/view/profile/UpdateForm";
import { Input, InputBox } from "components/view/signup/SignUpForm";
import { CenterFull, Gap, Text } from "components/common/styles";
import { mq } from "config/styles";
import { section } from "components/view/order/OrderView";

const UserInfoSection = () => {
  const { user } = useUser();
  const name = useInput();
  const number = useInput(undefined, user?.number);
  const addressArr = user?.address ? user.address.split("@%") : ["", ""];
  const [addressValue, setAddressValue] = useState(
    addressArr ? addressArr[0] : ""
  );
  const addressDetail = useInput(undefined, addressArr ? addressArr[1] : "");

  return (
    <section css={section}>
      <h1
        css={[Text("1.25rem", "700", "#000000"), CenterFull("column", "mob")]}
      >
        주문자 정보
      </h1>
      <form css={Form}>
        <div css={leftForm}>
          <div css={[InputBox, Gap("2rem")]}>
            <label css={label}>수령인</label>
            <input
              value={name.value}
              onChange={name.onChange}
              placeholder="이름을 입력해주세요"
              css={Input}
            />
          </div>
          <div css={[InputBox]}>
            <label css={label}>연락처</label>
            <input
              value={number.value}
              onChange={number.onChange}
              placeholder="연락처를 입력해주세요"
              css={Input}
            />
          </div>
        </div>
        <div css={addressBox}>
          <Address
            value={addressValue}
            setValue={setAddressValue}
            detail={addressDetail}
          />
        </div>
      </form>
    </section>
  );
};

export default UserInfoSection;

const leftForm = css({
  width: "auto",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const addressBox = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Form = css({
  display: "flex",
  gap: "1rem",
  justifyContent: "start",
  alignItems: "start",
  width: "100%",
  height: "auto",
  fontWeight: "600",
  flexDirection: "row",
  [mq[2]]: {
    flexDirection: "column",
  },
});
