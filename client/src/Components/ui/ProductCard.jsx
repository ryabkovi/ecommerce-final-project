import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import "./ProductList.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, favoriteItems, toggleFavorite } =
    useContext(GlobalContext);

  const isFavorite = Array.isArray(favoriteItems)
    ? favoriteItems.some((item) => item?._id === product._id)
    : false;

  const rating = product.rating ? parseFloat(product.rating).toFixed(1) : "0.0";

  const handleNavigate = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="product-card" onClick={handleNavigate}>
      <div className="image-container">
        <img
          src={product.product_image}
          alt={product.product_name}
          className="product-image"
        />
        <button
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          {isFavorite ? (
            <FaHeart className="favorite-icon active" />
          ) : (
            <FaRegHeart className="favorite-icon" />
          )}
        </button>
      </div>

      <div className="product-info">
        <h2 className="product-name">{product.product_name}</h2>
        <p className="product-description">{product.product_description}</p>

        <div className="product-rating">
          <span className="rating-number">{rating}</span>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`star-icon ${
                i < Math.round(product.rating || 0) ? "filled" : ""
              }`}
            />
          ))}
        </div>

        <div className="product-actions">
          <span className="product-price">${product.product_price}</span>
          <button
            className="add-to-cart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
