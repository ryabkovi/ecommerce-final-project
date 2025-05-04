import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const { favoriteItems, toggleFavorite } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleRemoveFavorite = (item) => {
    if (!item || !item._id) {
      console.error("❌ Invalid item in handleRemoveFavorite:", item);
      return;
    }
    toggleFavorite(item);
  };

  const handleNavigate = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

  return (
    <div className="favorites-page">
      <h2>My Favorites ❤️</h2>
      {favoriteItems.length === 0 ? (
        <p className="empty-message">No favorite items yet!</p>
      ) : (
        <div className="favorites-grid">
          {favoriteItems.map((item, index) =>
            item ? (
              <div
                onClick={() => handleNavigate(item)}
                key={item._id || index}
                className="favorite-card"
              >
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="favorite-image"
                />
                <h3>{item.product_name}</h3>
                <p className="price">
                  {typeof item.product_price === "number"
                    ? `$${item.product_price.toFixed(2)}`
                    : "N/A"}
                </p>
                <div className="remove-favorite">
                  <button
                    className="remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(item);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default Favorites;
