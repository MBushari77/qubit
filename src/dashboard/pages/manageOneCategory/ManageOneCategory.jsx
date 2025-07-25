import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";

// Import each section component
import SectionOneCategory from "./component/SectionOneCategory";
import SectionTwoCategory from "./component/SectionTwoCategory";
import SectionThreeCategory from "./component/SectionThreeCategory";
import SectionFourCategory from "./component/SectionFourCategory";
import { title } from "framer-motion/client";
import SectionFiveCategory from "./component/SectionFiveCategory";
import SectionSixCategory from "./component/SectionSixCategory";
import SectionZeroCategory from "./component/SectionZeroCategory";
// import more as needed...

const ManageOneCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  // Define sections in an array with title and component
  const sections = [
    {
      title: "Sub Categories",
      component: <SectionZeroCategory subCategoryId={id} />,
    },
    {
      title: "Info & Products",
      component: <SectionOneCategory categoryId={id} />,
    },
    {
      title: "Media Upload",
      component: (
        <SectionTwoCategory
          setActiveSection={setActiveSection}
          categoryId={id}
        />
      ),
    },
    {
      title: "Products Upload",
      component: <SectionThreeCategory categoryId={id} />,
    },
    {
      title: "Gallary",
      component: <SectionFourCategory categoryId={id} />,
    },
    {
      title: "Names",
      component: <SectionFiveCategory categoryId={id} />,
    },
    {
      title: "Qustionair ",
      component: <SectionSixCategory categoryId={id} />,
    },
    // Add more like: { title: "Downloads", component: <SectionThreeCategory /> }
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await API.get(`/category/${id}`);
        setCategory(res.data);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };
    fetchCategory();
  }, [id]);

  const toggleSection = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };

  if (!category) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <img
          src={`${BaseAPI}/uploads/${category.icon}`}
          alt={category.name}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
        <h3 className="mt-2">{category.name}</h3>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-3">
          <button
            className="btn btn-outline-primary w-100 text-start"
            onClick={() => toggleSection(index)}
          >
            {section.title}
          </button>
          {activeSection === index && (
            <div className="p-3 border border-primary rounded-bottom">
              {section.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageOneCategory;
