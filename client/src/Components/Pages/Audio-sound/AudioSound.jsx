import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ProductCard from "../../ui/ProductCard";

function AudioSound() {
  const { products } = useContext(GlobalContext);

  const audioSound = products.filter(
    (product) =>
      product.categories?.[0]?.category_name?.toLowerCase() === "audio"
  );

  return (
    <div className="product-list">
      {audioSound.length > 0 ? (
        audioSound.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found in Audio & Sound category.</p>
      )}
    </div>
  );
}

export default AudioSound;
