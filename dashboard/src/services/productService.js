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

  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/products/getAllProducts?${params.toString()}`;

  const res = await axios.get(url, {
    withCredentials: true,
  });

  return res.data;
};

export const addProduct = async (productData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/products/addProduct`,
    productData,
    { withCredentials: true }
  );
  return res.data;
};

export const updateProduct = async (id, updateData) => {
  const res = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/products/updateProduct/${id}`,
    updateData,
    { withCredentials: true }
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/products/deleteProduct/${id}`,
    { withCredentials: true }
  );
  return res.data;
};

export const deleteAllProducts = async () => {
  const res = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/products/deleteAll`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
