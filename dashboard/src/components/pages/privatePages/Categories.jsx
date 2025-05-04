import React, { useState, useEffect, useContext } from "react";
import "../../../styles/AdminStyles.css";
import Sidebar from "../../section/navigation/Sidebar";
import CategoryTable from "../../table/categories/CategoryTable";
import DropdownButton from "../../../lib/DropdownButton";
import { FaBars } from "react-icons/fa";
import AddCategoryModal from "../../modal/category/CategoryModal";
import EditCategoryModal from "../../modal/category/EditCategoryModal";
import DeleteModal from "../../modal/category/buttons/DeleteModal";
import DeleteSingleModal from "../../modal/category/buttons/DeleteSingleModal";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from "../../../services/categoryService.js";

function Categories() {
  const { user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteSingle, setDeleteSingle] = useState(null);
  const [categories, setCategories] = useState([]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleSaveCategory = async (category) => {
    try {
      const newCat = await addCategory(category);
      setCategories((prev) => [...prev, newCat]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (id, formData) => {
    try {
      await updateCategory(id, formData);
      const data = await getCategories();
      setCategories(data);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update category:", err);
    }
  };

  const handleDeleteAll = () => setIsConfirmOpen(true);

  const handleConfirmDelete = async () => {
    try {
      await deleteAllCategories();
      setCategories([]);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("Failed to delete all categories", error);
    }
  };

  const handleCancelDelete = () => setIsConfirmOpen(false);

  const handleDeleteOne = (category) => {
    setDeleteSingle(category);
  };

  const confirmDeleteOne = async () => {
    try {
      await deleteCategory(deleteSingle._id);
      setCategories(categories.filter((cat) => cat._id !== deleteSingle._id));
      setDeleteSingle(null);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const cancelDeleteOne = () => {
    setDeleteSingle(null);
  };

  return (
    <div className="categories">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Categories</h1>
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
          <button className="btn-primary" onClick={handleAddCategory}>
            ➕ Add Category
          </button>
          <button className="btn-danger" onClick={handleDeleteAll}>
            🗑️ Delete All
          </button>
        </div>

        <CategoryTable
          categories={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteOne}
        />

        {isModalOpen && (
          <AddCategoryModal
            onClose={handleCloseModal}
            onSave={handleSaveCategory}
          />
        )}
        {isEditModalOpen && editCategory && (
          <EditCategoryModal
            category={editCategory}
            onClose={handleCloseEditModal}
            onSave={handleUpdateCategory}
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
            categoryName={deleteSingle.category_name}
            onConfirm={confirmDeleteOne}
            onCancel={cancelDeleteOne}
          />
        )}
      </div>
    </div>
  );
}

export default Categories;
