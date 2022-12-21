import { useContext } from "react";
import { CartContext } from "./CartContext";

export const Cart = () => {
  const { cartList } = useContext(CartContext);
  console.log(carrito);
  return (
    <>
      <div>Tu carrito BelaStore 🛒</div>

      {cartList.length === 0 ? (
        <div>Tu carrito esta vacio!</div>
      ) : (
        <ol>
          {cartList.map((item) => (
            <li key={item.id} className="">
              {item.name}
            </li>
          ))}
        </ol>
      )}
    </>
  );
};
