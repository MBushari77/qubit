import React, { useEffect, useState } from "react";
import ProjectCrew from "./ProjectCrew";
import ProjectCycle from "./ProjectCycle";
import ProjectClientsLogos from "./ProjectClientsLogos";
import ProjectPreProjects from "./ProjectPreProjects";
import ProjectTeamMembers from "./ProjectTeamMembers";
import ProjectQuestions from "./ProjectQuestions";
import ProjectBlogs from "./ProjectBlogs";
import ProjectProducts from "./ProjectProducts";
import AddProjectContent from "./AddProjectContent";
import ProjectGridCardsSlider from "./ProjectGridCardsSlider";

// Project management section forms

const ManageProjects = () => {
  const [project, setProject] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Project Crew",
      component: <ProjectCrew />,
    },
    {
      title: "Project Content slider",
      component: <AddProjectContent />,
    },
    {
      title: "Project Media",
      component: <ProjectCycle />,
    },
    {
      title: "Project Clients Logos",
      component: <ProjectClientsLogos />,
    },
    // {
    //   title: "Compare products",
    //   component: <ProjectProducts />,
    // },
    {
      title: "Project Grid Content",
      component: <ProjectGridCardsSlider />,
    },
    {
      title: "Project Big cards",
      component: <ProjectBlogs />,
    },
    {
      title: "Big Cards Slider - Previous Projects",
      component: <ProjectPreProjects />, //big slider
    },
    {
      title: "Team Members",
      component: <ProjectTeamMembers />,
    },
    {
      title: "Project Questions",
      component: <ProjectQuestions />,
    },
  ];

  const toggleSection = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };

  // if (!project) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-4">
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

export default ManageProjects;
