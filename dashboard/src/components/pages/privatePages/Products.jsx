import React, { useState, useEffect, useContext } from "react";
import "../../../styles/AdminStyles.css";
import Sidebar from "../../section/navigation/Sidebar";
import ProductTable from "../../table/products/ProductTable";
import DropdownButton from "../../../lib/DropdownButton";
import { FaBars } from "react-icons/fa";
import ProductModal from "../../modal/products/ProductModal";
import EditProductModal from "../../modal/products/EditProductModal";
import DeleteModal from "../../modal/products/buttons/DeleteModal";
import DeleteSingleModal from "../../modal/products/buttons/DeleteSingleModal";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} from "../../../services/productService.js";

function Products() {
  const { user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteSingle, setDeleteSingle] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts(null, currentPage, itemsPerPage);
      setProducts(data.data);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage]);

  const handleAddProduct = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleSaveProduct = async (product) => {
    try {
      await addProduct(product);
      fetchProducts();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (id, formData) => {
    try {
      await updateProduct(id, formData);
      fetchProducts();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDeleteAll = () => setIsConfirmOpen(true);
  const handleConfirmDelete = async () => {
    try {
      await deleteAllProducts();
      setProducts([]);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("Failed to delete all products", error);
    }
  };
  const handleCancelDelete = () => setIsConfirmOpen(false);

  const handleDeleteOne = (product) => {
    setDeleteSingle(product);
  };

  const confirmDeleteOne = async () => {
    try {
      await deleteProduct(deleteSingle._id);
      fetchProducts();
      setDeleteSingle(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const cancelDeleteOne = () => {
    setDeleteSingle(null);
  };

  return (
    <div className="products">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Products</h1>
          <div className="user-info">
            <span>👤 {user?.manager_name || "Manager"}</span>
          </div>
          <div className="dropdown-toggle">
            <button className="hamburger" onClick={toggleDropdown}>
              <FaBars />
            </button>
            {dropdownOpen && <DropdownButton />}
          </div>
        </header>

        <div className="action-buttons">
          <button className="btn-primary" onClick={handleAddProduct}>
            ➕ Add Product
          </button>
          <button className="btn-danger" onClick={handleDeleteAll}>
            🗑️ Delete All
          </button>
        </div>

        {/* Per Page Dropdown */}
        <div className="pagination-controls">
          <label>
            Items per page:
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>

        <ProductTable
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteOne}
        />

        {/* Pagination Buttons */}
        <div className="action-buttons pagination-buttons">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn-filter ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {isModalOpen && (
          <ProductModal onClose={handleCloseModal} onSave={handleSaveProduct} />
        )}
        {isEditModalOpen && editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={handleCloseEditModal}
            onSave={handleUpdateProduct}
          />
        )}
        {isConfirmOpen && (
          <DeleteModal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        {deleteSingle && (
          <DeleteSingleModal
            productName={deleteSingle.product_name}
            onConfirm={confirmDeleteOne}
            onCancel={cancelDeleteOne}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
