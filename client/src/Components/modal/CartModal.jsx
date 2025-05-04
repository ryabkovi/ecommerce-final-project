import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import "./CartModal.css";
import { NavLink } from "react-router-dom";

function CartModal({ show, handleClose }) {
  const {
    cart = [],
    addToCart = () => {},
    decreaseQuantity = () => {},
    removeFromCart = () => {},
    totalPrice = 0,
  } = useContext(GlobalContext) || {};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="empty-cart-modal">Your cart is empty.</p>
        ) : (
          <div className="cart-items-modal">
            {cart.map((item) => (
              <div className="cart-item-modal" key={item._id}>
                {/* Product Image */}
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="cart-item-img-modal"
                />

                {/* Product Details */}
                <div className="cart-item-details-modal">
                  <h5>{item.product_name}</h5>
                  <p className="cart-item-price-modal">
                    ${(item.product_price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="cart-item-info-modal">
                  <div className="cart-quantity-modal">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>

                  {/* Remove Icon Button */}
                  <button
                    className="remove-btn-modal"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      {/* Footer Section */}
      <div className="cart-footer-modal">
        <span className="total-label-modal">Total</span>
        <span className="total-price-modal">${totalPrice.toFixed(2)}</span>
      </div>

      {/* Action Buttons */}
      <div className="cart-actions-modal">
        <NavLink
          to="/checkout"
          className="checkout-btn-modal"
          onClick={handleClose}
        >
          Checkout
        </NavLink>
        <NavLink
          to="/shopping-cart"
          className="view-cart-btn-modal"
          onClick={handleClose}
        >
          View Cart
        </NavLink>
      </div>
    </Modal>
  );
}

export default CartModal;
