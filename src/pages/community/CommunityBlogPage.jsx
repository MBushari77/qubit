// src/pages/CommunityBlogPage.jsx
import React, { useEffect, useState } from "react";
import "./CommunityBlogPage.css";
import BlogSidebar from "./components/BlogSidebar";
import BlogContent from "./components/BlogContent";
import MorePosts from "./components/MorePosts";
import HeroSection from "./components/HeroSection";
import API from "../../utils/API";

const CommunityBlogPage = () => {
  const [id, setId] = useState(0);

  // gr all from /community
  const [comunityBlogs, setComunityBlogs] = useState([]);
  useEffect(() => {
    const fetchComunityBlogs = async () => {
      try {
        const response = await API.get(`/community`);
        setComunityBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch ComunityBlogs:", error);
      }
    };
    fetchComunityBlogs();
  }, []);

  return (
    <div className="community-container container-fluid">
      <HeroSection />
      <div className="row community-content-wrapper">
        <div className="col-md-2">
          <BlogSidebar comunityBlogs={comunityBlogs} setId={setId} id={id} />
        </div>
        <div className="col-md-7">
          {Number(id) === 0 ? (
            <div>Comments</div>
          ) : (
            <BlogContent setId={setId} id={id} />
          )}
        </div>
        <div className="col-md-3">
          <MorePosts />
        </div>
      </div>
    </div>
  );
};

export default CommunityBlogPage;
