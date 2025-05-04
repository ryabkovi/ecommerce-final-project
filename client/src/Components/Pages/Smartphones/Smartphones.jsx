import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ProductCard from "../../ui/ProductCard";

function Smartphones() {
  const { products } = useContext(GlobalContext);

  const smartphones = products.filter((product) =>
    product.categories?.some(
      (cat) =>
        typeof cat === "object" && cat.category_name?.toLowerCase() === "mobile"
    )
  );

  return (
    <div className="product-list">
      {smartphones.length > 0 ? (
        smartphones.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found in Smartphones category.</p>
      )}
    </div>
  );
}

export default Smartphones;
