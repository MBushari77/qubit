import React from "react";
import "./SubCategoryHeroSection.css";
import BaseAPI from "../../../utils/BaseAPI";

const SubCategoryHeroSection = ({ subCategory }) => {
  const { id, name, banner, title, text, path, specsheet } = subCategory;

  return (
    <>
      {banner && (
        <div
          className="subcategory-hero-container"
          style={{
            backgroundImage: `url("${BaseAPI}/uploads/${banner}")`,
          }}
        >
          <div className="subcategory-hero-overlay" />
          <div className="subcategory-hero-content">
            <h1 className="subcategory-hero-title">{title || name}</h1>
            <p className="subcategory-hero-text">{text}</p>

            <div className="subcategory-hero-buttons">
              {/* {path && (
                <a
                  href={`/inquiry/${id}`}
                  className="subcategory-hero-button subcategory-hero-inquiry"
                >
                  Get Inquiry
                </a>
              )} */}
              {specsheet && (
                <a
                  href={`${BaseAPI}/uploads/${specsheet}`}
                  className="subcategory-hero-button subcategory-hero-specsheet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spec Sheet
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubCategoryHeroSection;
