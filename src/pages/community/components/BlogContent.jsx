import React, { useEffect, useState } from "react";
import { BsShareFill } from "react-icons/bs";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";

const BlogContent = ({ comunityBlogs, id, setId }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/communityonepost/${id}`);

        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch Post:", error);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  //
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await API.get(`/communityonepost/category/${id}`);
        setContent(response.data);
      } catch (error) {
        console.error("Failed to fetch Content:", error);
      }
    };
    if (id) {
      fetchContent();
    }
  }, [id]);

  function formatReadableDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long", // e.g., July
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // share function
  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/community/${id}`; // Adjust this to match your route
      await navigator.share({
        title: post?.title || "Qubit Blog Post",
        text: post?.text || "Check out this blog post on Qubit!",
        url: shareUrl,
      });
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <div className="community-blog-content">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>{comunityBlogs[id - 1].name}</h2>
        </div>
        <div>
          <button className="community-share-btn" onClick={handleShare}>
            Share <BsShareFill />
          </button>
          <button
            className="community-share-btn community-close-btn"
            onClick={() => setId(0)}
          >
            X
          </button>
        </div>
      </div>
      <br />
      <div className="community_banner_image">
        <img src={`${BaseAPI}/uploads/${comunityBlogs[id - 1].icon}`} />
      </div>
      {/* <p>asdasd</p> */}
      {content?.map((section, idx) => (
        <div key={idx} className="community_images">
          <h5 className="community-subtitle">{section.title}</h5>
          <p>{section.text}</p>
          <img src={`${BaseAPI}/uploads/${section.icon}`} />
        </div>
      ))}

      <div className="community_bost_footer">
        <div>
          <p>{formatReadableDate(post?.created_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
