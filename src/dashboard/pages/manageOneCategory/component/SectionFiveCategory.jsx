import React, { useState, useEffect } from "react";
import API from "../../../../utils/API";
import BaseAPI from "../../../../utils/BaseAPI";

const SectionFiveCategory = ({ categoryId }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    paragraph: "",
    image: null,
  });
  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    paragraph: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await API.get(`/sectionfive/category/${categoryId}`);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching section five items:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = async () => {
    if (!form.name.trim()) return alert("Name is required");
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", form.name);
    formData.append("paragraph", form.paragraph);
    if (form.image) formData.append("image", form.image);

    try {
      await API.post("/sectionfive", formData);
      setForm({ name: "", paragraph: "", image: null });
      fetchItems();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const openEditModal = (item) => {
    setEditForm({
      id: item.id,
      name: item.name,
      paragraph: item.paragraph,
      image: null,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editForm.name.trim()) return alert("Name is required");
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("paragraph", editForm.paragraph);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      await API.put(`/sectionfive/${editForm.id}`, formData);
      setShowModal(false);
      fetchItems();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await API.delete(`/sectionfive/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Section Five (Category {categoryId})</h2>

      {/* Add Form */}
      <div className="card p-4 mb-4">
        <h5 className="card-title">Add New Item</h5>

        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Paragraph</label>
          <textarea
            name="paragraph"
            value={form.paragraph}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter paragraph"
          />
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

      {/* List */}
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          items.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100">
                {item.image && (
                  <img
                    src={`${BaseAPI}/uploads/${item.image}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text flex-grow-1">{item.paragraph}</p>
                  <div className="mt-auto d-flex gap-2">
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

      {/* Edit Modal */}
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
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Paragraph</label>
                <textarea
                  name="paragraph"
                  value={editForm.paragraph}
                  onChange={handleEditChange}
                  className="form-control"
                />
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

export default SectionFiveCategory;
