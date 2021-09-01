import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Jumbotron from "../components/Jumbotron";

//import "/index.css"

const Home = () => {
  return (
    <div className="container">
      <Jumbotron />
      {<CategoryMenu />}
      <ProductList />
    </div>
  );
};

export default Home;
