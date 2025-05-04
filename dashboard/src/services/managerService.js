import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/users",
  withCredentials: true,
});

// Register a new manager
export const registerManager = (managerData) => {
  return API.post("/manager/register", managerData);
};

// Login manager
export const loginManager = (credentials) => {
  return API.post("/manager/login", credentials);
};

// Forgot password
export const forgotPassword = (email) => {
  return API.post("/manager/forgot-password", { email });
};

// Reset password
export const resetPassword = (resetData) => {
  return API.put("/manager/reset-password", resetData);
};

// Get all users (including managers)
export const getAllUsers = () => {
  return API.get("/all");
};

// Update a manager by ID
export const updateManager = (id, updateData) => {
  return API.put(`/manager/update/${id}`, updateData);
};

// Delete a single manager
export const deleteManager = (id) => {
  return API.delete(`/manager/delete/${id}`);
};

// Delete all managers
export const deleteAllManagers = () => {
  return API.delete("/manager/delete-all");
};
