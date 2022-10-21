import { useEffect, useReducer } from "react";
import { cartReducer } from "config/reducer";
import { CartContext } from "config/context";

interface Props {
  children: React.ReactNode;
}

const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  const value = {
    state,
    dispatch,
  };

  useEffect(() => {
    const init = localStorage.getItem("cart") || "[]";
    dispatch({ type: "INIT", cartList: JSON.parse(init) });
  }, []);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
