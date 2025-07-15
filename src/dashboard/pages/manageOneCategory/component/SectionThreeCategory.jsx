import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import API from "../../../../utils/API";

const SectionThreeCategory = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("new"); // Default to "new" tab

  useEffect(() => {
    if (categoryId) {
      API.get(`/sectionthree/getall`)
        .then((res) => {
          console.log(res.data.data);
          setProducts(res.data.data);
          if (res.data.length > 0) {
            setActiveTab(res.data[0].id.toString());
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [categoryId]);

  return (
    <div className="container">
      <h4 className="mb-3">Manage Section Three - Category {categoryId}</h4>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {products.map((product, idx) => (
          <li className="nav-item" key={product.id}>
            <button
              className={`nav-link ${
                activeTab === product.id.toString() ? "active" : ""
              }`}
              onClick={() => setActiveTab(product.id.toString())}
            >
              {product.headline_one || `Product ${idx + 1}`}
            </button>
          </li>
        ))}
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "new" ? "active" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            ➕ New Product
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div>
        {products.map((product) =>
          activeTab === product.id.toString() ? (
            <ProductForm
              key={product.id}
              categoryId={categoryId}
              productId={product.id}
            />
          ) : null
        )}

        {activeTab === "new" && (
          <ProductForm key="new" categoryId={categoryId} productId={null} />
        )}
      </div>
    </div>
  );
};

export default SectionThreeCategory;
