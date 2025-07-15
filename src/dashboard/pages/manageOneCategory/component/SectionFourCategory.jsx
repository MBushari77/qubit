import React, { useState, useEffect } from "react";
import API from "../../../../utils/API";
import BaseAPI from "../../../../utils/BaseAPI";

const SectionFourCategory = ({ categoryId }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    info: "",
    path: "",
    color: "",
    image: null,
  });

  const [editForm, setEditForm] = useState({
    id: null,
    title: "",
    info: "",
    path: "",
    color: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch items for category
  const fetchItems = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await API.get(`/sectionfour/category/${categoryId}`);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching section four items:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  // Handle input change for add form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Handle input change for edit form
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm((f) => ({ ...f, image: files[0] }));
    } else {
      setEditForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Add new item
  const handleAdd = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("title", form.title);
    formData.append("info", form.info);
    formData.append("path", form.path);
    formData.append("color", form.color);
    if (form.image) formData.append("image", form.image);

    try {
      await API.post("/sectionfour", formData);
      setForm({ title: "", info: "", path: "", color: "", image: null });
      fetchItems();
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item");
    }
  };

  // Open modal with item data for editing
  const openEditModal = (item) => {
    setEditForm({
      id: item.id,
      title: item.title,
      info: item.info,
      path: item.path,
      color: item.color,
      image: null, // new file can be uploaded if needed
    });
    setShowModal(true);
  };

  // Update existing item
  const handleUpdate = async () => {
    if (!editForm.title.trim()) {
      alert("Title is required");
      return;
    }
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("info", editForm.info);
    formData.append("path", editForm.path);
    formData.append("color", editForm.color);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      await API.put(`/sectionfour/${editForm.id}`, formData);
      setShowModal(false);
      fetchItems();
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update item");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await API.delete(`/sectionfour/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">
        Manage Section Four Items (Category {categoryId})
      </h2>

      {/* Add new item form */}
      <div className="card p-4 mb-4">
        <h5 className="card-title">Add New Item</h5>

        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Info</label>
          <textarea
            name="info"
            value={form.info}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter info"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Redirect Path</label>
          <input
            type="text"
            name="path"
            value={form.path}
            onChange={handleChange}
            className="form-control"
            placeholder="/redirect-path"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Color</label>
          <select
            name="color"
            value={form.color}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          Add Item
        </button>
      </div>

      {/* Items cards */}
      <div className="row">
        {loading ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items found for this category.</p>
        ) : (
          items.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100">
                {item.image && (
                  <img
                    src={`${BaseAPI}/uploads/${item.image}`}
                    className="card-img-top"
                    alt={item.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text flex-grow-1">{item.info}</p>
                  <p>
                    <a href={item.path} target="_blank" rel="noreferrer">
                      {item.path}
                    </a>
                  </p>
                  <span
                    className="badge"
                    style={{
                      backgroundColor:
                        item.color === "white" ? "whitesmoke" : "black",
                      color: item.color === "white" ? "black" : "white",
                    }}
                  >
                    {item.color || "No Color"}
                  </span>

                  <div className="mt-auto d-flex gap-2 pt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => setShowModal(false)}
      >
        <div
          className="modal-dialog"
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Item</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Info</label>
                <textarea
                  name="info"
                  value={editForm.info}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Redirect Path</label>
                <input
                  type="text"
                  name="path"
                  value={editForm.path}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Color</label>
                <select
                  name="color"
                  value={editForm.color}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="">Select color</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Change Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFourCategory;
