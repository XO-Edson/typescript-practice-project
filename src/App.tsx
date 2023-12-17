import Header from "./Header";
import Footer from "./Footer";
import ProductList from "./ProductList";
import { useState } from "react";
import Cart from "./Cart";

const App = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );
  return content;
};

export default App;
