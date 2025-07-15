import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import CommunityPostContent from "./components/CommunityPostContent";

const ManageOneSubCommunityPost = () => {
  const { id } = useParams(); // communityonepost ID
  const [subCategory, setSubCategory] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Post Content",
      component: <CommunityPostContent subCategoryId={id} />,
    },
  ];

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await API.get(`/communityonepost/${id}`);
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

  //   if (!subCategory) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        {subCategory?.icon && (
          <img
            src={`${BaseAPI}/uploads/${subCategory.icon}`}
            alt={subCategory?.title}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        )}
        <h3 className="mt-2">{subCategory?.title}</h3>
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

export default ManageOneSubCommunityPost;
