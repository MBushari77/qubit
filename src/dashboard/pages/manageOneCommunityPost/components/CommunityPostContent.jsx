import React, { useEffect, useState } from "react";
import API from "../../../../utils/API";
import BaseAPI from "../../../../utils/BaseAPI";

const CommunityPostContent = ({ subCategoryId }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    text: "",
    path: "",
    icon: null,
  });
  const [preview, setPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await API.get(`/communityonepost/category/${subCategoryId}`);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items");
    }
  };

  useEffect(() => {
    if (subCategoryId) fetchItems();
  }, [subCategoryId]);

  const openModal = (item = null) => {
    if (item) {
      setForm({
        id: item.id,
        title: item.title,
        text: item.text,
        path: item.path,
        icon: null,
      });
      setPreview(`/uploads/${item.icon}`);
    } else {
      setForm({ id: null, title: "", text: "", path: "", icon: null });
      setPreview(null);
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, icon: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.text || !form.path) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", subCategoryId);
    formData.append("title", form.title);
    formData.append("text", form.text);
    formData.append("path", form.path);
    if (form.icon) formData.append("icon", form.icon);

    try {
      if (form.id) {
        await API.put(`/communityonepost/${form.id}`, formData);
        alert("Item updated");
      } else {
        await API.post(`/communityonepost`, formData);
        alert("Item added");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      alert("Failed to save item");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await API.delete(`/communityonepost/${id}`);
      fetchItems();
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">Three Tickets Section</h4>
      <button className="btn btn-primary mb-3" onClick={() => openModal(null)}>
        + Add New
      </button>

      {modalOpen && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "#00000088" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {form.id ? "Edit Item" : "Add New Item"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Text *</label>
                    <textarea
                      className="form-control"
                      name="text"
                      value={form.text}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Path *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="path"
                      value={form.path}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Icon {form.id ? "(Upload to change)" : "*"}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="icon"
                      onChange={handleFileChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-2"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {form.id ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {items.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100">
              {item.icon && (
                <img
                  src={`${BaseAPI}/uploads/${item.icon}`}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: 200, objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.text}</p>
                <p className="card-text text-muted">
                  <small>Path: {item.path}</small>
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => openModal(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPostContent;
