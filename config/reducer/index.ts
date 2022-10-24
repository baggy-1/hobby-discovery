import { Cart, KitItem } from "types";

const CART_ACTION_TYPE = {
  ADD: "ADD",
  INC: "INC",
  INIT: "INIT",
  DEL: "DEL",
  DEC: "DEC",
  RESET: "RESET",
  CHECK: "CHECK",
} as const;

interface AddAction {
  type: typeof CART_ACTION_TYPE.ADD;
  cart: Cart;
}

interface InitAction {
  type: typeof CART_ACTION_TYPE.INIT;
  cartList: Cart[];
}

interface IncAction {
  type: typeof CART_ACTION_TYPE.INC;
  kitItem: KitItem;
}

interface ResetAction {
  type: typeof CART_ACTION_TYPE.RESET;
}

interface DecAction {
  type: typeof CART_ACTION_TYPE.DEC;
  kitItem: KitItem;
}

interface DelAction {
  type: typeof CART_ACTION_TYPE.DEL;
  kitItem: KitItem;
}

interface CheckAction {
  type: typeof CART_ACTION_TYPE.CHECK;
  kitItem: KitItem;
}

export type CartAction =
  | AddAction
  | InitAction
  | IncAction
  | ResetAction
  | DecAction
  | DelAction
  | CheckAction;

const cartReducer = (state: Cart[], action: CartAction) => {
  const localCart = localStorage.getItem("cart");
  const prevCart: Cart[] = localCart ? JSON.parse(localCart) : [];

  switch (action.type) {
    case CART_ACTION_TYPE.ADD:
      const find = prevCart.find(
        (cart) => cart.kitItem.pd_id === action.cart.kitItem.pd_id
      );

      if (find) return [...prevCart];

      const addCart = [...prevCart, action.cart];
      localStorage.setItem("cart", JSON.stringify(addCart));

      return addCart;

    case CART_ACTION_TYPE.INC:
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
            checked: true,
          };

          newCart = [...prevCart, cartInfo];
        }
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      } else {
        const cartInfo = {
          kitItem: action.kitItem,
          count: 1,
          checked: true,
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

      const newCart = [...prevCart];
      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;

    case CART_ACTION_TYPE.DEL:
      const delCart = prevCart.filter(
        (item: Cart) => item.kitItem.pd_id !== action.kitItem.pd_id
      );

      localStorage.setItem("cart", JSON.stringify(delCart));
      return delCart;

    case CART_ACTION_TYPE.CHECK:
      prevCart.find((item: Cart) => {
        const exist = item.kitItem.pd_id === action.kitItem.pd_id;
        if (exist) {
          item.checked = !item.checked;
        }

        return exist;
      });

      const checkCart = [...prevCart];
      localStorage.setItem("cart", JSON.stringify(checkCart));

      return checkCart;

    default:
      throw new Error("Invalid action type");
  }
};

export { cartReducer };
