import React from "react";
import "./ProductsAddingSoon.css";
import addingImage from "./adding-products.png"; // Use your image here

const ProductsAddingSoon = () => {
  return (
    <div className="adding-products-page">
      <div className="adding-products-content">
        <div className="adding-products-text">
          <h1>We're Still Adding Products</h1>
          <p>
            The Qubit Visual Solutions catalog is growing! We're currently
            uploading more of our latest innovative LED screens, kiosks, and
            custom display solutions.
          </p>
          <p>
            Check back shortly to discover our full range of visual technologies
            tailored for events, installations, and creative applications.
          </p>
        </div>
        <div className="adding-products-image">
          <img src={addingImage} alt="Adding Products Illustration" />
        </div>
      </div>
    </div>
  );
};

export default ProductsAddingSoon;
