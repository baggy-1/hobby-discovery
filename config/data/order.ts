const PAYMENT = {
  CARD: {
    value: "card",
    label: "신용카드",
  },
  DEPOSIT: {
    value: "deposit",
    label: "무통장입금",
  },
  KAKAOPAY: {
    value: "kakaopay",
    label: "카카오페이",
  },
};

const ITEM_TYPE = {
  PRODUCT: {
    item: "product" as const,
    order: "item" as const,
  },
  SUBSCRIPTION: {
    item: "subscription" as const,
    order: "sub" as const,
  },
};

export { PAYMENT, ITEM_TYPE };
