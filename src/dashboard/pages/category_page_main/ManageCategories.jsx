import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    icon: null,
  });
  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    icon: null,
  });
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setEditForm({ ...editForm, [name]: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    if (form.icon) formData.append("icon", form.icon);

    try {
      await API.post("/category/add", formData);
      setForm({ name: "", icon: null });
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/category/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const openEditModal = (cat) => {
    setEditForm({ id: cat.id, name: cat.name, icon: null });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    if (editForm.icon) formData.append("icon", editForm.icon);

    try {
      await API.put(`/category/${editForm.id}`, formData);
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Categories</h2>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Add New Category</h5>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Category Name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Icon</label>
          <input
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Category
        </button>
      </div>

      <div className="row">
        {categories?.map((cat) => (
          <div className="col-md-4 mb-4" key={cat.id}>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={`${BaseAPI}/uploads/${cat.icon}`}
                    alt={cat.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                  <strong>{cat.name}</strong>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => openEditModal(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/dashboard/categories/${cat.id}`}>
                    <button className="btn btn-sm btn-success">Manage</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Change Icon</label>
                <input
                  type="file"
                  name="icon"
                  accept="image/*"
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
