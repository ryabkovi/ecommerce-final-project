import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { FaSearch } from "react-icons/fa";
import { GlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./SearchPopup.css";

function SearchPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { products = [] } = useContext(GlobalContext) || {};

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "Enter" && searchTerm.trim()) {
        const match = products.find((product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (match) {
          navigate(`/product/${match._id}`);
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchTerm, products, navigate]);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-popup-container" ref={searchRef}>
      <button
        className="search-icon"
        onClick={toggleSearch}
        aria-label="Open search"
      >
        <FaSearch size={24} />
      </button>

      {isOpen && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            aria-label="Search input"
          />
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
          >
            ✕
          </button>
          {searchTerm && (
            <ul className="search-results">
              {filteredProducts.slice(0, 5).map((product) => (
                <li
                  key={product._id}
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                    setIsOpen(false);
                  }}
                >
                  {product.product_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPopup;
