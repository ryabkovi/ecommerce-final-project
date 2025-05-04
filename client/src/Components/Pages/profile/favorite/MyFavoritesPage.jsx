import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../../../context/GlobalContext";
import "../favorite/myFavorite.css";
import DeleteAccountModal from "../../../modal/DeleteAccountModal";

const MyFavoritesPage = () => {
  const { favoriteItems, toggleFavorite } = useContext(GlobalContext);

  return (
    <div className="my-favorites-page">
      {/* Sidebar */}
      <div className="sidebar">
        <NavLink to="/account" className="sidebar-item">
          <i className="fas fa-user"></i> Personal Info
        </NavLink>
        <NavLink to="/payment-method" className="sidebar-item">
          <i className="fas fa-credit-card"></i> Payment Methods
        </NavLink>
        <NavLink to="/MyOrder" className="sidebar-item">
          <i className="fas fa-box"></i> My Orders
        </NavLink>
        <NavLink to="/shipping-info" className="sidebar-item">
          <i className="fas fa-truck"></i> Shipping Info
        </NavLink>
        <NavLink to="/my-favorite" className="sidebar-item active">
          <i className="fas fa-star"></i> Favorites
        </NavLink>
        <DeleteAccountModal />
      </div>

      {/* Content */}
      <div className="content">
        <h2>My Favorites ❤️</h2>
        {favoriteItems.length === 0 ? (
          <p className="empty-message">No favorite items yet!</p>
        ) : (
          <div className="favorites-grid">
            {favoriteItems.map((item, index) => (
              <div key={item?._id || index} className="favorite-card">
                <img
                  src={item?.product_image}
                  alt={item?.product_name}
                  className="favorite-image"
                />
                <h3>{item?.product_name}</h3>
                <p className="price">
                  {typeof item?.product_price === "number"
                    ? `$${item.product_price.toFixed(2)}`
                    : "N/A"}
                </p>
                <div className="remove-favorite">
                  <button
                    className="remove-button"
                    onClick={() => toggleFavorite(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavoritesPage;
