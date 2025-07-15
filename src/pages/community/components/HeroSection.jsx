import React from "react";

const HeroSection = () => {
  return (
    <div className="community-hero-section">
      <img
        src={`https://w0.peakpx.com/wallpaper/360/193/HD-wallpaper-colorful-3d-waves-3d-textures-waves-textures-colorful-gradients-background-3d-backgrounds-wavy-textures-background-with-waves.jpg`}
        alt="Hero"
        className="img-fluid community-hero-img"
      />
      <div className="community-hero-text">
        <h1>Welcome to Qubit Electronics Blog Post</h1>
      </div>
    </div>
  );
};

export default HeroSection;
