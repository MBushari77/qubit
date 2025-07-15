import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { useNavigate } from "react-router-dom";

import "./CategorySlider.css";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/category")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  if (!categories.length) return null;

  return (
    <div className="category-slider-custom-wrapper">
      <div className="category-slider-custom-inner">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-slider-custom-item"
            onClick={() => navigate(`/category/${cat.id}`)}
          >
            <img
              src={`${BaseAPI}/uploads/${cat.icon}`}
              alt={cat.name}
              className="category-slider-custom-image"
            />
            <div className="category-slider-custom-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
