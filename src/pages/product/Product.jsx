import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import ProductHeroSection from "./components/ProductHeroSection";
import ProductContentCards from "./components/ProductContentCards";
import ProductFlipedCards from "./components/ProductFlipedCards";
import ProductBannerVideos from "./components/ProductBannerVideos";
import ContentBlocks from "./components/ContentBlocks";
import ProductBigSlider from "./components/ProductBigSlider";
import ProductMediaGrid from "./components/ProductMediaGrid";
import QuestionSection from "./components/QuestionSection";
import ProductCardSlider from "./components/ProductCardSlider";
import VideoGrid from "./components/VideoGrid";
import { a } from "framer-motion/client";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  //   ####################################
  //   handle section one
  const [sectionOneCards, setSectionOneCards] = useState([]);
  useEffect(() => {
    const fetchSectionOneCards = async () => {
      try {
        const response = await API.get(`/productssectionone/category/${id}`);
        setSectionOneCards(response.data);
      } catch (error) {
        console.error("Failed to fetch section one cards:", error);
      }
    };
    if (id) {
      fetchSectionOneCards();
    }
  }, [id]);
  const [flipedCards, setFlipedCards] = useState([]);
  useEffect(() => {
    const fetchFlipedCards = async () => {
      try {
        const response = await API.get(`/productssectiontwo/category/${id}`);
        setFlipedCards(response.data);
      } catch (error) {
        console.error("Failed to fetch fliped cards:", error);
      }
    };
    if (id) {
      fetchFlipedCards();
    }
  }, [id]);
  //   Video
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get(`/productssectionthree/category/${id}`);
        setVideos(response.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    if (id) {
      fetchVideos();
    }
  }, [id]);

  const [sectionFourBlocks, setSectionFourBlocks] = useState([]);
  useEffect(() => {
    const fetchSectionFourBlocks = async () => {
      try {
        const response = await API.get(`/productssectionfour/category/${id}`);
        setSectionFourBlocks(response.data);
      } catch (error) {
        console.error("Failed to fetch section four blocks:", error);
      }
    };
    if (id) {
      fetchSectionFourBlocks();
    }
  }, [id]);
  const [bigSliderContent, setBigSliderContent] = useState([]);
  useEffect(() => {
    const fetchBigSliderContent = async () => {
      try {
        const response = await API.get(`/productssectionfive/category/${id}`);
        setBigSliderContent(response.data);
      } catch (error) {
        console.error("Failed to fetch big slider content:", error);
      }
    };
    if (id) {
      fetchBigSliderContent();
    }
  }, [id]);

  // media grid
  const [mediaGridContent, setMediaGridContent] = useState([]);
  useEffect(() => {
    const fetchMediaGridContent = async () => {
      try {
        const response = await API.get(`/productssectionsix/category/${id}`);
        setMediaGridContent(response.data);
      } catch (error) {
        console.error("Failed to fetch media grid content:", error);
      }
    };
    if (id) {
      fetchMediaGridContent();
    }
  }, [id]);

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/productssectionseven/category/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    if (id) {
      fetchQuestions();
    }
  }, [id]);
  const [ticketSlider, setTicketSlider] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/productssectionnine/category/${id}`);
        setTicketSlider(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    if (id) {
      fetchTicketSlider();
    }
  }, [id]);

  const [gridVideos, setGridVideos] = useState([]);
  useEffect(() => {
    const fetchGridVideos = async () => {
      try {
        const response = await API.get(`/productssectionten/category/${id}`);
        setGridVideos(response.data);
      } catch (error) {
        console.error("Failed to fetch grid videos:", error);
      }
    };
    if (id) {
      fetchGridVideos();
    }
  }, [id]);
  return (
    <div>
      <div style={{ height: "4.5rem" }} />
      <ProductHeroSection product={product} />
      <ProductContentCards cardsData={sectionOneCards} />
      <ProductFlipedCards contentData={flipedCards} />
      <ProductBannerVideos videoData={videos} />
      <ContentBlocks blocksData={sectionFourBlocks} />
      <ProductBigSlider slides={bigSliderContent} />
      <div
        style={{
          background: "linear-gradient(to top, #131313,rgb(13, 13, 13), white)",
          height: "20rem",
          backgroundColor: "aquamarine",
        }}
      />

      <div style={{ backgroundColor: "#131313" }}>
        <ProductMediaGrid product={product} gridContent={mediaGridContent} />
        <QuestionSection questionData={questions} />
        <ProductCardSlider slides={ticketSlider} />
        <VideoGrid videos={gridVideos} />
      </div>
    </div>
  );
};

export default Product;
