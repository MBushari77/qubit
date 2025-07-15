import React from "react";
import { Link } from "react-router-dom";

const BannerPage = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Banners & Sliders Management</h2>
      <div className="row g-4 justify-content-center">
        {/* Hero Banners */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Hero Banners</h5>
              <p className="card-text">
                Manage your main homepage banners with titles, images, and
                links.
              </p>
              <Link
                to="/dashboard/hero-banners"
                className="btn btn-primary mt-auto"
              >
                Manage Hero Banners
              </Link>
            </div>
          </div>
        </div>

        {/* Content Slider */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Content Cards Slider</h5>
              <p className="card-text">
                Highlight special product offers or new arrivals.
              </p>
              <Link
                to="/dashboard/content-slider"
                className="btn btn-success mt-auto"
              >
                Manage content cards slider
              </Link>
            </div>
          </div>
        </div>

        {/* Product Banners */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Product Banners</h5>
              <p className="card-text">
                Highlight special product offers or new arrivals.
              </p>
              <Link
                to="/dashboard/product-banners"
                className="btn btn-success mt-auto"
              >
                Manage Product Banners
              </Link>
            </div>
          </div>
        </div>

        {/* Card Slider */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Card Slider</h5>
              <p className="card-text">
                Create and edit slider cards for promotions or categories.
              </p>
              <Link
                to="/dashboard/cards-slider"
                className="btn btn-warning mt-auto"
              >
                Manage Card Slider
              </Link>
            </div>
          </div>
        </div>

        {/* Body Slider */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Body Slider</h5>
              <p className="card-text">
                Manage and customize the body slider for your website, including
                images, links, and display order.
              </p>
              <Link
                to="/dashboard/body-slider"
                className="btn btn-info mt-auto"
              >
                Manage Body Slider
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
