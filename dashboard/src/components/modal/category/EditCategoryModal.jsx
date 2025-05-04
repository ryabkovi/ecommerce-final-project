import React, { useState, useEffect } from "react";
import "../../../styles/CategoryModal.css";

function EditCategoryModal({ onClose, onSave, category }) {
  const [category_name, setCategoryName] = useState("");
  const [category_image, setCategoryImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name);
      setPreview(category.category_image || null);
    }
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", category_name);
    if (category_image) {
      formData.append("category_image", category_image);
    }
    onSave(category._id, formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Name:
            <input
              type="text"
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </label>

          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Category preview"
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

export default EditCategoryModal;
