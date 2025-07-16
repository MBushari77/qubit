import React, { useEffect, useState } from "react";
import API from "../../../../utils/API"; // Update to your Axios instance

const ProductForm = ({ categoryId, productId }) => {
  const [product, setProduct] = useState({
    category_id: categoryId,
    headline_one: "",
    image: null,
    icons: [""],
    headline_two: "",
    description: "",
    headline_three: "",
    path: "",
    specsheet: null,
    sizes: [""],
    about: "",
    features: [{ image: null, title: "" }],
    advantages: [{ name: "", value: false }],
  });

  useEffect(() => {
    if (productId) {
      API.get(`/sectionthree/getone/${productId}`)
        .then((res) => {
          const data = res.data;
          console.log(res.data);
          setProduct({
            category_id: data.category_id || "",
            headline_one: data.headline_one || "",
            image: null,
            icons: data.icons ? JSON.parse(data.icons) : [""],
            headline_two: data.headline_two || "",
            description: data.description || "",
            headline_three: data.headline_three || "",
            path: data.path || "",
            specsheet: null,
            sizes: data.sizes ? JSON.parse(data.sizes) : [""],
            about: data.about || "",
            features: data.features
              ? JSON.parse(data.features).map((f) => ({
                  title: f.title || "",
                  image: null, // File input can't be prefilled, keep as null
                }))
              : [{ image: null, title: "" }],
            advantages: data.advantages
              ? JSON.parse(data.advantages)
              : [{ name: "", value: false }],
          });
        })
        .catch((err) => console.error(err));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct((prev) => ({ ...prev, [name]: files[0] }));
  };

  const updateArrayField = (field, index, key, value) => {
    const newArray = [...product[field]];
    if (key) newArray[index][key] = value;
    else newArray[index] = value;
    setProduct((prev) => ({ ...prev, [field]: newArray }));
  };

  const addFieldItem = (field, newItem) => {
    setProduct((prev) => ({ ...prev, [field]: [...prev[field], newItem] }));
  };

  const removeFieldItem = (field, index) => {
    const newArray = [...product[field]];
    newArray.splice(index, 1);
    setProduct((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (productId) formData.append("id", productId);

    formData.append("category_id", product.category_id);
    formData.append("headline_one", product.headline_one);
    formData.append("headline_two", product.headline_two);
    formData.append("headline_three", product.headline_three);
    formData.append("description", product.description);
    formData.append("path", product.path);
    formData.append("about", product.about);

    formData.append("icons", JSON.stringify(product.icons));
    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("advantages", JSON.stringify(product.advantages));

    const featuresData = product.features.map((f, i) => ({
      title: f.title,
    }));
    formData.append("features", JSON.stringify(featuresData));

    if (product.image) formData.append("image", product.image);
    if (product.specsheet) formData.append("specsheet", product.specsheet);

    // append feature images
    product.features.forEach((f, i) => {
      if (f.image) {
        formData.append(`feature_image_${i}`, f.image);
      }
    });

    API.post("/sectionthree", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h3 className="mb-4">{productId ? "Edit Product" : "Add Product"}</h3>

      <div className="mb-3">
        <label className="form-label">Headline One</label>
        <input
          className="form-control"
          name="headline_one"
          value={product.headline_one}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Headline Two</label>
        <input
          className="form-control"
          name="headline_two"
          value={product.headline_two}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Headline Three</label>
        <input
          className="form-control"
          name="headline_three"
          value={product.headline_three}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Path</label>
        <input
          className="form-control"
          name="path"
          value={product.path}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Specsheet</label>
        <input
          type="file"
          className="form-control"
          name="specsheet"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">About</label>
        <textarea
          className="form-control"
          name="about"
          value={product.about}
          onChange={handleChange}
        />
      </div>

      <hr />
      <h5>Icons</h5>
      {product.icons.map((icon, i) => (
        <div className="input-group mb-2" key={i}>
          <input
            className="form-control"
            value={icon}
            onChange={(e) => updateArrayField("icons", i, null, e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => removeFieldItem("icons", i)}
          >
            ❌
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary mb-3"
        onClick={() => addFieldItem("icons", "")}
      >
        + Add Icon
      </button>

      <hr />
      <h5>Sizes</h5>
      {product.sizes.map((size, i) => (
        <div className="input-group mb-2" key={i}>
          <input
            className="form-control"
            value={size}
            onChange={(e) => updateArrayField("sizes", i, null, e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => removeFieldItem("sizes", i)}
          >
            ❌
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary mb-3"
        onClick={() => addFieldItem("sizes", "")}
      >
        + Add Size
      </button>

      <hr />
      <h5>Features</h5>
      {product.features.map((f, i) => (
        <div className="row mb-3" key={i}>
          <div className="col-md-6 mb-2">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={f.title}
              onChange={(e) =>
                updateArrayField("features", i, "title", e.target.value)
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                updateArrayField("features", i, "image", e.target.files[0])
              }
            />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeFieldItem("features", i)}
            >
              ❌ Remove Feature
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => addFieldItem("features", { image: null, title: "" })}
      >
        + Add Feature
      </button>

      <hr />
      <h5>Advantages</h5>
      {product.advantages.map((adv, i) => (
        <div className="row mb-2" key={i}>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Advantage Name"
              value={adv.name}
              onChange={(e) =>
                updateArrayField("advantages", i, "name", e.target.value)
              }
            />
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <div className="form-check ms-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={adv.value}
                onChange={(e) =>
                  updateArrayField("advantages", i, "value", e.target.checked)
                }
              />
              <label className="form-check-label">Active</label>
            </div>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeFieldItem("advantages", i)}
            >
              ❌
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => addFieldItem("advantages", { name: "", value: false })}
      >
        + Add Advantage
      </button>

      <hr />
      <button type="submit" className="btn btn-success mt-3">
        {productId ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
