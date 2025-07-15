import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./subCategory.css";
import API from "../../utils/API";
import SubCategoryHeroSection from "./components/SubCategoryHeroSection";
import ProductContentCards from "../product/components/ProductContentCards";
import ProductBigSlider from "../product/components/ProductBigSlider";
import SubCategoryGrid from "./components/SubCategoryGrid";

import ProductCardSlider from "../product/components/ProductCardSlider";
import QuestionSection from "../product/components/QuestionSection";

const SubCategory = () => {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await API.get(`/sub_category/${id}`);
        console.log(response.data);
        setSubCategory(response.data);
      } catch (error) {
        console.error("Failed to fetch subcategory:", error);
      }
    };
    if (id) {
      fetchSubCategory();
    }
  }, [id]);

  //   handle section one
  const [sectionOneCards, setSectionOneCards] = useState([]);
  useEffect(() => {
    const fetchSectionOneCards = async () => {
      try {
        const response = await API.get(`/subcategorysectionone/category/${id}`);
        setSectionOneCards(response.data);
      } catch (error) {
        console.error("Failed to fetch section one cards:", error);
      }
    };
    if (id) {
      fetchSectionOneCards();
    }
  }, [id]);

  //   big sldier
  const [bigSliderContent, setBigSliderContent] = useState([]);
  useEffect(() => {
    const fetchBigSliderContent = async () => {
      try {
        const response = await API.get(`/subcategorysectiontwo/category/${id}`);
        setBigSliderContent(response.data);
      } catch (error) {
        console.error("Failed to fetch big slider content:", error);
      }
    };
    if (id) {
      fetchBigSliderContent();
    }
  }, [id]);

  //   gird cards
  const [mediaGridContent, setMediaGridContent] = useState([]);
  useEffect(() => {
    const fetchMediaGridContent = async () => {
      try {
        const response = await API.get(
          `/subcategorysectionthree/category/${id}`
        );
        console.log(response.data);
        setMediaGridContent(response.data);
      } catch (error) {
        console.error("Failed to fetch media grid content:", error);
      }
    };
    if (id) {
      fetchMediaGridContent();
    }
  }, [id]);

  // tickets slider
  const [ticketSlider, setTicketSlider] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(
          `/subcategorysectionfour/category/${id}`
        );
        setTicketSlider(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    if (id) {
      fetchTicketSlider();
    }
  }, [id]);

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(
          `/subcategorysectionfive/category/${id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    if (id) {
      fetchQuestions();
    }
  }, [id]);

  return (
    <div className="sub_category_page_container">
      <SubCategoryHeroSection subCategory={subCategory} />
      <ProductContentCards cardsData={sectionOneCards} />
      <ProductBigSlider slides={bigSliderContent} />
      <SubCategoryGrid backgrounds={mediaGridContent} />
      <div className="category_black_section">
        <ProductCardSlider slides={ticketSlider} />
        <QuestionSection questionData={questions} />
      </div>
    </div>
  );
};

export default SubCategory;
