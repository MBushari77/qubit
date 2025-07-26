import React from "react";
import BaseAPI from "../../../utils/BaseAPI";
import "./CrewGrid.css";

const CrewGrid = ({ slides }) => {
  return (
    <>
      {slides.length > 0 && (
        <>
          <div className="crew-title">
            <span>OUR CREW</span>
          </div>
          <div className="crew-grid-wrapper">
            {[...slides].map((item, index) => (
              <div
                key={index}
                className="crew-ticket"
                style={{
                  backgroundImage: `url("${BaseAPI}/uploads/${item.icon}")`,
                }}
              >
                <div className="crew-ticket-overlay">
                  <h4 className="crew-ticket-title">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CrewGrid;
