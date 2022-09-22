import { useState } from "react";

const useInput = (vaild?: RegExp) => {
  const [value, setValue] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
