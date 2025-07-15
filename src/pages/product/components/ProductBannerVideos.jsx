import React from "react";
import "./ProductBannerVideos.css";
import BaseAPI from "../../../utils/BaseAPI";

const ProductBannerVideos = ({ videoData }) => {
  return (
    <div className="product-fliped-videos-container">
      {videoData.map((item, index) => (
        <div className="product-fliped-videos-item" key={index}>
          <video
            className="product-fliped-videos-video"
            src={`${BaseAPI}/uploads/${item.icon}`}
            controls={false}
            playsInline
            autoPlay
            muted
          />
          {/* <h5 className="product-fliped-videos-video-title">{item.title}</h5> */}
        </div>
      ))}
    </div>
  );
};

export default ProductBannerVideos;
