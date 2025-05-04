import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ProductCard from "../../ui/ProductCard";

function Laptops() {
  const { products } = useContext(GlobalContext);

  const laptops = products.filter((product) =>
    product.categories?.some(
      (cat) => typeof cat === "string" && cat.toLowerCase().includes("laptop")
    )
  );

  return (
    <div className="product-list">
      {laptops.length > 0 ? (
        laptops.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found in Laptops category.</p>
      )}
    </div>
  );
}

export default Laptops;
