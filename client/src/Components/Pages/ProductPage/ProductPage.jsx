import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const {
    products = [],
    addToCart,
    toggleFavorite,
    favoriteItems,
  } = useContext(GlobalContext) || {};

  const product = products.find((product) => product._id === id);

  if (!product) {
    return <div className="product-page-not-found">Product not found</div>;
  }

  const isFavorite = favoriteItems.some((item) => item?._id === product._id);
  const categoryList =
    product.categories?.map((cat) => cat.category_name) || [];

  return (
    <div className="product-page-container">
      {/* Product Image */}
      <div className="product-page-image-container">
        <img
          src={product.product_image}
          alt={product.product_name}
          className="product-page-image"
        />
      </div>

      {/* Product Details */}
      <div className="product-page-details">
        <h1 className="product-page-title">{product.product_name}</h1>
        <p className="product-page-description">
          {product.product_description}
        </p>

        {/* Rating */}
        <div className="product-page-rating">
          <span className="product-page-rating-number">
            {product.rating ? product.rating.toFixed(1) : "0.0"}
          </span>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`product-page-star-icon ${
                i < Math.round(product.rating || 0) ? "filled" : ""
              }`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="product-page-price">
          ${product.product_price}
          {product.discount && (
            <span className="product-page-discount">-{product.discount}%</span>
          )}
        </div>

        {/* Add to Cart & Favorite */}
        <div className="product-page-actions">
          <button
            className="product-page-add-to-cart"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart /> Add to Cart
          </button>
          <button
            className={`product-page-favorite-btn ${
              isFavorite ? "active" : ""
            }`}
            onClick={() => toggleFavorite(product)}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Product Info */}
        <ul className="product-page-info">
          <li>
            <strong>Title:</strong> {product.product_title || "N/A"}
          </li>
          <li>
            <strong>Model:</strong> {product.model || "N/A"}
          </li>
          <li>
            <strong>Color:</strong> {product.product_color || "N/A"}
          </li>
          <li>
            <strong>Categories:</strong>{" "}
            {categoryList.length > 0 ? categoryList.join(", ") : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductPage;
