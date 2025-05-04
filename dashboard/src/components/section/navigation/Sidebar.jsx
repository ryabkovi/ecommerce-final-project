import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/AdminStyles.css";
import { AuthContext } from "../../../contexts/AuthContext";

function Sidebar() {
  const { logOut } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <h2 className="logo">ClickShop</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" className="side-bar-btn">
              🏠 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className="side-bar-btn">
              📊 Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/managers" className="side-bar-btn">
              👥 Managers
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className="side-bar-btn">
              👤 Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="side-bar-btn">
              🛒 Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className="side-bar-btn">
              📦 Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className="side-bar-btn">
              💬 Feedback
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="side-bar-btn">
              ⚙️ Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={logOut} className="side-bar-btn">
              🚪 Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar;
