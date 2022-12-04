import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { products } from "../utils/products";
import { Spinner } from "./Spinner";

export const ItemListContainer = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { idCategory } = useParams();
  const filterData = () => {
    if (idCategory) {
      const filteredData = products.filter(
        (items) => items.category === Number(idCategory)
      );
      return filteredData;
    } else {
      return products;
    }
  };
  const fetchProducts = async () => {
    const productList = await customFetch(2000, filterData());
    setData(productList);
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    fetchProducts();
  }, [idCategory]);

  if (loader) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap justify-center items-center">
      {data.map((item) => {
        return (
          <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-5 self-stretch"
            key={item.id}
          >
            <div>
              <img
                className="rounded-t-lg object-cover max-h-96 w-full aspect-square"
                src={item.img}
                alt=""
              />
            </div>
            <div className="p-5 flex flex-col justify-between h-fit min-h-[220px]">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
              </div>
              <div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pt-6">
                  {item.description.length > 30
                    ? item.description.substring(0, 30) + "..."
                    : item.description}
                </p>
                <Link
                  to={`/item/${item.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-w-max"
                >
                  Detalles
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
