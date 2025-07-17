import React from "react";
import "./ProductMediaGrid.css";
import BaseAPI from "../../../utils/BaseAPI";

const ProductMediaGrid = ({ product, gridContent }) => {
  if (!product) return null;

  const { image, headline, features = [] } = product;

  return (
    <div className="product-media-grid-container">
      <div className="product-media-grid-headline-title">
        <h2 className="product-media-grid-headline">{product.name}</h2>
      </div>
      <div className="product-media-grid-inner ">
        {/* Left Image & Headline */}
        <div className="product-media-grid-left">
          <img
            src={`${BaseAPI}/uploads/${product.image}`}
            alt="Product"
            className="product-media-grid-image"
          />
        </div>

        {/* Features Grid */}
        <div className="product-media-grid-features">
          {gridContent.map((feature, index) => (
            <div className="product-media-grid-feature" key={index}>
              <div>
                <img
                  src={
                    `${BaseAPI}/uploads/${feature.icon}` || "/watch-icon.png"
                  }
                  alt={feature.title}
                  className="product-media-grid-feature-icon"
                />
                <h4 className="product-media-grid-feature-title">
                  {feature.title}
                </h4>
                <p className="product-media-grid-feature-desc">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductMediaGrid;
