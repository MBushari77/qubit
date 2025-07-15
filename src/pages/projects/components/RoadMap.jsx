import React from "react";
import "./RoadMap.css";

const RoadMap = ({ roadmapData }) => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="road-map-main">
            {roadmapData.map((item, index) => (
              <div className="road-map-wrapper" key={index}>
                <div className="road-map-circle">
                  <span className="road-map-circle-text d-flex align-items-center justify-content-center">
                    {/* {item.icon} */}0{index + 1}
                  </span>
                </div>
                <div className="road-map-card">
                  <h4 className="card-head">{item.title}</h4>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
