import { CartAction } from "config/reducer";
import { createContext, Dispatch, SetStateAction } from "react";
import { AddNull, Cart, Order } from "types";

interface CartContext {
  state: Cart[];
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContext | null>(null);

interface OrderContext {
  order: AddNull<Order>;
  setOrder: Dispatch<SetStateAction<AddNull<Order>>>;
}

const OrderContext = createContext<OrderContext | null>(null);

export { CartContext, OrderContext };
