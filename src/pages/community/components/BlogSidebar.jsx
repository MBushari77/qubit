import React from "react";
import { BsChevronRight } from "react-icons/bs";

const BlogSidebar = () => {
  return (
    <div className="community-sidebar">
      {[...Array(7)].map((_, idx) => (
        <div
          key={idx}
          className="community-sidebar-item d-flex justify-content-between align-items-center"
        >
          <span>COB Technology</span>
          <BsChevronRight />
        </div>
      ))}
    </div>
  );
};

export default BlogSidebar;
