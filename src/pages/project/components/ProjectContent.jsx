import React from "react";
import "./ProjectContent.css";
import BaseAPI from "../../../utils/BaseAPI";

const ProjectContent = ({ items = [] }) => {
  const leftItems = items.filter((_, index) => index % 2 === 0); // 0, 2, 4...
  const rightItems = items.filter((_, index) => index % 2 === 1); // 1, 3, 5...

  return (
    <div className="single_project_container py-5">
      <div className="row">
        <div className="col-md-6">
          {leftItems.map((item, index) => (
            <div className="project-card mb-4" key={index}>
              {item.icon && (
                <img
                  src={`${BaseAPI}/uploads/${item.icon}`}
                  alt={item.title}
                  className="project-card-image"
                />
              )}
              <div className="project-card-body mt-2">
                <p className="project-card-subtitle">{item.subtitle}</p>
                <h5 className="project-card-title">{item.title}</h5>
                <p className="project-card-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          {rightItems.map((item, index) => (
            <div className="project-card mb-4" key={index}>
              {item.icon && (
                <img
                  src={`${BaseAPI}/uploads/${item.icon}`}
                  alt={item.title}
                  className="project-card-image"
                />
              )}
              <div className="project-card-body mt-2">
                <p className="project-card-subtitle">{item.subtitle}</p>
                <h5 className="project-card-title">{item.title}</h5>
                <p className="project-card-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
