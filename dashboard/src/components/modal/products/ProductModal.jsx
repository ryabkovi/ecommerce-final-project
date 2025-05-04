import React, { useEffect, useState } from "react";
import "../../../styles/CategoryModal.css";
import { getCategories } from "../../../services/categoryService";

function AddProductModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    product_color: "",
    product_description: "",
    product_title: "",
    categories: "",
    product_image: null,
  });
  const [preview, setPreview] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategories().then(setCategoryList).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "product_image") {
      const file = files[0];
      setForm({ ...form, product_image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", form.product_name);
    formData.append("product_price", form.product_price);
    formData.append("product_color", form.product_color);
    formData.append("product_title", form.product_title);
    formData.append("product_description", form.product_description);
    formData.append("categories", JSON.stringify([form.categories]));
    if (form.product_image) {
      formData.append("product_image", form.product_image);
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Name:
            <input
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price:
            <input
              name="product_price"
              type="number"
              value={form.product_price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="product_description"
              value={form.product_description}
              onChange={handleChange}
            />
          </label>

          <label>
            Category:
            <select
              name="categories"
              value={form.categories}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Color:
            <input
              name="product_color"
              type="string"
              value={form.product_color}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Title:
            <input
              name="product_title"
              type="string"
              value={form.product_title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Image:
            <input
              name="product_image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="table-img"
              style={{ marginTop: "10px" }}
            />
          )}

          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
