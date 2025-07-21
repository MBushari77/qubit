import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    banner: null,
    specsheet: null,
    features: [{ title: "", image: null }],
  });

  const [editForm, setEditForm] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...form.features];
    updated[index][field] = value;
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, { title: "", image: null }],
    });
  };

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
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);
    if (form.banner) formData.append("banner", form.banner);
    if (form.specsheet) formData.append("specsheet", form.specsheet);

    const titles = form.features.map((f) => f.title);
    formData.append("feature_titles", JSON.stringify(titles));

    form.features.forEach((f) => {
      if (f.image) formData.append("feature_images", f.image);
    });

    try {
      await API.post("/products", formData);
      setForm({
        name: "",
        description: "",
        image: null,
        banner: null,
        specsheet: null,
        features: [{ title: "", image: null }],
      });
      fetchProducts();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const openEditModal = (product) => {
    setEditForm({
      ...product,
      oldImage: product.image,
      oldBanner: product.banner,
      oldSpecsheet: product.specsheet,
      features: product.features.map((f) => ({ ...f, image: null })),
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

  const handleEditFeatureChange = (index, field, value) => {
    const updated = [...editForm.features];
    updated[index][field] = value;
    setEditForm({ ...editForm, features: updated });
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    formData.append("oldImage", editForm.oldImage || "");
    formData.append("oldBanner", editForm.oldBanner || "");
    formData.append("oldSpecsheet", editForm.oldSpecsheet || "");
    if (editForm.image) formData.append("image", editForm.image);
    if (editForm.banner) formData.append("banner", editForm.banner);
    if (editForm.specsheet) formData.append("specsheet", editForm.specsheet);

    const titles = editForm.features.map((f) => f.title);
    formData.append("feature_titles", JSON.stringify(titles));

    editForm.features.forEach((f) => {
      if (f.image) formData.append("feature_images", f.image);
    });

    try {
      await API.put(`/products/${editForm.id}`, formData);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const addEditFeature = () => {
    setEditForm({
      ...editForm,
      features: [...editForm.features, { title: "", image: null }],
    });
  };

  const removeEditFeature = (index) => {
    const updated = [...editForm.features];
    updated.splice(index, 1);
    setEditForm({ ...editForm, features: updated });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Products</h2>

      {/* ADD FORM */}
      <div className="card p-4 mb-5">
        <h5 className="mb-3">Add New Product</h5>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          className="form-control mb-3"
          placeholder="Product Name"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleFormChange}
          className="form-control mb-3"
          placeholder="Description"
        />
        Image
        <input
          type="file"
          name="image"
          onChange={handleFormChange}
          className="form-control mb-3"
        />
        Banner
        <input
          type="file"
          name="banner"
          onChange={handleFormChange}
          className="form-control mb-3"
        />
        Sheet
        <input
          type="file"
          name="specsheet"
          onChange={handleFormChange}
          className="form-control mb-3"
        />
        <h6>Features</h6>
        {form.features.map((f, i) => (
          <div key={i} className="mb-3">
            <input
              type="text"
              placeholder="Feature Title"
              value={f.title}
              onChange={(e) => handleFeatureChange(i, "title", e.target.value)}
              className="form-control mb-1"
            />
            <input
              type="file"
              onChange={(e) =>
                handleFeatureChange(i, "image", e.target.files[0])
              }
              className="form-control"
            />
          </div>
        ))}
        <button onClick={addFeature} className="btn btn-secondary mb-3">
          Add Feature
        </button>
        <br />
        <button onClick={handleAdd} className="btn btn-primary">
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card p-3">
              <h5>{p.name}</h5>
              <p>{p.description}</p>
              {p.image && (
                <img
                  src={`${BaseAPI}/uploads/${p.image}`}
                  alt={p.name}
                  className="img-fluid mb-2"
                />
              )}
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => openEditModal(p)}
              >
                Edit
              </button>
              <p></p>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
              <p></p>
              <Link to={`/dashboard/product/${p.id}`}>
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
                <h5 className="modal-title">Edit Product</h5>
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
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                Image
                <input
                  type="file"
                  name="image"
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
                Spec Sheet
                <input
                  type="file"
                  name="specsheet"
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                <h6>Features</h6>
                {editForm.features.map((f, i) => (
                  <div
                    key={i}
                    className="mb-2 border rounded p-2 position-relative"
                  >
                    <input
                      type="text"
                      value={f.title}
                      onChange={(e) =>
                        handleEditFeatureChange(i, "title", e.target.value)
                      }
                      className="form-control mb-1"
                      placeholder="Feature Title"
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        handleEditFeatureChange(i, "image", e.target.files[0])
                      }
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute"
                      style={{ top: "5px", right: "5px" }}
                      onClick={() => removeEditFeature(i)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary my-2"
                  onClick={addEditFeature}
                >
                  Add Feature
                </button>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={updateProduct}>
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

export default AddProduct;
