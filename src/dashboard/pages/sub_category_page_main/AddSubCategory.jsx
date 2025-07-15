import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const AddSubCategory = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    text: "",
    path: "",
    banner: null,
    specsheet: null,
  });

  const [editForm, setEditForm] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await API.get("/sub_category");
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("text", form.text);
    formData.append("path", form.path);
    if (form.banner) formData.append("banner", form.banner);
    if (form.specsheet) formData.append("specsheet", form.specsheet);

    try {
      await API.post("/sub_category", formData);
      setForm({
        name: "",
        title: "",
        text: "",
        path: "",
        banner: null,
        specsheet: null,
      });
      fetchData();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const openEditModal = (item) => {
    setEditForm({
      ...item,
      banner: null,
      specsheet: null,
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEditForm({ ...editForm, [name]: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const updateItem = async () => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("title", editForm.title);
    formData.append("text", editForm.text);
    formData.append("path", editForm.path);
    if (editForm.banner) formData.append("banner", editForm.banner);
    if (editForm.specsheet) formData.append("specsheet", editForm.specsheet);

    try {
      await API.put(`/sub_category/${editForm.id}`, formData);
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/sub_category/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Sub Categories</h2>

      {/* ADD FORM */}
      <div className="card p-4 mb-5">
        <h5 className="mb-3">Add Sub Category</h5>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          className="form-control mb-3"
          placeholder="Name"
        />
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          className="form-control mb-3"
          placeholder="Title"
        />
        <textarea
          name="text"
          value={form.text}
          onChange={handleFormChange}
          className="form-control mb-3"
          placeholder="Text"
        />
        <input
          type="text"
          name="path"
          value={form.path}
          onChange={handleFormChange}
          className="form-control mb-3"
          placeholder="Path"
        />
        Banner
        <input
          type="file"
          name="banner"
          onChange={handleFormChange}
          className="form-control mb-3"
        />
        Specsheet
        <input
          type="file"
          name="specsheet"
          onChange={handleFormChange}
          className="form-control mb-3"
        />
        <button onClick={handleAdd} className="btn btn-primary">
          Add Sub Category
        </button>
      </div>

      {/* LIST */}
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card p-3">
              <img src={`${BaseAPI}/uploads/${item.banner}`} />
              <h5>{item.name}</h5>
              <p>{item.title}</p>
              <p>{item.text}</p>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => openEditModal(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <Link to={`/dashboard/sub_category/${item.id}`}>
                <button
                  className="btn btn-sm btn-success"
                  style={{ width: "100%" }}
                >
                  Manage
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {showModal && editForm && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Edit Sub Category</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                <textarea
                  name="text"
                  value={editForm.text}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                <input
                  name="path"
                  value={editForm.path}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                Banner
                <input
                  type="file"
                  name="banner"
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                Specsheet
                <input
                  type="file"
                  name="specsheet"
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={updateItem}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubCategory;
