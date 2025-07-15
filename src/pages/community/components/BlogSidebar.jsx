import React from "react";
import { BsChevronRight } from "react-icons/bs";

const BlogSidebar = ({ comunityBlogs, setId, id }) => {
  return (
    <div className="community-sidebar">
      {comunityBlogs?.map((blog, idx) => (
        <div
          key={idx}
          onClick={() => setId(blog.id)}
          className={`community-sidebar-item d-flex justify-content-between align-items-center ${
            blog.id === id && "community-active-tab"
          }`}
        >
          <span>{blog.name}</span>
          <span className="community-tab-button">
            <BsChevronRight />
          </span>
        </div>
      ))}
    </div>
  );
};

export default BlogSidebar;
