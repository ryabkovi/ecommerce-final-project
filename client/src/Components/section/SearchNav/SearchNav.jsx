import React, { useState, useContext, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { GlobalContext } from "../../../context/GlobalContext";
import "./SearchNav.css";
import { useNavigate } from "react-router-dom";

function SearchNav() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products = [] } = useContext(GlobalContext) || {};
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const itemRefs = useRef([]);

  function handleSearchInput(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = products.filter((product) =>
        product.product_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setSelectedItem(-1);
    } else {
      setFilteredProducts([]);
    }
  }

  function handleSelectProduct(product) {
    if (!product) return;
    setSearchTerm(product.product_name);
    setFilteredProducts([]);
    navigate(`/product/${product._id}`);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => {
        const newIndex = prev - 1;
        scrollToItem(newIndex);
        return newIndex;
      });
    } else if (
      e.key === "ArrowDown" &&
      selectedItem < filteredProducts.length - 1
    ) {
      setSelectedItem((prev) => {
        const newIndex = prev + 1;
        scrollToItem(newIndex);
        return newIndex;
      });
    } else if (
      e.key === "Enter" &&
      selectedItem >= 0 &&
      selectedItem < filteredProducts.length
    ) {
      handleSelectProduct(filteredProducts[selectedItem]);
    }
  }

  function scrollToItem(index) {
    requestAnimationFrame(() => {
      if (itemRefs.current[index]) {
        itemRefs.current[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredProducts([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="search-navbar">
      <div className="search-container" ref={dropdownRef}>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search-input"
            type="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" type="submit">
            <FaSearch />
          </button>
        </form>

        {filteredProducts.length > 0 && (
          <div className="filtered-products-list">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`filtered-product-item ${
                  selectedItem === index ? "highlighted" : ""
                }`}
                onClick={() => handleSelectProduct(product)}
                onMouseOver={() => setSelectedItem(index)}
              >
                {product.product_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default SearchNav;
