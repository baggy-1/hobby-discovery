import { css } from "@emotion/react";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Address from "components/view/profile/Address";
import { label } from "components/view/profile/UpdateForm";
import { Input, InputBox } from "components/view/signup/SignUpForm";
import { CenterFull, Gap, Text } from "components/common/styles";
import { mq } from "config/styles";
import { section } from "components/view/order/OrderView";
import { OrderContext } from "config/context";

const UserInfoSection = () => {
  const orderContext = useContext(OrderContext);
  const { user } = useUser();
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>(user?.number || "");

  const [addressValue, setAddressValue] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const setOrder = orderContext?.setOrder;

  useEffect(() => {
    if (!user) return;

    const addressArr = user?.address ? user.address.split("@%") : ["", ""];

    setNumber(user.number);
    setAddressValue(addressArr ? addressArr[0] : "");
    setAddressDetail(addressArr ? addressArr[1] : "");
  }, [user]);

  useEffect(() => {
    if (!user || !setOrder) return;

    setOrder((prev) => {
      prev.userId = user.id;
      prev.number = user.number;
      prev.address = user.address;

      return prev;
    });
  }, [setOrder, user]);

  const onCompletAddress = (address: string) => {
    setAddressValue(address);
    const prevAddress = orderContext?.order.address;
    const addressArr = prevAddress?.split("@%");
    let resultAddress = address;
    if (addressArr?.length === 2) {
      resultAddress = `${address}@%${addressArr[1]}`;
    }
    orderContext?.setOrder({
      ...orderContext.order,
      address: resultAddress,
    });
  };

  const onChange =
    (orderProp: string, setValue: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      setValue(value);
      if (!orderContext || !orderContext.order) return;
      if (Object.keys(orderContext.order).includes(orderProp)) {
        orderContext.setOrder({
          ...orderContext.order,
          [orderProp]: value,
        });
      }
    };

  const onChangeDetail =
    (setValue: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      setValue(value);
      if (!orderContext || !orderContext.order) return;
      let address = `@%${value}`;
      const prevAddress = orderContext.order.address;
      const mainAddress = prevAddress?.split("@%")[0];
      if (mainAddress) {
        address = `${mainAddress}${address}`;
        console.log(address);
      }
      orderContext.setOrder({
        ...orderContext.order,
        address,
      });
    };

  return (
    <section css={section}>
      <h1
        css={[Text("1.25rem", "700", "#000000"), CenterFull("column", "mob")]}
      >
        주문자 정보
      </h1>
      <div css={Form}>
        <div css={leftForm}>
          <div css={[InputBox, Gap("2rem")]}>
            <label css={label}>수령인</label>
            <input
              value={name}
              onChange={onChange("name", setName)}
              placeholder="이름을 입력해주세요"
              css={Input}
            />
          </div>
          <div css={[InputBox]}>
            <label css={label}>연락처</label>
            <input
              value={number}
              onChange={onChange("number", setNumber)}
              placeholder="연락처를 입력해주세요"
              css={Input}
            />
          </div>
        </div>
        <div css={addressBox}>
          <Address
            value={addressValue}
            onComplete={onCompletAddress}
            detail={{
              value: addressDetail,
              onChange: onChangeDetail(setAddressDetail),
            }}
          />
        </div>
      </div>
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
