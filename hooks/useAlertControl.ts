import { useState } from "react";

const useAlertControl = () => {
  const [alertControl, setAlertControl] = useState<{
    text: string;
    isOpen: boolean;
  }>({
    text: "",
    isOpen: false,
  });

  const onClickClose = () => {
    setAlertControl({ text: "", isOpen: false });
  };

  return {
    alertControl,
    setAlertControl,
    onClickClose,
  };
};

export { useAlertControl };
