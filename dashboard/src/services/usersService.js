import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/users",
  withCredentials: true,
});

// Register a new user
export const registerUser = (userData) => {
  return API.post("/register", userData);
};

// Login user
export const loginUser = (credentials) => {
  return API.post("/login", credentials);
};

// Forgot password
export const forgotUserPassword = (email) => {
  return API.post("/forgot-password", { email });
};

// Reset password
export const resetUserPassword = (resetData) => {
  return API.put("/reset-password", resetData);
};

// Get all users
export const getAllUsers = () => {
  return API.get("/all");
};

// Update a user by ID
export const updateUser = (id, updateData) => {
  return API.put(`/update-profile/${id}`, updateData);
};

// Delete a single user
export const deleteUser = (id) => {
  return API.delete(`/delete/${id}`);
};

// Delete all users
export const deleteAllUsers = () => {
  return API.delete("/delete-all");
};
