import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../../../Components/ui/ProductCard";
import axios from "axios";

function CategoryProductsPage() {
  const { categoryId } = useParams();
  const location = useLocation();
  const passedCategoryName = location.state?.categoryName || "";

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(passedCategoryName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/products/getAllProducts?category=${categoryId}`,
          { withCredentials: true }
        );
        setProducts(data.data);

        if (
          !passedCategoryName &&
          data.data.length > 0 &&
          data.data[0].categories?.length > 0
        ) {
          const firstCategory = data.data[0].categories[0];
          setCategoryName(firstCategory.category_name || "Category");
        }
      } catch (err) {
        console.error("Error loading category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId, passedCategoryName]);

  useEffect(() => {
    if (location.state?.categoryName) {
      setCategoryName(location.state.categoryName);
    }
  }, [location.state?.categoryName, categoryId]);

  return (
    <div className="category-products">
      <h2 style={{ textAlign: "center" }}>
        {categoryName ? `${categoryName} Products` : "Category Products"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProductsPage;
