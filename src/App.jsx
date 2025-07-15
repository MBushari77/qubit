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
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/sub-category/:id" element={<SubCategory />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<CommunityBlogPage />} />
        {/* ####################################################### */}
        {/* ####################################################### */}
        {/* ####################################################### */}
        {/* Dashboard Section */}
        {/* handle login later */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
