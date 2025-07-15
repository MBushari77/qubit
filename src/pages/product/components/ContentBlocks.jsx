import React from "react";
import "./ContentBlocks.css";
import BaseAPI from "../../../utils/BaseAPI";

const ContentBlocks = ({ blocksData }) => {
  return (
    <div className="content-blocks-container">
      {blocksData.map((item, index) => (
        <div className="content-blocks-item" key={index}>
          <div className="content-blocks-header">
            <img
              src={`${BaseAPI}/uploads/${item.icon}`}
              alt={item.title}
              className="content-blocks-icon"
            />
            <h4 className="content-blocks-title">{item.title}</h4>
          </div>
          {/* <hr className="content-blocks-divider" /> */}
          <p className="content-blocks-text">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentBlocks;
