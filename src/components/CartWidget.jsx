import { useMemo } from "react";
import { useContext } from "react";
import cartLogo from "../assets/cart-logo.svg";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

export const CartWidget = () => {
  const { cartList } = useContext(CartContext);
  const quantity = useMemo(() => {
    return cartList.reduce((ac, el) => el.qty + ac, 0);
  }, [cartList]);

  return (
    <div className="flex absolute mr-10">
      <Link to="/cart">
        <img
          src={cartLogo}
          alt="cart logo"
          className="h-3 mr-0 sm:h-6 fill-white"
        />
      </Link>
      <span className="bg-red-600 w-4 h-4 rounded-full text-xs flex justify-center items-center relative top-3 right-3 text-white ">
        {quantity}
      </span>
    </div>
  );
};
