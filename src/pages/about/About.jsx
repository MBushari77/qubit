import React, { useEffect, useState } from "react";
import AboutHeader from "./components/AboutHeader";
import "./AboutPage.css";
import AboutFloatingCards from "./components/AboutFloatingCards";
import AboutGridSection from "./components/AboutGridSection";
import API from "../../utils/API";
import CardSlider from "../product/components/ProductCardSlider";
import LogoSlider from "../projects/components/LogoSlider";

const About = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await API.get(`/projectteammembers`);
      console.log(res.data);
      setItems(res.data || []);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [logos, setLogos] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/clientslogos`);
        setLogos(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);
  return (
    <div className="about_page_container">
      <AboutHeader />
      <AboutFloatingCards />
      <AboutGridSection />
      <CardSlider slides={items} />
      <LogoSlider logos={logos} />
    </div>
  );
};

export default About;
