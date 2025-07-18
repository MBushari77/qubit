// src/pages/CommunityBlogPage.jsx
import React, { useEffect, useState } from "react";
import "./CommunityBlogPage.css";
import BlogSidebar from "./components/BlogSidebar";
import BlogContent from "./components/BlogContent";
import MorePosts from "./components/MorePosts";
import HeroSection from "./components/HeroSection";
import API from "../../utils/API";
import CommunityPosts from "./components/CommunityPosts";

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

  // gr all from /community
  const [comunitySideBlogs, setComunitySideBlogs] = useState([]);
  useEffect(() => {
    const fetchComunitySideBlogs = async () => {
      try {
        const response = await API.get(`/communitysideblogs`);
        setComunitySideBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch ComunitySideBlogs:", error);
      }
    };
    fetchComunitySideBlogs();
  }, []);

  return (
    <div className="community-container container-fluid">
      <HeroSection />
      <div className="row community-content-wrapper">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 mb-4">
          <BlogSidebar comunityBlogs={comunityBlogs} setId={setId} id={id} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-6 col-lg-7 mb-4">
          {Number(id) === 0 ? (
            <CommunityPosts />
          ) : (
            <BlogContent comunityBlogs={comunityBlogs} setId={setId} id={id} />
          )}
        </div>

        {/* More Posts */}
        <div className="col-12 col-md-3 col-lg-3 mb-4">
          <MorePosts sideBlogs={comunitySideBlogs} />
        </div>
      </div>
    </div>
  );
};

export default CommunityBlogPage;
