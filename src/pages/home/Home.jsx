import React, { useEffect, useState } from "react";
import HeroSlider from "./homeComponents/HeroSlider";
import Tickets from "./homeComponents/Tickets";
import WhyQubit from "./homeComponents/WhyQubit";
import GroupSlider from "./homeComponents/GroupSlider";
import NewSlider from "./homeComponents/NewSlider";
import API from "../../utils/API";

const Home = () => {
  const images = [
    "https://wallpapers.com/images/featured/desktop-lsjkr6wg7ctq97qv.jpg",
    "https://wallpaperbat.com/img/78102183-greenery-wallpaper.jpg",
    "https://cdn.wallpapersafari.com/42/40/hzw1fV.jpg",
  ];
  const [heroBanners, setHeroBanners] = useState([]);
  useEffect(() => {
    API.get("/herobanner")
      .then((response) => {
        setHeroBanners(response.data.banners || []);
      })
      .catch((error) => {
        console.error("Failed to fetch home banners:", error);
      });
  }, []);

  const [bodySlider, setBodySlider] = useState([]);
  useEffect(() => {
    API.get("/bodyslider")
      .then((response) => {
        setBodySlider(response.data.banners || []);
      })
      .catch((error) => {
        console.error("Failed to fetch body slider:", error);
      });
  }, []);

  const [homeContentSlider, setHomeContentSlider] = useState([]);
  useEffect(() => {
    API.get("/homecontentslider")
      .then((response) => {
        setHomeContentSlider(response.data.sliders || []);
      })
      .catch((error) => {
        console.error("Failed to fetch home content slider:", error);
      });
  }, []);

  const [productBanners, setProductBanners] = useState([]);
  useEffect(() => {
    API.get("/productbanner")
      .then((response) => {
        setProductBanners(response.data.banners || []);
      })
      .catch((error) => {
        console.error("Failed to fetch product banners:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <HeroSlider images={heroBanners} />
      <WhyQubit slides={homeContentSlider} />
      <Tickets backgrounds={productBanners} />
      <GroupSlider />
      <NewSlider slides={bodySlider} />
    </div>
  );
};

export default Home;
