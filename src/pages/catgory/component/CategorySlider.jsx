import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { useNavigate } from "react-router-dom";

import "./CategorySlider.css";

const CategorySlider = ({ catId }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/subcategorysectionzero/category/${catId}`)
      .then((res) => {
        console.log("##################################################");
        console.log(res.data);
        setCategories(res.data);
      })
      .catch(console.error);
  }, [catId]);

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
              alt={cat.title}
              className="category-slider-custom-image"
            />
            <div className="category-slider-custom-name">{cat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
