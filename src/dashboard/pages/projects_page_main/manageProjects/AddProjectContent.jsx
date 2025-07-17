import React, { useState, useEffect } from "react";
import API from "../../../../utils/API";

const AddProjectContent = () => {
  const [sliders, setSliders] = useState([]);
  const [form, setForm] = useState({
    icon: "",
    title: "",
    info: "",
    link: "",
  });

  // for edit modal
  const [editForm, setEditForm] = useState({
    id: null,
    icon: "",
    title: "",
    info: "",
    link: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      await API.post("/projectcontentslider/add", form);
      setForm({ icon: "", title: "", info: "", link: "" });
      fetchSliders();
    } catch (err) {
      console.error("Error adding slider", err);
    }
  };

  const fetchSliders = async () => {
    try {
      const res = await API.get("/projectcontentslider");
      setSliders(res.data.sliders);
    } catch (err) {
      console.error("Error fetching sliders", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projectcontentslider/${id}`);
      fetchSliders();
    } catch (err) {
      console.error("Error deleting slider", err);
    }
  };

  const openEditModal = (slider) => {
    setEditForm(slider);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/projectcontentslider/${editForm.id}`, editForm);
      setShowModal(false);
      fetchSliders();
    } catch (err) {
      console.error("Error updating slider", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage Home Content Sliders</h2>
      <div className="card p-4 mb-4">
        <h5>Add New Slider</h5>
        <div className="mb-3">
          <label className="form-label">Icon (Bootstrap name)</label>
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. bi-alarm"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Info</label>
          <textarea
            name="info"
            value={form.info}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Link</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Slider
        </button>
      </div>

      <div className="row">
        {sliders?.map((slider) => (
          <div key={slider.id}>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <i className={`bi bi-${slider.icon} fs-1`}></i>
                  <h5 className="card-title mt-2">{slider.title}</h5>
                  <p className="card-text">{slider.info}</p>
                  <p>
                    <a href={slider.link} target="_blank" rel="noreferrer">
                      {slider.link}
                    </a>
                  </p>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openEditModal(slider)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(slider.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Slider</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Icon</label>
                  <input
                    name="icon"
                    value={editForm.icon}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
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
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProjectContent;
