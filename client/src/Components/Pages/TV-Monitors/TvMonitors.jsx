import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ProductCard from "../../ui/ProductCard";

function Tv() {
  const { products } = useContext(GlobalContext);

  const tvProducts = products.filter((product) =>
    product.categories?.some(
      (cat) =>
        typeof cat === "object" && cat.category_name?.toLowerCase() === "tv"
    )
  );

  return (
    <div className="product-list">
      {tvProducts.length > 0 ? (
        tvProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found in TV category.</p>
      )}
    </div>
  );
}

export default Tv;
