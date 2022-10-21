import { CartAction } from "config/reducer";
import { createContext, Dispatch } from "react";
import { Cart } from "types";

interface CartContext {
  state: Cart[];
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContext | null>(null);

export { CartContext };
