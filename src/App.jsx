import ItemListContainer from "./components/ItemListContainer";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="ItemListContainer" />
    </>
  );
};
