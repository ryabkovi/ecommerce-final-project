import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./NavigationBar.css";

function NavigationBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/categories/getCategories`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg p-3">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Dropdown for Categories */}
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-basic"
            className="d-flex align-items-center rounded-5 px-3"
          >
            <IoMdMenu size={20} className="me-2" />
            <span className="fs-6">ALL CATEGORIES</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Dropdown.Item
                  key={category._id}
                  as={NavLink}
                  to={`/category/${category._id}`}
                  state={{ categoryName: category.category_name }}
                >
                  {category.category_name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No categories available</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* Navigation Links */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">
                BLOG
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
