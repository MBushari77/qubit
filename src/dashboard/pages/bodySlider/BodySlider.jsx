import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";

const BodySlider = () => {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    title: "",
    info: "",
    link: "",
    active: 1,
    image: null,
  });

  // for editing
  const [editForm, setEditForm] = useState({
    id: null,
    title: "",
    info: "",
    link: "",
    active: 1,
    image: null,
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm({ ...editForm, [name]: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("info", form.info);
    formData.append("link", form.link);
    formData.append("active", form.active);
    if (form.image) formData.append("image", form.image);

    try {
      await API.post("/bodyslider/add", formData);
      setForm({
        title: "",
        info: "",
        link: "",
        active: 1,
        image: null,
      });
      fetchBanners();
    } catch (err) {
      console.error("Error adding hero banner:", err);
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await API.get("/bodyslider");
      setBanners(res.data.banners);
    } catch (err) {
      console.error("Error fetching hero banners:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/bodyslider/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Error deleting hero banner:", err);
    }
  };

  const openEditModal = (banner) => {
    setEditForm({
      id: banner.id,
      title: banner.title,
      info: banner.info,
      link: banner.link,
      active: banner.active,
      image: null,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("info", editForm.info);
    formData.append("link", editForm.link);
    formData.append("active", editForm.active);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      await API.put(`/bodyslider/${editForm.id}`, formData);
      setShowModal(false);
      fetchBanners();
    } catch (err) {
      console.error("Error updating hero banner:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Home Cards Slider</h2>
      <div className="card p-4 mb-4">
        <h5 className="card-title">Add New Banner</h5>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Banner Title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Info</label>
          <textarea
            name="info"
            value={form.info}
            onChange={handleChange}
            className="form-control"
            placeholder="Banner Info"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Link</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Active</label>
          <select
            name="active"
            value={form.active}
            onChange={handleChange}
            className="form-select"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Banner
        </button>
      </div>

      <div className="row">
        {banners.map((banner) => (
          <div className="col-md-4 mb-4" key={banner.id}>
            <div className="card">
              <img
                src={`${BaseAPI}/uploads/${banner.image}`}
                alt={banner.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{banner.title}</h5>
                <p className="card-text">{banner.info}</p>
                <p>
                  <a href={banner.link} target="_blank" rel="noreferrer">
                    {banner.link}
                  </a>
                </p>
                <span
                  className={
                    banner.active ? "badge bg-success" : "badge bg-secondary"
                  }
                >
                  {banner.active ? "Active" : "Inactive"}
                </span>
                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openEditModal(banner)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(banner.id)}
                  >
                    Delete
                  </button>
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
              <h5 className="modal-title">Edit Banner</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
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
                <label className="form-label">Info</label>
                <textarea
                  name="info"
                  value={editForm.info}
                  onChange={handleEditChange}
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Link</label>
                <input
                  name="link"
                  value={editForm.link}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Active</label>
                <select
                  name="active"
                  value={editForm.active}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
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

export default BodySlider;
