import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import API from "../../../../utils/API";

const SectionThreeCategory = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(""); // ← Start empty

  useEffect(() => {
    if (categoryId) {
      API.get(`/sectionthree/by-category/${categoryId}`)
        .then((res) => {
          const productData = res.data.data;
          setProducts(productData);

          // 👇 Set active tab: first product if exists, otherwise "new"
          if (productData.length > 0) {
            setActiveTab(productData[0].id.toString());
          } else {
            setActiveTab("new");
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
        {products.slice(0, 4).map((product, idx) => (
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
        {/* Only show "new" tab if less than 4 products */}
        {products.length < 4 && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              ➕ New Product
            </button>
          </li>
        )}
      </ul>

      {/* Tab Content */}
      <div>
        {/* Existing product form */}
        {products.map((product) =>
          activeTab === product.id.toString() ? (
            <ProductForm
              key={product.id}
              categoryId={categoryId}
              productId={product.id}
            />
          ) : null
        )}

        {/* New product form (only shown if activeTab is "new" and less than 4) */}
        {activeTab === "new" && products.length < 4 && (
          <ProductForm key="new" categoryId={categoryId} productId={null} />
        )}

        {/* Fallback: no valid tab selected */}
        {activeTab &&
          activeTab !== "new" &&
          !products.some((p) => p.id.toString() === activeTab) && (
            <div className="alert alert-info p-3 text-center">
              Select a product from the tabs above.
            </div>
          )}
      </div>
    </div>
  );
};

export default SectionThreeCategory;
