import React from "react";
import Logo from "../assets/padel-logo.svg";
import { CartWidget } from "./CartWidget";
const links = [
  { id: 1, nombre: "Paleta" },
  { id: 2, nombre: "Zapatillas" },
  { id: 3, nombre: "Remeras" },
  { id: 4, nombre: "Pantalones" },
];

export const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 px-2 py-2.5 rounded dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between w-full">
        <div className="flex-1">
          <a href="https://flowbite.com/" className="flex items-center">
            <img src={Logo} className="h-6 mr-3 sm:h-9" alt="BelaStore Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              BelaStore
            </span>
          </a>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="#FFF"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto flex-1"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:justify-center">
            {links.map((objetos) => (
              <li key={objetos.id}>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                  aria-current="page"
                >
                  {objetos.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 md:flex justify-end items-center hidden">
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};
