import { useState } from "react";
import { Children, createContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartList, setcartList] = useState([]);
  const addToCart = (item) => {
    setcartList([item]);
  };
  return (
    <CartContext.Provider value={{ cartList, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
