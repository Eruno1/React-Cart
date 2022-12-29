import { useMemo } from "react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { toast } from "react-toastify";

const priceFormat = {
  style: "currency",
  currency: "USD",
};

export const Cart = () => {
  const { cartList, removeFromCart, emptyCart } = useContext(CartContext);
  const subTotal = useMemo(
    () => cartList.reduce((ac, elem) => elem.price * elem.qty + ac, 0),
    [cartList]
  );

  const handleClick = (id) => {
    removeFromCart(id);
  };

  const createOrder = () => {
    const itemsForDB = cartList.map((el) => ({
      id: el.id,
      title: el.name,
      price: el.price,
      qty: el.qty,
    }));

    cartList.forEach(async (item) => {
      const itemRef = doc(db, "products", item.id);
      await updateDoc(itemRef, {
        stock: increment(-item.qty),
      });
    });

    const order = {
      buyer: {
        name: "Leo Messi",
        email: "leo@messi.com",
        phone: "123456789",
      },
      total: subTotal,
      items: itemsForDB,
      date: serverTimestamp(),
    };

    const createOrderInFirestore = async () => {
      // Add a new document with a generated id
      const newOrderRef = doc(collection(db, "orders"));
      await setDoc(newOrderRef, order);
      return newOrderRef;
    };

    createOrderInFirestore()
      .then(
        (result) =>
          toast.success(
            "Se ha creado su orden con exito. Por favor, tome nota de su numero de orden.\n\n\nNúmero de orden: " +
              result.id +
              "\n\n"
          ),
        setTimeout(() => {
          emptyCart();
        }, 2000)
      )
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex justify-center mb-5 p-16 text-2xl font-bold relative">
        <h1>Tu carrito BelaStore 🛒</h1>
      </div>
      {cartList.length === 0 ? (
        <div className="flex justify-center">
          <div className="flex flex-col items-center pt-16 pb-16 m-10 mr-36 ml-36 bg-[#f2f2f2] rounded shadow-md border-black w-full">
            <div className="pb-8 m-2 mb-16 min-w-max">
              Tu carrito está vacío
            </div>
            <div className="m-4">
              ¿No sabés qué comprar? ¡Miles de productos te esperan!
            </div>
            <Link to="/">
              <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-non rounded-lg border border-gray-200 hover:bg-[#27375aad] hover:text-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-200 bg-[#475569]">
                Descubrir productos
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Link to="/" className="absolute top-36">
            <button className=" py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-non rounded-lg border border-gray-200 hover:bg-[#27375aad] hover:text-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-200 bg-[#475569]">
              Seguir compando
            </button>
          </Link>
          <button
            onClick={emptyCart}
            className="absolute right-[35%] top-[248 px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Borrar todos
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-[70%] justify-center flex-col w-full">
              <h1 className="text-center font-bold">Productos</h1>
              <ol>
                {cartList.map((item) => (
                  <li key={item.id} className="border-b-[1px] p-10 flex">
                    <img src={item.img} alt={item.name} width="200px" />
                    <div className="ml-6 flex justify-between flex-col w-full">
                      <div>
                        <p className="mt-5 text-2xl font-bold">{item.name}</p>
                        <h4>{item.desc}</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <h4>Cantidad: {item.qty}</h4>
                        <button
                          onClick={() => handleClick(item.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-[30%] flex-col w-full items-center shadow-lg h-fit sticky top-12 py-4 gap-4 mx-4 px-5">
              <h1 className="w-full text-center font-bold">
                Detalle de compra
              </h1>
              <ul className="flex items-center justify-center h-full flex-col w-full gap-7">
                {cartList.map((item) => (
                  <div
                    className="flex items-center w-full justify-between"
                    key={item.id}
                  >
                    <div className="flex gap-1 ">
                      <h2>{`${item.qty}x`}</h2>
                      <h2>
                        {item.name.length > 15
                          ? item.name.substring(0, 15) + "..."
                          : item.name}
                      </h2>
                    </div>

                    <h2 className="font-medium">
                      {" "}
                      {(item.qty * item.price).toLocaleString(
                        "en-US",
                        priceFormat
                      )}
                    </h2>
                  </div>
                ))}
              </ul>
              <div className="flex justify-between w-full border-t-2 font-bold pt-4">
                <h2>Subtotal</h2>
                <h2>{subTotal.toLocaleString("en-US", priceFormat)}</h2>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-11/12"
                onClick={createOrder}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
