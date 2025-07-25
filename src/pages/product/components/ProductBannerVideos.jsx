import React from "react";
import "./ProductBannerVideos.css";
import BaseAPI from "../../../utils/BaseAPI";

const isVideoFile = (filename) => {
  return /\.(mp4|webm|ogg)$/i.test(filename);
};

const ProductBannerVideos = ({ videoData }) => {
  return (
    <div className="product-fliped-videos-container">
      {videoData.map((item, index) => {
        const fileUrl = `${BaseAPI}/uploads/${item.icon}`;
        return (
          <div className="product-fliped-videos-item" key={index}>
            <div>
              <h1>{item.title}</h1>
            </div>
            {isVideoFile(item.icon) ? (
              <video
                className="product-fliped-videos-video"
                src={fileUrl}
                controls={false}
                playsInline
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                className="product-fliped-videos-image"
                src={fileUrl}
                alt={item.title || "media"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductBannerVideos;
