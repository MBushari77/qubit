import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SubCategoryBlogsForm from "./components/SubCategoryBlogsForm";

const SubCategoryBlogs = () => {
  const { id } = useParams(); // sub_category ID
  const [subCategory, setSubCategory] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Blogs",
      component: <SubCategoryBlogsForm subCategoryId={0} />,
    },
  ];

  const toggleSection = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };
  return (
    <div className="container my-4">
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

export default SubCategoryBlogs;
