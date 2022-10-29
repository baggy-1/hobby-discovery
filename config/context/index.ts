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

interface StoreMainContext {
  sort: string;
  pageIndex: number;
}

const StoreMainContext = createContext<StoreMainContext>({
  sort: "all",
  pageIndex: 1,
});

interface StoreDetailContext {
  id: string;
}

const StoreDetailContext = createContext<StoreDetailContext | null>(null);

export { CartContext, OrderContext, StoreMainContext, StoreDetailContext };
