import { Cart, KitItem } from "types";

const CART_ACTION_TYPE = {
  ADD: "ADD",
  INIT: "INIT",
  DEL: "DEL",
  DEC: "DEC",
  RESET: "RESET",
} as const;

interface InitAction {
  type: "INIT";
  cartList: Cart[];
}

interface AddAction {
  type: "ADD";
  kitItem: KitItem;
}

interface ResetAction {
  type: "RESET";
}

interface DecAction {
  type: "DEC";
  kitItem: KitItem;
}

interface DelAction {
  type: "DEL";
  kitItem: KitItem;
}

export type CartAction =
  | InitAction
  | AddAction
  | ResetAction
  | DecAction
  | DelAction;

const cartReducer = (state: Cart[], action: CartAction) => {
  const localCart = localStorage.getItem("cart");
  const prevCart: Cart[] = localCart ? JSON.parse(localCart) : [];

  switch (action.type) {
    case CART_ACTION_TYPE.ADD:
      if (prevCart.length !== 0) {
        const find = prevCart.find((item: Cart) => {
          const exist = item.kitItem.pd_id === action.kitItem.pd_id;

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
            kitItem: action.kitItem,
            count: 1,
          };

          newCart = [...prevCart, cartInfo];
        }
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      } else {
        const cartInfo = {
          kitItem: action.kitItem,
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

    case CART_ACTION_TYPE.DEC:
      prevCart.find((item: Cart) => {
        const exist = item.kitItem.pd_id === action.kitItem.pd_id;
        if (exist && item.count > 1) {
          item.count -= 1;
        }

        return exist;
      });

      const newCart: Cart[] = [...prevCart];
      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;

    case CART_ACTION_TYPE.DEL:
      const delCart = prevCart.filter(
        (item: Cart) => item.kitItem.pd_id !== action.kitItem.pd_id
      );

      localStorage.setItem("cart", JSON.stringify(delCart));
      return delCart;

    default:
      throw new Error("Invalid action type");
  }
};

export { cartReducer };
