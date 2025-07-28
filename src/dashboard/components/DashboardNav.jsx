import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // Clear auth token or user data
      localStorage.removeItem("isLoggedIn");
      // Redirect to login
      window.location.reload();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main content */}
        <div
          className="col-12 col-md-9 col-lg-10 p-4"
          style={{ textAlign: "center" }}
        >
          <ul className="nav nav-pills mb-3">
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
            <li className="nav-item">
              <Link to="/dashboard/single_project" className="nav-link">
                Single Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/community" className="nav-link">
                Community
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/community_blogs" className="nav-link">
                Community Blogs
              </Link>
            </li>
            <li className="nav-item ms-auto">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>

          {/* Render the nested route component */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
