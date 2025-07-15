import React, { useState, useEffect } from "react";
import API from "../../../../utils/API";
import BaseAPI from "../../../../utils/BaseAPI";

const SectionSixCategory = ({ categoryId }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    paragraph: "",
    image: null,
  });
  const [editForm, setEditForm] = useState({
    id: null,
    title: "",
    paragraph: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await API.get(`/sectionsix/category/${categoryId}`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleAdd = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("title", form.title);
    formData.append("paragraph", form.paragraph);
    if (form.image) formData.append("image", form.image);

    try {
      await API.post("/sectionsix", formData);
      setForm({ title: "", paragraph: "", image: null });
      fetchItems();
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add item");
    }
  };

  const openEditModal = (item) => {
    setEditForm({
      id: item.id,
      title: item.title,
      paragraph: item.paragraph,
      image: null,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editForm.title.trim()) {
      alert("Title is required");
      return;
    }
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("paragraph", editForm.paragraph);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      await API.put(`/sectionsix/${editForm.id}`, formData);
      setShowModal(false);
      fetchItems();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this item?")) return;
    try {
      await API.delete(`/sectionsix/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Section Six (Category {categoryId})</h2>

      {/* Add Form */}
      <div className="card p-4 mb-4">
        <h5 className="card-title">Add New Item</h5>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter title"
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

      {/* Cards */}
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
                    alt={item.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text flex-grow-1">{item.paragraph}</p>
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

      {/* Modal */}
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
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="form-control"
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
                Cancel
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

export default SectionSixCategory;
