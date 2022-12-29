import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const emptyCart = () => {
    setCartList([]);
  };

  const removeFromCart = (id) => {
    const filteredArray = cartList.filter((el) => el.id !== id);
    setCartList(filteredArray);
  };

  const addToCart = (item, qty) => {
    let found = cartList.find((product) => product.idItem === item.id);
    if (found === undefined) {
      setCartList([
        ...cartList,
        {
          id: item.id,
          img: item.img,
          name: item.name,
          price: item.price,
          qty: qty,
          desc: item.description,
        },
      ]);
    } else {
      found.qtyItem += qty;
      setCartList([...cartList]);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartList, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
