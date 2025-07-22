import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import SingleProjectContentForm from "./components/SingleProjectContentForm";
import SingleProjectQuestionForm from "./components/SingleProjectQuestionForm";

const ManageOneProject = () => {
  const { id } = useParams(); // project ID
  const [project, setProject] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Project Content",
      component: <SingleProjectContentForm category_id={id} />,
    },
    {
      title: "Project Questions",
      component: <SingleProjectQuestionForm categoryId={id} />,
    },
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/singleproject/${id}`);
        console.log("Single Project", res.data);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [id]);

  const toggleSection = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };

  if (!project) return <div className="container my-5">Loading project...</div>;

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        {project?.icon && (
          <img
            src={`${BaseAPI}/uploads/${project.icon}`}
            alt={project.title}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        )}
        <h3 className="mt-2">{project.title}</h3>
        {project.subtitle && <p className="text-muted">{project.subtitle}</p>}
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

export default ManageOneProject;
