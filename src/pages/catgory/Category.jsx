import React, { useEffect, useState } from "react";
import CategorySlider from "./component/CategorySlider";
import CategoryHeroSection from "./component/CategoryHeroSection";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";
import SectionTwoCategory from "../../dashboard/pages/manageOneCategory/component/SectionTwoCategory";
import CategoryImageVideo from "./component/CategoryImageVideo";
import CategoryProducts from "./component/CategoryProducts";
import API from "../../utils/API";
import Gallary from "../../components/Gallary";
import QuestionSection from "../product/components/QuestionSection";
import ProductContentCards from "../product/components/ProductContentCards";
import { name } from "dayjs/locale/ar";

const Category = () => {
  const { id } = useParams();

  // Gallary
  const [gallary, setGallary] = useState([]);
  useEffect(() => {
    const fetchGallary = async () => {
      try {
        const response = await API.get(`/sectionfour/category/${id}`);
        console.log("Gallary");
        console.log(response.data);
        setGallary(response.data);
      } catch (error) {
        console.error("Failed to fetch Gallary:", error);
      }
    };
    if (id) {
      fetchGallary();
    }
  }, [id]);

  // Questionar
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/sectionsix/category/${id}`);
        console.log("Questions");
        console.log(response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch Questions:", error);
      }
    };
    if (id) {
      fetchQuestions();
    }
  }, [id]);
  // Questionar
  const [contentCards, setcontentCards] = useState([]);

  useEffect(() => {
    const fetchcontentCards = async () => {
      try {
        const response = await API.get(`/sectionfive/category/${id}`);
        console.log("contentCards");
        console.log(response.data);
        setcontentCards(response.data);
      } catch (error) {
        console.error("Failed to fetch contentCards:", error);
      }
    };
    if (id) {
      fetchcontentCards();
    }
  }, [id]);
  const transformProducts = (products) => {
    return products.map(({ paragraph, image, ...rest }) => ({
      ...rest,
      text: paragraph,
      icon: image,
    }));
  };
  const transformProducts2 = (products) => {
    return products.map(({ paragraph, image, name, ...rest }) => ({
      text: paragraph,
      icon: image,
      title: name,
    }));
  };

  return (
    <div className="category_page_container">
      {/* <CategorySlider /> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <CategoryHeroSection category_id={id} />
      <CategoryImageVideo categoryId={id} />
      <CategoryProducts categoryId={id} />
      <Gallary backgrounds={gallary} />
      <div className="questions_on_category">
        <ProductContentCards cardsData={transformProducts2(contentCards)} />
        <QuestionSection questionData={transformProducts(questions)} />
      </div>
    </div>
  );
};

export default Category;
