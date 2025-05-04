import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/categories`,
  withCredentials: true,
});

// GET all categories
export const getCategories = async () => {
  const res = await API.get("/getCategories");
  return res.data.data;
};

// ADD new category
export const addCategory = async (formData) => {
  const res = await API.post("/addCategory", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.category;
};

// UPDATE category
export const updateCategory = async (id, formData) => {
  await API.put(`/updateCategory/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE single category
export const deleteCategory = async (id) => {
  await API.delete(`/deleteCategory/${id}`);
};

export const deleteAllCategories = async () => {
  await API.delete("/deleteAllCategories");
};
