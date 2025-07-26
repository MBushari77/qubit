import React from "react";
import "./ProductHeroSection.css";
import BaseAPI from "../../../utils/BaseAPI";

const ProductHeroSection = ({ product }) => {
  const { banner, features, specsheet, id } = product;

  return (
    <>
      {product?.banner && (
        <div
          className="product-hero-container"
          style={{
            backgroundImage: `url("${BaseAPI}/uploads/${banner}")`,
          }}
        >
          <div className="product-hero-overlay" />
          <div className="product-hero-content">
            <div className="product-hero-features">
              {features.map((feature, index) => (
                <div
                  className={`product-hero-feature ${
                    index === features.length - 1 && "product-hero-feature-last"
                  }`}
                  key={index}
                >
                  {feature.image ? (
                    <img
                      src={`${BaseAPI}/uploads/${feature.image}`}
                      alt={feature.title}
                      className="product-hero-feature-icon"
                    />
                  ) : (
                    <img
                      src="/watch-icon.png" // placeholder icon
                      alt="Default Feature"
                      className="product-hero-feature-icon"
                    />
                  )}
                  <span className="product-hero-feature-title">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="product-hero-text-content">
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
              </div>
            </div>

            <div className="product-hero-buttons">
              <a
                href={`https://wa.me/+966550017112?text=${encodeURIComponent(
                  `Hi, I am interested in your product: ${product.name}`
                )}`}
                target="_blank"
                className="product-hero-button product-hero-specsheet"
              >
                Get Inquiry
              </a>
              <a
                href={specsheet}
                className="product-hero-button product-hero-inquiry"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spec Sheet
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductHeroSection;
