import React, { useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ShoppingCart.css";
import { GlobalContext } from "../../../context/GlobalContext.jsx";
import { NavLink } from "react-router-dom";

function ShoppingCart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, totalPrice } =
    useContext(GlobalContext);

  return (
    <section className="h-auto gradient-custom">
      <div className="container py-5">
        {cart.length === 0 ? (
          <p className="empty-shopping-cart">Your shopping cart is empty.</p>
        ) : (
          <div className="row my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cart.length} items</h5>
                </div>
                <div className="card-body">
                  {cart.map((item) => (
                    <div className="row cart-item" key={item._id}>
                      {/* Product Image */}
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <img
                          src={item.product_image}
                          className="w-100"
                          alt={item.product_name}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="justify-content-center col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{item.product_name}</strong>
                        </p>
                        <p>Description: {item.product_description || "N/A"}</p>

                        <div className="fluid-btn-container">
                          <div className="button-container">
                            <button
                              className="btn btn-primary btn-sm"
                              title="Remove item"
                              onClick={() => removeFromCart(item._id)}
                            >
                              <i className="fas fa-trash" />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              title="Move to wishlist"
                            >
                              <i className="fas fa-heart" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Price Section */}
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="quantity-price-container">
                          {/* Quantity Controls */}
                          <div className="d-flex mb-2">
                            <button
                              className="dq btn btn-primary me-2"
                              onClick={() => decreaseQuantity(item._id)}
                            >
                              <i className="fas fa-minus" />
                            </button>
                            <span className="quantity-box">
                              {item.quantity}
                            </span>
                            <button
                              className="iq btn btn-primary ms-2"
                              onClick={() => addToCart(item)}
                            >
                              <i className="fas fa-plus" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-start text-md-center">
                            <strong>
                              ${(item.product_price * item.quantity).toFixed(2)}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="card mb-4">
                <div className="card-body">
                  <p>
                    <strong>Expected delivery</strong>
                  </p>
                  <p className="mb-0">12.10.2024 - 14.10.2024</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="card mb-4 mb-lg-0">
                <div className="card-body">
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQNLXl3jfcXtasbERHWaGpbc4tKs8sldzktA&s"
                    alt="PayPal"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products <span>${totalPrice.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping <span>Free</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total (including VAT)</strong>
                      </div>
                      <span>
                        <strong>${totalPrice.toFixed(2)}</strong>
                      </span>
                    </li>
                  </ul>
                  <NavLink
                    to="/checkout"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Go to checkout
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ShoppingCart;
