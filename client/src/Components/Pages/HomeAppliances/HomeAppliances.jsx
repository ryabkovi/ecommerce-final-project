import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ProductCard from "../../ui/ProductCard";

function HomeAppliances() {
  const { products } = useContext(GlobalContext);

  const homeAppliances = products.filter((product) =>
    product.categories?.some(
      (cat) =>
        typeof cat === "object" &&
        cat.category_name?.toLowerCase().includes("appliance")
    )
  );

  return (
    <div className="product-list">
      {homeAppliances.length > 0 ? (
        homeAppliances.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found in Home Appliances category.</p>
      )}
    </div>
  );
}

export default HomeAppliances;
