import React from "react";
import { Link } from "react-router-dom";

const CardForGrid = ({ slide, idx }) => {
  return (
    <div className="why-qubit-card" style={{ border: "solid lightgray 1px" }}>
      <div className="why-qubit-icon">
        {/* <h2 className={`bi bi-${slide?.icon}`} aria-hidden="true" /> */}
        <span className="grid-card-icon-numbered">0{idx + 1}</span>
      </div>
      <div className="why-qubit-text">
        <h4 className="why-qubit-title-text">{slide?.title}</h4>
        <p className="why-qubit-subtitle">{slide?.text}</p>
      </div>
      <Link
        to={`/community`}
        className="group-slider-button-float bi bi-chevron-right"
      ></Link>
    </div>
  );
};

export default CardForGrid;
