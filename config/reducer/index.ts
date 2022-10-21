import { Cart, Hobby } from "types";

const CART_ACTION_TYPE = {
  ADD: "ADD",
  INIT: "INIT",
  DEL: "DEL",
  RESET: "RESET",
} as const;

interface InitAction {
  type: "INIT";
  cartList: Cart[];
}

interface AddAction {
  type: "ADD";
  item: Hobby;
}

interface ResetAction {
  type: "RESET";
}

export type CartAction = InitAction | AddAction | ResetAction;

const cartReducer = (state: Cart[], action: CartAction) => {
  const localCart = localStorage.getItem("cart");
  const prevCart: Cart[] = localCart ? JSON.parse(localCart) : [];

  switch (action.type) {
    case CART_ACTION_TYPE.ADD:
      if (prevCart.length !== 0) {
        const find = prevCart.find((item: Cart) => {
          const exist = item.prod.id === action.item.id;

          if (exist) {
            item.count += 1;
          }

          return exist;
        });

        let newCart: Cart[] = [];

        if (find) {
          newCart = [...prevCart];
        } else {
          const cartInfo = {
            prod: action.item,
            count: 1,
          };

          newCart = [...prevCart, cartInfo];
        }
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      } else {
        const cartInfo = {
          prod: action.item,
          count: 1,
        };

        const newCart = [cartInfo];
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      }

    case CART_ACTION_TYPE.INIT:
      return action.cartList;

    case CART_ACTION_TYPE.RESET:
      localStorage.removeItem("cart");
      return [];

    default:
      throw new Error("Invalid action type");
  }
};

export { cartReducer };
