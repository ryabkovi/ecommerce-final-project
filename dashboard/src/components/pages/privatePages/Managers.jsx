import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import "../../../styles/AdminStyles.css";
import Sidebar from "../../section/navigation/Sidebar";
import ManagersTable from "../../table/managers/ManagersTable";
import { FaBars } from "react-icons/fa";
import DropdownButton from "../../../lib/DropdownButton";
import {
  deleteAllManagers,
  deleteManager,
  registerManager,
  updateManager,
  getAllUsers,
} from "../../../services/managerService";
import DeleteManagersModal from "../../modal/managers/buttons/DeleteManagersModal";
import ConfirmModal from "../../modal/managers/buttons/ConfirmModal";
import AddManagerModal from "../../modal/managers/AddManagerModal";
import EditManagerModal from "../../modal/managers/EditManagerModal";

function Managers() {
  const { user } = useContext(AuthContext);
  const [managers, setManagers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteOne, setDeleteOne] = useState(null);
  const [editManager, setEditManager] = useState(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchManagers = async () => {
    try {
      const res = await getAllUsers();
      const all = res.data.data || [];
      const onlyManagers = all.filter((m) => !m.user_lastName);
      setManagers(onlyManagers);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleDeleteAll = () => setConfirmDeleteAll(true);
  const confirmDelete = async () => {
    try {
      await deleteAllManagers();
      setConfirmDeleteAll(false);
      fetchManagers();
    } catch (err) {
      console.error("Failed to delete all managers:", err);
    }
  };

  const handleAdd = () => setShowAddModal(true);
  const handleSaveManager = async (form) => {
    try {
      await registerManager(form);
      setShowAddModal(false);
      fetchManagers();
    } catch (err) {
      console.error("Failed to add manager:", err);
    }
  };

  const handleEdit = (manager) => setEditManager(manager);
  const handleUpdateManager = async (id, form) => {
    try {
      await updateManager(id, form);
      setEditManager(null);
      fetchManagers();
    } catch (err) {
      console.error("Failed to update manager:", err);
    }
  };

  const handleDeleteOne = (manager) => setDeleteOne(manager);
  const confirmDeleteOne = async () => {
    try {
      await deleteManager(deleteOne._id);
      setDeleteOne(null);
      fetchManagers();
    } catch (err) {
      console.error("Failed to delete manager:", err);
    }
  };

  const cancelDelete = () => {
    setDeleteOne(null);
    setConfirmDeleteAll(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-toggle")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);
  return (
    <div className="managers">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Managers</h1>
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
          <button className="btn-primary" onClick={handleAdd}>
            ➕ Add Manager
          </button>
          <button className="btn-danger" onClick={handleDeleteAll}>
            🗑️ Delete All Managers
          </button>
        </div>

        <ManagersTable
          managers={managers}
          onEdit={handleEdit}
          onDelete={handleDeleteOne}
        />

        {showAddModal && (
          <AddManagerModal
            onClose={() => setShowAddModal(false)}
            onSave={handleSaveManager}
            defaultValues={{
              manager_name: "",
              manager_email: "",
              manager_password: "",
            }}
          />
        )}

        {editManager && (
          <EditManagerModal
            manager={editManager}
            onClose={() => setEditManager(null)}
            onSave={handleUpdateManager}
          />
        )}

        {deleteOne && (
          <DeleteManagersModal
            onCancel={cancelDelete}
            onConfirm={confirmDeleteOne}
            userName={deleteOne.manager_name}
          />
        )}

        {confirmDeleteAll && (
          <ConfirmModal
            title="Delete All Managers"
            message="Are you sure you want to delete all managers? This action cannot be undone."
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Managers;
