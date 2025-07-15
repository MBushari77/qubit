import React from "react";

const MorePosts = () => {
  return (
    <div className="community-more-posts">
      <h4>More Blog Posts</h4>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="community-post-item d-flex">
          <img
            src={`https://eds.ae/wp-content/uploads/2024/06/LED-Video-Wall-1.jpg`}
            alt="post"
            className="community-post-thumb"
          />
          <div className="community-post-text">
            <h6>Post Title</h6>
            <p>Lorem Ipsum is simply dummy.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MorePosts;
