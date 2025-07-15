import React, { useEffect, useState } from "react";
import API from "../../../../utils/API";
import BaseAPI from "../../../../utils/BaseAPI";

const ProjectProducts = () => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    title: "",
    text: "",
    link: "",
    moreInfo: "",
    image: null,
    icons: [{ icon: "", title: "" }],
    features: [{ text: "", value: false }],
    sizes: [""],
  });
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/project_product");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setForm({
        ...product,
        image: null,
        icons: Array.isArray(product.icons)
          ? product.icons
          : JSON.parse(product.icons || "[]"),
        features: Array.isArray(product.features)
          ? product.features
          : JSON.parse(product.features || "[]"),
        sizes: Array.isArray(product.sizes)
          ? product.sizes
          : JSON.parse(product.sizes || "[]"),
      });

      setPreview(product.image ? `${BaseAPI}/uploads/${product.image}` : null);
    } else {
      setForm({
        id: null,
        name: "",
        title: "",
        text: "",
        link: "",
        moreInfo: "",
        image: null,
        icons: [{ icon: "", title: "" }],
        features: [{ text: "", value: false }],
        sizes: [""],
      });
      setPreview(null);
    }
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Icons
  const updateIcon = (index, key, value) => {
    const newIcons = [...form.icons];
    newIcons[index][key] = value;
    setForm((prev) => ({ ...prev, icons: newIcons }));
  };
  const addIcon = () =>
    setForm((prev) => ({
      ...prev,
      icons: [...prev.icons, { icon: "", title: "" }],
    }));
  const removeIcon = (index) => {
    const newIcons = [...form.icons];
    newIcons.splice(index, 1);
    setForm((prev) => ({ ...prev, icons: newIcons }));
  };

  // Features
  const updateFeature = (index, key, value) => {
    const newFeatures = [...form.features];
    newFeatures[index][key] = value;
    setForm((prev) => ({ ...prev, features: newFeatures }));
  };
  const addFeature = () =>
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, { text: "", value: false }],
    }));
  const removeFeature = (index) => {
    const newFeatures = [...form.features];
    newFeatures.splice(index, 1);
    setForm((prev) => ({ ...prev, features: newFeatures }));
  };

  // Sizes
  const updateSize = (index, value) => {
    const newSizes = [...form.sizes];
    newSizes[index] = value;
    setForm((prev) => ({ ...prev, sizes: newSizes }));
  };
  const addSize = () =>
    setForm((prev) => ({ ...prev, sizes: [...prev.sizes, ""] }));
  const removeSize = (index) => {
    const newSizes = [...form.sizes];
    newSizes.splice(index, 1);
    setForm((prev) => ({ ...prev, sizes: newSizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("title", form.title);
    data.append("text", form.text);
    data.append("link", form.link);
    data.append("moreInfo", form.moreInfo);
    if (form.image) data.append("image", form.image);
    data.append("icons", JSON.stringify(form.icons));
    data.append("features", JSON.stringify(form.features));
    data.append("sizes", JSON.stringify(form.sizes));

    try {
      if (form.id) {
        await API.put(`/project_product/${form.id}`, data);
        alert("Project updated!");
      } else {
        await API.post("/project_product", data);
        alert("Project created!");
      }
      fetchProducts();
      setModalOpen(false);
    } catch (err) {
      alert("Failed to save project.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await API.delete(`/project_product/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="container my-4">
      <h4 className="mb-4">Project Products</h4>
      <button className="btn btn-primary mb-3" onClick={() => openModal(null)}>
        + Add New Project
      </button>

      {modalOpen && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "#00000088" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {form.id ? "Edit Project" : "Add New Project"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* The entire form content goes here (reuse the fields you already defined) */}
                  {/* Basic Fields */}
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Text</label>
                    <textarea
                      className="form-control"
                      name="text"
                      value={form.text}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Link</label>
                    <input
                      type="text"
                      className="form-control"
                      name="link"
                      value={form.link}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">More Info</label>
                    <textarea
                      className="form-control"
                      name="moreInfo"
                      value={form.moreInfo}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-2"
                        style={{ width: 120, height: 120, objectFit: "cover" }}
                      />
                    )}
                  </div>

                  {/* Icons */}
                  <div className="mb-3">
                    <label className="form-label">Icons</label>
                    {form.icons.map((item, i) => (
                      <div key={i} className="row g-2 mb-2">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bootstrap Icon Name (e.g. bi-alarm)"
                            value={item.icon}
                            onChange={(e) =>
                              updateIcon(i, "icon", e.target.value)
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) =>
                              updateIcon(i, "title", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeIcon(i)}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={addIcon}
                    >
                      + Add Icon
                    </button>
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <label className="form-label">Features</label>
                    {form.features.map((item, i) => (
                      <div key={i} className="row g-2 mb-2 align-items-center">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Feature Text"
                            value={item.text}
                            onChange={(e) =>
                              updateFeature(i, "text", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-auto form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={item.value}
                            onChange={(e) =>
                              updateFeature(i, "value", e.target.checked)
                            }
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeFeature(i)}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={addFeature}
                    >
                      + Add Feature
                    </button>
                  </div>

                  {/* Sizes */}
                  <div className="mb-3">
                    <label className="form-label">Sizes</label>
                    {form.sizes.map((size, i) => (
                      <div key={i} className="row g-2 mb-2">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Size"
                            value={size}
                            onChange={(e) => updateSize(i, e.target.value)}
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeSize(i)}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={addSize}
                    >
                      + Add Size
                    </button>
                  </div>
                  {/* For brevity, you can paste your existing form JSX here */}
                  <p>Form content reused here from above…</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    {form.id ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {product.image && (
                <img
                  src={`${BaseAPI}/uploads/${product.image}`}
                  className="card-img-top"
                  style={{ height: 200, objectFit: "cover" }}
                  alt={product.name}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.title}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => openModal(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(product.id)}
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

export default ProjectProducts;
