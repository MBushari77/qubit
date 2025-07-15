import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        {/* <div className="col-12 col-md-3 col-lg-2 bg-light p-3">
          <div className="row align-items-center">
            <h4 className="mb-3">Dashboard</h4>
          </div>
        </div> */}
        {/* Main content */}
        <div
          className="col-12 col-md-9 col-lg-10 p-4"
          style={{ textAlign: "center" }}
        >
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/dashboard/banners" className="nav-link">
                Banners
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/categories" className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/sub_category" className="nav-link">
                Sub Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/projects" className="nav-link">
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
