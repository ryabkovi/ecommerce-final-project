import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ProductCard from "../../ui/ProductCard";
import Loading from "../../fallback/Loading";

function Gaming() {
  const { products } = useContext(GlobalContext);

  const gaming = products.filter(
    (product) =>
      product.category_name?.toLowerCase() === "gaming" ||
      product.categories?.some((cat) =>
        cat.name?.toLowerCase().includes("gaming")
      )
  );

  return (
    <div className="product-list">
      {!products.length ? (
        <Loading />
      ) : gaming.length > 0 ? (
        gaming.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found in Gaming category.</p>
      )}
    </div>
  );
}

export default Gaming;
