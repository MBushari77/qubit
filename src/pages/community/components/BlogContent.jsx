import React from "react";
import { BsShareFill } from "react-icons/bs";

const BlogContent = () => {
  return (
    <div className="community-blog-content">
      <div className="d-flex justify-content-between align-items-center">
        <h2>COB Technology</h2>
        <div>
          <button className="community-share-btn">
            Share <BsShareFill />
          </button>
          <button className="community-share-btn community-close-btn">X</button>
        </div>
      </div>
      <br />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry... Lorem Ipsum is simply dummy text of the printing and
        typesetting industry... Lorem Ipsum is simply dummy text of the printing
        and typesetting industry... Lorem Ipsum is simply dummy text of the
        printing and typesetting industry... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry... Lorem Ipsum is simply dummy
        text of the printing and typesetting industry... Lorem Ipsum is simply
        dummy text of the printing and typesetting industry... Lorem Ipsum is
        simply dummy text of the printing and typesetting industry... Lorem
        Ipsum is simply dummy text of the printing and typesetting industry...
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry... Lorem Ipsum is simply dummy text of the printing and
        typesetting industry... Lorem Ipsum is simply dummy text of the printing
        and typesetting industry... Lorem Ipsum is simply dummy text of the
        printing and typesetting industry... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry... Lorem Ipsum is simply dummy
        text of the printing and typesetting industry... Lorem Ipsum is simply
        dummy text of the printing and typesetting industry...
      </p>
      <h5 className="community-subtitle">Sub-Title</h5>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry...
      </p>
      <h5 className="community-subtitle">Sub-Title</h5>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry...
      </p>
      <h5 className="community-subtitle">Sub-Title</h5>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry...
      </p>
    </div>
  );
};

export default BlogContent;
