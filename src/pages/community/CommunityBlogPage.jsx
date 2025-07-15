// src/pages/CommunityBlogPage.jsx
import React from "react";
import "./CommunityBlogPage.css";
import BlogSidebar from "./components/BlogSidebar";
import BlogContent from "./components/BlogContent";
import MorePosts from "./components/MorePosts";
import HeroSection from "./components/HeroSection";

const CommunityBlogPage = () => {
  return (
    <div className="community-container container-fluid">
      <HeroSection />
      <div className="row community-content-wrapper">
        <div className="col-md-2">
          <BlogSidebar />
        </div>
        <div className="col-md-7">
          <BlogContent />
        </div>
        <div className="col-md-3">
          <MorePosts />
        </div>
      </div>
    </div>
  );
};

export default CommunityBlogPage;
