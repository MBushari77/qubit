import React from "react";
import "./ProductFlipedCards.css";
import BaseAPI from "../../../utils/BaseAPI";

const ProductFlipedCards = ({ contentData }) => {
  return (
    <div className="container product-fliped-cards-container py-5">
      {contentData.map((item, index) => (
        <div className="row align-items-center mb-5" key={index}>
          {/* Left Image - Even index */}
          <div
            className={`col-md-6 mb-4 mb-md-0 ${
              index % 2 !== 0 ? "order-md-2" : ""
            }`}
          >
            <div className="product-fliped-cards-image-wrapper">
              <img
                src={`${BaseAPI}/uploads/${item.icon}`}
                alt={item.title}
                className="img-fluid product-fliped-cards-image"
              />
            </div>
          </div>

          {/* Right Text - Even index */}
          <div
            className={`col-md-6 ${
              index % 2 !== 0 ? "order-md-1" : ""
            } product-fliped-cards-text-wrapper`}
          >
            <h3 className="product-fliped-cards-title mb-3">{item.title}</h3>
            <p className="product-fliped-cards-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductFlipedCards;
