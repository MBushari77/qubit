// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import DashboardRoutes from "./dashboard/DashboardRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from "./pages/catgory/Category";
import Product from "./pages/product/Product";
import SubCategory from "./pages/subCategory/SubCategory";
import Projects from "./pages/projects/Projects";
import Contact from "./pages/contactUs/Contact";
import CommunityBlogPage from "./pages/community/CommunityBlogPage";
import ScrollToTop from "./components/ScrollToTop";
import Project from "./pages/project/Project";
import ProductsAddingSoon from "./components/ProductsAddingSoon";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/one-category/:id" element={<Category />} />
        <Route path="/sub-category/:id" element={<SubCategory />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<CommunityBlogPage />} />
        <Route path="/project/:id" element={<Project />} />
        {/* ####################################################### */}
        {/* ####################################################### */}
        {/* ####################################################### */}
        {/* Dashboard Section */}
        {/* handle login later */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/adding_soon" element={<ProductsAddingSoon />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
