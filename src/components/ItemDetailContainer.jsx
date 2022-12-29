import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { Spinner } from "./Spinner";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export const ItemDetailContainer = () => {
  const [data, setData] = useState({});
  const [itemQty, setItemQty] = useState(0);
  const [loader, setLoader] = useState(true);
  const { idItem } = useParams();
  const [buyState, setBuyState] = useState(true);
  const { addToCart } = useContext(CartContext);

  const detailProducts = async () => {
    const docRef = doc(db, "products", idItem);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData({ id: idItem, ...docSnap.data() });
      setLoader(false);
    } else {
      console.log("No hay tal documento");
    }
  };

  const decreaseQty = () => {
    if (itemQty <= 1) {
      toast.info("Agregar por lo menos 1 item.");
    } else {
      setItemQty(itemQty - 1);
    }
  };

  const incrementQty = () => {
    if (itemQty >= data.stock) {
      toast.info("No hay mas stock!");
    } else {
      setItemQty(itemQty + 1);
    }
  };

  const onAdd = () => {
    toast.success(`Se agrego exitosamente al carrito ${data.name}`);
    addToCart(data, itemQty);

    setBuyState(false);
  };

  useEffect(() => {
    detailProducts();

    setLoader(true);
  }, [idItem]);

  if (loader) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={data.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.name}
            </h1>
            <div className="flex mb-4"></div>
            <p className="leading-relaxed">{data.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="title-font font-medium text-2xl text-gray-900">
              {data.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <div className="flex gap-3 mt-4">
              <div className="flex items-center gap-2">
                <button
                  className="flex ml-auto text-black font-bold border-[1px]  px-2 w-[30px] h-[30px] focus:outline-none hover:text-gray-700 hover:bg-gray-200 rounded text-xl items-center justify-center"
                  onClick={decreaseQty}
                >
                  -
                </button>
                <span type="text" className="max-w-[30px] text-center">
                  {itemQty}
                </span>
                <button
                  className="flex ml-auto text-black font-bold border-[1px] px-2 w-[30px] h-[30px] focus:outline-none hover:text-gray-700 hover:bg-gray-200 rounded text-xl items-center justify-center"
                  onClick={incrementQty}
                >
                  +
                </button>
              </div>
              {buyState ? (
                <button
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                  onClick={onAdd}
                  disabled={itemQty <= 0 ? true : false}
                >
                  Comprar
                </button>
              ) : (
                <Link
                  to={"/cart"}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  <button>Checkout</button>
                </Link>
              )}

              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 hover:fill-current hover:text-red-600"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="mt-2">Stock disponible: {data.stock - itemQty}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
