import React from "react";
import BaseAPI from "../../../utils/BaseAPI";
import { useNavigate } from "react-router-dom";

const MorePosts = ({ sideBlogs }) => {
  const navigate = useNavigate();
  return (
    <div className="community-more-posts">
      <h4>More Blog Posts</h4>
      {sideBlogs.map((blog, idx) => (
        <div
          key={idx}
          className="community-post-item d-flex"
          onClick={() => navigate(blog.path)}
        >
          <img
            src={`${BaseAPI}/uploads/${blog?.icon}`}
            alt={blog?.title}
            className="community-post-thumb"
          />
          <div className="community-post-text">
            <h6>{blog?.title}</h6>
            <p>{blog?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MorePosts;
