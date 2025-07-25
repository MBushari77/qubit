import React from "react";
import "./CategoryHero.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";

const CategoryHeroSection = ({ category_id }) => {
  const [sectionOneData, setSectionOneData] = useState([]);
  useEffect(() => {
    const fetchSectionOneData = async () => {
      try {
        const response = await API.get(`/sectionone/category/${category_id}`);
        console.log(response.data);
        setSectionOneData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (category_id) {
      fetchSectionOneData();
    }
  }, [category_id]);

  return (
    <div className="container category_header_container">
      <div className="row g-4 align-items-stretch category-hero-wrapper">
        {/* Column 1 - Product Card 1 */}
        <div className="col-md-3">
          <div className="category-hero-product-card p-3 h-100">
            <img
              src={`${BaseAPI}/uploads/${sectionOneData[0]?.product1_image}`}
              className="img-fluid mb-3"
              alt="Product 1"
            />
            <h5 className="mb-2 category_card_title">
              {sectionOneData[0]?.product1_name}
            </h5>
            <p className="mb-2 text-muted category_card_info">
              {sectionOneData[0]?.product1_description}
            </p>
            <ul className="list-unstyled small mb-3">
              <li>
                {" "}
                <span className="bi bi-box" />{" "}
                {sectionOneData[0]?.product1_feature1}
              </li>
              <li>
                {" "}
                <span className="bi bi-box" />{" "}
                {sectionOneData[0]?.product1_feature2}
              </li>
            </ul>
            <center>
              <Link
                to={sectionOneData[0]?.product1_link}
                className="home_prod_card_show_more_link category_hero_button"
              >
                View Details
              </Link>
              <a
                href={`${BaseAPI}/uploads/${sectionOneData[0]?.product1_specsheet}`}
                className="btn btn-sm btn-outline-dark rounded-circle"
                target="_blank"
              >
                <i className="bi bi-file-earmark-pdf"></i>
              </a>
            </center>
          </div>
        </div>

        {/* Column 2 - Product Card 2 */}
        <div className="col-md-3">
          <div className="category-hero-product-card p-3 h-100">
            <img
              src={`${BaseAPI}/uploads/${sectionOneData[0]?.product2_image}`}
              className="img-fluid mb-3"
              alt="Product 1"
            />
            <h5 className="mb-2 category_card_title">
              {sectionOneData[0]?.product2_name}
            </h5>
            <p className="mb-2 text-muted category_card_info">
              {sectionOneData[0]?.product2_description}
            </p>
            <ul className="list-unstyled small mb-3">
              <li>
                {" "}
                <span className="bi bi-box" />{" "}
                {sectionOneData[0]?.product2_feature1}
              </li>
              <li>
                {" "}
                <span className="bi bi-box" />{" "}
                {sectionOneData[0]?.product2_feature2}
              </li>
            </ul>
            <center>
              <Link
                to={sectionOneData[0]?.product2_link}
                className="home_prod_card_show_more_link category_hero_button"
              >
                View Details
              </Link>
              <a
                href={`${BaseAPI}/uploads/${sectionOneData[0]?.product2_specsheet}`}
                className="btn btn-sm btn-outline-dark rounded-circle"
                target="_blank"
              >
                <i className="bi bi-file-earmark-pdf"></i>
              </a>
            </center>
          </div>
        </div>

        {/* Column 3 - Image Card with Overlay */}
        <div className="col-md-6">
          <div className="category-hero-image-card text-white position-relative h-100">
            <div className="category-hero-overlay" />
            <div className="category-hero-content p-4">
              <h2 className="category-hero-title">
                {sectionOneData[0]?.headline}
              </h2>
              {/* <p className="category-hero-text">
                {sectionOneData[0]?.headline}
              </p> */}
            </div>
            <div
              className="category-hero-image"
              style={{
                backgroundImage: `url("${BaseAPI}/uploads/${sectionOneData[0]?.image}")`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeroSection;
