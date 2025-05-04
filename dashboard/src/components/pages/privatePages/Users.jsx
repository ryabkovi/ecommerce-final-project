import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import "../../../styles/AdminStyles.css";
import Sidebar from "../../section/navigation/Sidebar";
import UsersTable from "../../table/users/UsersTable";
import { FaBars } from "react-icons/fa";
import DropdownButton from "../../../lib/DropdownButton";
import {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../../../services/usersService";
import DeleteUsersModal from "../../modal/users/buttons/DeleteUsersModal";
import ConfirmUserModal from "../../modal/users/buttons/ConfirmUserModal";
import AddUserModal from "../../modal/users/AddUserModal";
import EditUserModal from "../../modal/users/EditUserModal";

function Users() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteOne, setDeleteOne] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      const all = res.data.data || [];
      const onlyUsers = all.filter((u) => !u.manager_name);
      setUsers(onlyUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleDeleteAll = () => setConfirmDeleteAll(true);
  const confirmDelete = async () => {
    try {
      await deleteAllUsers();
      setConfirmDeleteAll(false);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete all users:", err);
    }
  };

  const handleEdit = (user) => setEditUser(user);
  const handleUpdateUser = async (id, form) => {
    try {
      await updateUser(id, form);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDeleteOne = (user) => setDeleteOne(user);
  const confirmDeleteOne = async () => {
    try {
      await deleteUser(deleteOne._id);
      setDeleteOne(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
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
    <div className="users">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Users</h1>
          <div className="user-info">
            <span>👤 {user?.manager_name || "Admin"}</span>
          </div>
          <div className="dropdown-toggle">
            <button className="hamburger" onClick={toggleDropdown}>
              <FaBars />
            </button>
            {dropdownOpen && <DropdownButton />}
          </div>
        </header>

        <div className="action-buttons">
          <button className="btn-danger" onClick={handleDeleteAll}>
            🗑️ Delete All Users
          </button>
        </div>

        <UsersTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDeleteOne}
        />

        {editUser && (
          <EditUserModal
            user={editUser}
            onClose={() => setEditUser(null)}
            onSave={handleUpdateUser}
          />
        )}

        {deleteOne && (
          <DeleteUsersModal
            onCancel={cancelDelete}
            onConfirm={confirmDeleteOne}
            userName={deleteOne.user_name}
          />
        )}

        {confirmDeleteAll && (
          <ConfirmUserModal
            title="Delete All Users"
            message="Are you sure you want to delete all users? This action cannot be undone."
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Users;
