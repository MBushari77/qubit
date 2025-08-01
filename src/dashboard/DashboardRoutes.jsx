import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardNav from "./components/DashboardNav";
import AddHeroBanner from "./pages/heroBanners/AddHeroBanner";
import BannerPage from "./pages/allBanners/BannerPage";
import AddProductBanner from "./pages/productBanner/ProductBanner";
import CardsSlider from "./pages/cardsSlider/CardsSlider";
import BodySlider from "./pages/bodySlider/BodySlider";
import AddHomeContentSlider from "./pages/homeContent/AddHomeContentSlider";
import ManageCategories from "./pages/category_page_main/ManageCategories";
import ManageOneCategory from "./pages/manageOneCategory/manageOneCategory";
import AddProduct from "./pages/product_page_main/AddProduct";
import ManageOneProduct from "./pages/manageOneProduct/ManageOneProduct";
import AddSubCategory from "./pages/sub_category_page_main/AddSubCategory";
import ManageOneSubCategory from "./pages/manageSubCategory/ManageOneSubCategory";
import AddProject from "./pages/projects_page_main/AddProject";
import ManageCommunity from "./pages/community_page_main/ManageCommunity";
import ManageOneSubCommunityPost from "./pages/manageOneCommunityPost/ManageOneSubCommunityPost";
import SubCategoryBlogs from "./pages/subCategoryBlogs/SubCategoryBlogs";
import SingleProjectManager from "./pages/single_project_page_main/SingleProjectManager";
import ManageOneProject from "./pages/manageOneProject/ManageOneProject";
import LoginPage from "./pages/login/LoginPAge";

const DashboardRoutes = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLogedIn(true);
    }
  }, []);
  return (
    <div style={{ marginTop: "4.5rem" }}>
      {isLogedIn ? (
        <>
          <DashboardNav />
          <Routes>
            <Route path="/" element={<div>Dashboard Home</div>} />
            <Route path="/banners" element={<BannerPage />} />
            <Route path="/hero-banners" element={<AddHeroBanner />} />
            <Route path="/product-banners" element={<AddProductBanner />} />
            <Route exact path="/cards-slider" element={<CardsSlider />} />
            <Route path="/body-slider" element={<BodySlider />} />
            <Route path="/content-slider" element={<AddHomeContentSlider />} />
            {/* Categories */}
            <Route path="/categories" element={<ManageCategories />} />
            <Route path="/categories/:id" element={<ManageOneCategory />} />
            {/* Products */}
            <Route path="/products" element={<AddProduct />} />
            <Route path="/product/:id" element={<ManageOneProduct />} />
            {/* Sub Categories */}
            <Route path="/sub_category" element={<AddSubCategory />} />
            <Route
              path="/sub_category/:id"
              element={<ManageOneSubCategory />}
            />
            {/* Projects */}
            <Route path="/projects" element={<AddProject />} />
            {/* Community */}
            <Route path="/community" element={<ManageCommunity />} />
            <Route path="/community_blogs" element={<SubCategoryBlogs />} />
            <Route
              path="/community/post/:id"
              element={<ManageOneSubCommunityPost />}
            />{" "}
            {/* Single Project */}
            <Route path="/single_project" element={<SingleProjectManager />} />
            <Route
              path="/manage_singel_project/:id"
              element={<ManageOneProject />}
            />
          </Routes>
        </>
      ) : (
        <>
          <LoginPage setIsLogedIn={setIsLogedIn} />
        </>
      )}
    </div>
  );
};

export default DashboardRoutes;
