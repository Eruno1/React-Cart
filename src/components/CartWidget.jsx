import React from "react";
import cartLogo from "../assets/cart-logo.svg";

export const CartWidget = () => {
  return (
    <div className="flex absolute mr-10">
      <img
        src={cartLogo}
        alt="cart logo"
        className="h-3 mr-0 sm:h-6 fill-white"
      />
      <span className="bg-red-600 w-4 h-4 rounded-full text-xs flex justify-center items-center relative top-3 right-3 text-white ">
        2
      </span>
    </div>
  );
};
