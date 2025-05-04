import axios from "axios";

export const getAllProducts = async (
  categoryId = null,
  page = 1,
  limit = 6
) => {
  const params = new URLSearchParams();

  if (categoryId) params.append("category", categoryId);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const url = `http://localhost:3000/products/getAllProducts?${params.toString()}`;

  const res = await axios.get(url, {
    withCredentials: true,
  });

  return res.data;
};

export const addProduct = async (productData) => {
  const res = await axios.post(
    "http://localhost:3000/products/addProduct",
    productData,
    { withCredentials: true }
  );
  return res.data;
};

export const updateProduct = async (id, updateData) => {
  const res = await axios.put(
    `http://localhost:3000/products/updateProduct/${id}`,
    updateData,
    { withCredentials: true }
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `http://localhost:3000/products/deleteProduct/${id}`,
    { withCredentials: true }
  );
  return res.data;
};

export const deleteAllProducts = async () => {
  const res = await axios.delete("http://localhost:3000/products/deleteAll", {
    withCredentials: true,
  });
  return res.data;
};
