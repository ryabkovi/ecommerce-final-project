import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import CartModal from "../modal/CartModal";
import LoginModal from "../modal/LoginModal";
import SearchNav from "../section/SearchNav/SearchNav";
import SearchPopup from "../section/SearchNav/SearchPopup";
import Logo from "../../assets/logo/logo.png";
import "./Header.css";

function Header() {
  const {
    totalProducts = 0,
    favoriteItems = [],
    isLoading = false,
  } = useContext(GlobalContext);
  const { isAuth, user, logOut } = useContext(AuthContext);

  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const favoriteCount = isAuth
    ? user?.favorites?.length || 0
    : favoriteItems.length || 0;

  return (
    <header className="header">
      <div className="header-container">
        <div className="row align-items-center justify-content-between">
          {/* Logo */}
          <div className="col-4 col-md-3 d-flex align-items-center">
            <NavLink to="/">
              <img className="logo-img" src={Logo} alt="Logo" />
            </NavLink>
          </div>

          {/* Search Bar (Only on md and up) */}
          <div className="col-md-5 d-none d-md-flex justify-content-center">
            <SearchNav />
          </div>

          {/* Icons */}
          <div className="col-8 col-md-4 d-flex justify-content-end align-items-center gap-3">
            {/* Search on small screens */}
            <div className="d-md-none">
              <SearchPopup />
            </div>

            {/* Notifications */}
            <button className="icon-btn">
              <IoIosNotifications size={26} className="icon-hover" />
            </button>

            {/* Favorites */}
            <NavLink to="/favorites" className="icon-btn position-relative">
              <AiFillHeart size={26} className="icon-hover favorite-icon" />
              {favoriteCount > 0 && (
                <span className="favorite-badge badge bg-danger">
                  {favoriteCount}
                </span>
              )}
            </NavLink>

            {/* Cart */}
            <button
              className="icon-btn position-relative"
              onClick={() => setShowCart(true)}
              disabled={isLoading}
            >
              <BsCart3 size={26} className="icon-hover" />
              {totalProducts > 0 && (
                <span className="cart-badge badge bg-danger">
                  {totalProducts}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="icon-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FiUsers size={26} className="icon-hover" />
              </button>

              {showDropdown && (
                <div className="dropdown-menu show">
                  {isAuth ? (
                    <>
                      <div className="dropdown-header">
                        👋 Hi, {user?.user_firstName} {user?.user_lastName}
                      </div>
                      <NavLink to="/my-order" className="dropdown-item">
                        📦 My Orders
                      </NavLink>
                      <NavLink to="/payment-method" className="dropdown-item">
                        💳 Payment Methods
                      </NavLink>
                      <NavLink to="/account" className="dropdown-item">
                        ⚙️ Profile Settings
                      </NavLink>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={logOut}
                      >
                        🚪 Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={() => setShowLogin(true)}
                    >
                      🔐 Login / Sign Up
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CartModal show={showCart} handleClose={() => setShowCart(false)} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </header>
  );
}

export default Header;
