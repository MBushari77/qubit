import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { useNavigate } from "react-router-dom";

import "./SubCategoryProductsNav.css";

const SubCategoryProductsNav = ({ subCatId }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/subcategoryproducts/category/${subCatId}`)
      .then((res) => {
        console.log("##################################################");
        console.log(res.data);
        setCategories(res.data);
      })
      .catch(console.error);
  }, [subCatId]);

  if (!categories.length) return null;

  return (
    <div className="category-slider-custom-wrapper">
      <div className="category-slider-custom-inner">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-slider-custom-item"
            onClick={() => navigate(cat.path)}
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

export default SubCategoryProductsNav;
