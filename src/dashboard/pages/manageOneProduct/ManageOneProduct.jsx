import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import ProductSectionOneForm from "./components/ProductSectionOneForm";
import ProductSectionTwoForm from "./components/ProductSectionTwoForm";
import ProductSectionThreeForm from "./components/ProductSectionThreeForm";
import ProductSectionFourForm from "./components/ProductSectionFourForm";
import ProductSectionFiveForm from "./components/ProductSectionFiveForm";
import ProductSectionSevenForm from "./components/ProductSectionSevenForm";
import { title } from "framer-motion/client";
import ProductSectionNineForm from "./components/ProductSectionNineForm";
import ProductSectionTenForm from "./components/ProductSectionTenForm";
import ProductSectionSixForm from "./components/ProductSectionSixForm";

// Import product management sections

const ManageOneProduct = () => {
  const { id } = useParams(); // product ID
  const [product, setProduct] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Product Info",
      component: <ProductSectionOneForm categoryId={id} />,
    },
    {
      title: "Product Fliped Cards",
      component: <ProductSectionTwoForm categoryId={id} />,
    },
    {
      title: "Product Video Banner",
      component: <ProductSectionThreeForm categoryId={id} />,
    },
    {
      title: "Product Headlines",
      component: <ProductSectionFourForm categoryId={id} />,
    },
    {
      title: "Product Slider Cards",
      component: <ProductSectionFiveForm categoryId={id} />,
    },
    {
      title: "Product Content Grid Sector",
      component: <ProductSectionSixForm categoryId={id} />,
    },
    {
      title: "Product Qustions Sections",
      component: <ProductSectionSevenForm categoryId={id} />,
    },
    {
      title: "Product Tickets Slider Sections",
      component: <ProductSectionNineForm categoryId={id} />,
    },
    {
      title: "Product videos Tickets Slider Sections",
      component: <ProductSectionTenForm categoryId={id} />,
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const toggleSection = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };

  if (!product) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        {product.image && (
          <img
            src={`${BaseAPI}/uploads/${product.image}`}
            alt={product.name}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        )}
        <h3 className="mt-2">{product.name}</h3>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-3">
          <button
            className="btn btn-outline-dark w-100 text-start"
            onClick={() => toggleSection(index)}
          >
            {section.title}
          </button>
          {activeSection === index && (
            <div className="p-3 border border-dark rounded-bottom">
              {section.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageOneProduct;
