import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { GlobalContext } from "../../context/GlobalContext";
import "./ProductList.css";

function ProductList() {
  const { products = [] } = useContext(GlobalContext);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products
          .slice(0, 4)
          .map((product) => <ProductCard key={product._id} product={product} />)
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ProductList;
