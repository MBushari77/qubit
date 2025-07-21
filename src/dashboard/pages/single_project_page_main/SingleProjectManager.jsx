import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { useNavigate } from "react-router-dom";

const SingleProjectManager = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    category_id: "0",
    title: "",
    subtitle: "",
    text: "",
    path: "",
    icon: null,
  });
  const [editForm, setEditForm] = useState({
    id: null,
    category_id: "0",
    title: "",
    subtitle: "",
    text: "",
    path: "",
    icon: null,
  });
  const [showModal, setShowModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/singleproject");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setForm({ ...form, icon: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setEditForm({ ...editForm, icon: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await API.post("/singleproject", formData);
      setForm({
        category_id: "",
        title: "",
        subtitle: "",
        text: "",
        path: "",
        icon: null,
      });
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/singleproject/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const openEditModal = (project) => {
    setEditForm({
      id: project.id,
      category_id: project.category_id,
      title: project.title,
      subtitle: project.subtitle,
      text: project.text,
      path: project.path,
      icon: null,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("subtitle", editForm.subtitle);
    formData.append("text", editForm.text);
    formData.append("path", editForm.path);
    if (editForm.icon) formData.append("icon", editForm.icon);

    try {
      await API.put(`/singleproject/${editForm.id}`, formData);
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Single Projects</h2>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Add New Project</h5>
        {["title", "subtitle", "text", "path"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
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
          Add Project
        </button>
      </div>

      <div className="row">
        {projects.map((proj) => (
          <div className="col-md-4 mb-4" key={proj.id}>
            <div className="card">
              <div className="card-body">
                <img
                  src={`${BaseAPI}/uploads/${proj.icon}`}
                  alt={proj.title}
                  width="100%"
                  style={{ objectFit: "cover", height: 150 }}
                />
                <h5 className="mt-2">{proj.title}</h5>
                <p className="text-muted">{proj.subtitle}</p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openEditModal(proj)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      navigate(`/dashboard/manage_singel_project/${proj.id}`)
                    }
                  >
                    Manage Project
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(proj.id)}
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
              <h5 className="modal-title">Edit Project</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {["title", "subtitle", "text", "path"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    name={field}
                    value={editForm[field]}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
              ))}
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

export default SingleProjectManager;
