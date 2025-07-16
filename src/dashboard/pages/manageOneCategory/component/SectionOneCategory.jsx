import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../../utils/API";

const SectionOneCategory = ({ categoryId }) => {
  const [info, setInfo] = useState({
    headline: "",
    image: null,
  });

  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      featureOne: "",
      featureTwo: "",
      link: "",
      specsheet: null,
      image: null,
    },
    {
      name: "",
      description: "",
      featureOne: "",
      featureTwo: "",
      link: "",
      specsheet: null,
      image: null,
    },
  ]);

  const [imagePreview, setImagePreview] = useState(null);
  const [productSpecsheetUrls, setProductSpecsheetUrls] = useState([
    null,
    null,
  ]);
  const [productImagePreviews, setProductImagePreviews] = useState([
    null,
    null,
  ]);
  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    API.get(`/sectionone/category/${categoryId}`)
      .then((res) => {
        const data = res.data[0];
        if (!data || Object.keys(data).length === 0) {
          setIsExisting(false);
          return;
        }

        setIsExisting(true);
        setInfo({ headline: data.headline || "", image: null });

        if (data.image) {
          setImagePreview(`${API.defaults.baseURL}/uploads/${data.image}`);
        }

        const updatedProducts = [
          {
            name: data.product1_name || "",
            description: data.product1_description || "",
            featureOne: data.product1_feature1 || "",
            featureTwo: data.product1_feature2 || "",
            link: data.product1_link || "",
            specsheet: null,
            image: null,
          },
          {
            name: data.product2_name || "",
            description: data.product2_description || "",
            featureOne: data.product2_feature1 || "",
            featureTwo: data.product2_feature2 || "",
            link: data.product2_link || "",
            specsheet: null,
            image: null,
          },
        ];

        setProducts(updatedProducts);

        setProductSpecsheetUrls([
          data.product1_specsheet
            ? `${API.defaults.baseURL}/uploads/${data.product1_specsheet}`
            : null,
          data.product2_specsheet
            ? `${API.defaults.baseURL}/uploads/${data.product2_specsheet}`
            : null,
        ]);

        setProductImagePreviews([
          data.product1_image
            ? `${API.defaults.baseURL}/uploads/${data.product1_image}`
            : null,
          data.product2_image
            ? `${API.defaults.baseURL}/uploads/${data.product2_image}`
            : null,
        ]);
      })
      .catch((err) => {
        console.error("Failed to fetch section one data", err);
      });
  }, [categoryId]);

  const handleInfoChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setInfo({ ...info, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  const handleProductChange = (index, e) => {
    const { name, value, files } = e.target;
    const updated = [...products];

    if (name === "specsheet") {
      updated[index][name] = files[0];
      setProductSpecsheetUrls((urls) => {
        const newUrls = [...urls];
        newUrls[index] = URL.createObjectURL(files[0]);
        return newUrls;
      });
    } else if (name === "image") {
      updated[index][name] = files[0];
      setProductImagePreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = URL.createObjectURL(files[0]);
        return newPreviews;
      });
    } else {
      updated[index][name] = value;
    }

    setProducts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("headline", info.headline);

    // Handle main image
    if (info.image) {
      formData.append("image", info.image);
    } else if (imagePreview) {
      const oldImage = imagePreview.split("/").pop();
      formData.append("oldImage", oldImage);
    }

    // Handle products
    products.forEach((p, i) => {
      const index = i + 1;
      formData.append(`product${index}_name`, p.name);
      formData.append(`product${index}_description`, p.description);
      formData.append(`product${index}_feature1`, p.featureOne);
      formData.append(`product${index}_feature2`, p.featureTwo);
      formData.append(`product${index}_link`, p.link);

      // Specsheets
      if (p.specsheet) {
        formData.append(`product${index}_specsheet`, p.specsheet);
      } else if (productSpecsheetUrls[i]) {
        const specsheetFilename = productSpecsheetUrls[i].split("/").pop();
        formData.append(`product${index}_specsheet`, specsheetFilename);
      }

      // Images
      if (p.image) {
        formData.append(`product${index}_image`, p.image);
      } else if (productImagePreviews[i]) {
        const imageFilename = productImagePreviews[i].split("/").pop();
        formData.append(`product${index}_image`, imageFilename);
      }
    });

    const apiCall = isExisting
      ? API.put(`/sectionone/${categoryId}`, formData)
      : API.post("/sectionone", formData);

    apiCall
      .then((res) => {
        alert(
          isExisting
            ? "Section updated successfully!"
            : "Section added successfully!"
        );
      })
      .catch((err) => {
        console.error("Error saving section one:", err);
        alert("Error occurred while saving data.");
      });
  };

  return (
    <form className="border p-4 rounded" onSubmit={handleSubmit}>
      <h5 className="mb-3">Info</h5>
      <div className="mb-3">
        <label className="form-label">Headline</label>
        <input
          type="text"
          name="headline"
          value={info.headline}
          onChange={handleInfoChange}
          className="form-control"
          placeholder="Enter headline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Main Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInfoChange}
          className="form-control"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2"
            style={{ maxWidth: "200px" }}
          />
        )}
      </div>

      {products.map((product, index) => (
        <div key={index} className="border-top pt-4 mt-4">
          <h6 className="mb-3">Product {index + 1}</h6>

          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Feature One</label>
            <input
              type="text"
              name="featureOne"
              value={product.featureOne}
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Feature Two</label>
            <input
              type="text"
              name="featureTwo"
              value={product.featureTwo}
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Link</label>
            <input
              type="text"
              name="link"
              value={product.link}
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Specsheet (PDF)</label>
            <input
              type="file"
              name="specsheet"
              accept="application/pdf"
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
            />
            {productSpecsheetUrls[index] && (
              <a
                href={productSpecsheetUrls[index]}
                target="_blank"
                rel="noreferrer"
                className="d-block mt-2"
              >
                View current specsheet
              </a>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleProductChange(index, e)}
              className="form-control"
            />
            {productImagePreviews[index] && (
              <img
                src={productImagePreviews[index]}
                alt={`Product ${index + 1}`}
                className="mt-2"
                style={{ maxWidth: "200px" }}
              />
            )}
          </div>
        </div>
      ))}

      <button type="submit" className="btn btn-primary mt-4">
        {isExisting ? "Update Section" : "Add Section"}
      </button>
    </form>
  );
};

export default SectionOneCategory;
