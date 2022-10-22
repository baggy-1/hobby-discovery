import { useState } from "react";

const useInput = (vaild?: RegExp, initValue?: string) => {
  const [value, setValue] = useState(initValue || "");
  const [isvalid, setIsvalid] = useState(false);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      currentTarget: { value },
    } = event;

    if (vaild) {
      setValue(value);
      if (value.match(vaild)) {
        setIsvalid(true);
      } else {
        setIsvalid(false);
      }
    } else {
      setValue(value);
    }
  };

  return { value, onChange, isvalid };
};

export default useInput;
