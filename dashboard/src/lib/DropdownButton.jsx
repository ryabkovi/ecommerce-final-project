import React, { useContext } from "react";
import "../styles/DropdownButton.css";
import "../styles/AdminStyles.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function DropdownButton() {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="dropdown-menu-custom">
      <ul>
        <li>
          <NavLink to="/dashboard" className="dropdown-link">
            🏠 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className="dropdown-link">
            📊 Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="dropdown-link">
            👥 Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="dropdown-link">
            🛒 Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="dropdown-link">
            📦 Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="dropdown-link">
            ⚙️ Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="dropdown-link" onClick={logOut}>
            🚪 Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DropdownButton;
