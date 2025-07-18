import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import SubCategorySectionOneForm from "./components/subCategorySectionOneForm";
import SubCategorySectionTwoForm from "./components/SubCategorySectionTwoForm";
import SubCategorySectionThreeForm from "./components/SubCategorySectionThreeForm";
import SubCategorySectionFourForm from "./components/SubCategorySectionFourForm";
import SubCategorySectionFiveForm from "./components/SubCategorySectionFiveForm";
import SubCategoryProductsForm from "./components/SubCategoryProductsForm";

const ManageOneSubCategory = () => {
  const { id } = useParams(); // sub_category ID
  const [subCategory, setSubCategory] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Navbar Products",
      component: <SubCategoryProductsForm subCategoryId={id} />,
    },
    {
      title: "Three Tickets",
      component: <SubCategorySectionOneForm subCategoryId={id} />,
    },
    {
      title: "Sub Category Slider",
      component: <SubCategorySectionTwoForm subCategoryId={id} />,
    },
    {
      title: "Sub Category Grid Layout",
      component: <SubCategorySectionThreeForm subCategoryId={id} />,
    },
    {
      title: "Sub Category Tickets Slider",
      component: <SubCategorySectionFourForm subCategoryId={id} />,
    },
    {
      title: "Sub Category Questions & Awnsers",
      component: <SubCategorySectionFiveForm subCategoryId={id} />,
    },
  ];

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await API.get(`/sub_category/${id}`);
        console.log(res.data);
        setSubCategory(res.data);
      } catch (err) {
        console.error("Error fetching sub-category:", err);
      }
    };
    fetchSubCategory();
  }, [id]);

  const toggleSection = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };

  if (!subCategory) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        {subCategory.banner && (
          <img
            src={`${BaseAPI}/uploads/${subCategory.banner}`}
            alt={subCategory.name}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        )}
        <h3 className="mt-2">{subCategory.name}</h3>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-3">
          <button
            className="btn btn-outline-dark w-100 text-start"
            onClick={() => toggleSection(index)}
          >
            {section.title}
          </button>
          {activeSection === index && (
            <div className="p-3 border border-dark rounded-bottom">
              {section.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageOneSubCategory;
