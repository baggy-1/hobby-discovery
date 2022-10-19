import { useState } from "react";

const useInput = (vaild?: RegExp, initValue?: string) => {
  const [value, setValue] = useState(initValue || "");
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      currentTarget: { value },
    } = event;

    if (vaild) {
      if (vaild.test(value)) {
        setValue(value);
      }
    } else {
      setValue(value);
    }
  };

  return { value, onChange };
};

export default useInput;
