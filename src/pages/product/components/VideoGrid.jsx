import React, { useState } from "react";
import "./video-grid-style.css";
import BaseAPI from "../../../utils/BaseAPI";

const VideoGrid = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const openModal = (videoUrl) => {
    setActiveVideo(videoUrl);
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  return (
    <div className="video-grid-container">
      <div className="video-grid-wrapper">
        {videos.map((video, index) => (
          <div className="video-grid-card" key={index}>
            <div
              className="video-grid-thumbnail"
              onClick={() => openModal(`${BaseAPI}/uploads/${video.icon}`)}
            >
              <video
                src={`${BaseAPI}/uploads/${video.icon}`}
                controls={false}
                autoPlay={false}
                className="video-grid-modal-video"
              />
              <div className="video-grid-play-icon bi bi-play-fill"></div>
            </div>
            <h4 className="video-grid-title">{video.title}</h4>
            {/* <p className="video-grid-text">{video.text}</p> */}
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeVideo && (
        <div className="video-grid-modal-overlay" onClick={closeModal}>
          <div
            className="video-grid-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              controls
              autoPlay
              className="video-grid-modal-video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
