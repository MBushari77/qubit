import React, { useEffect, useState } from "react";
import "./projects.css";
import CardSlider from "../product/components/ProductCardSlider";
import API from "../../utils/API";
import RoadMap from "./components/RoadMap";
import ProjectsProducts from "./components/ProjectsProducts";
import LogoSlider from "./components/LogoSlider";
import ProductBigSlider from "../product/components/ProductBigSlider";
import QuestionSection from "../product/components/QuestionSection";
import CrewGrid from "./components/CrewGrid";
import ProjectsMainSlider from "./components/ProjectsMainSlider";
import MediaOnProjectPage from "./components/MediaOnProjectPage";
import ProjectBigCards from "./components/ProjectBigCards";
import ProjectCardsGrid from "./components/ProdjctCardsGrid";
import ProjectCallender from "./components/ProjectCallender";

const Projects = () => {
  const [ticketSlider, setTicketSlider] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projectcrew`);
        setTicketSlider(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);

  const [roadmapData, setRoadmapData] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projectCycle`);
        setRoadmapData(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
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

  const [otherProjects, setOtherProjects] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projectpreprojects`);
        setOtherProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);

  const [projectsQuestion, setProjectsQuestion] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projectquestions`);
        setProjectsQuestion(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projectblogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);

  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projectcontentslider`);
        setContent(response.data.sliders);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);

  return (
    <>
      <div className="projects_page_container">
        <div className="crew-title">
          <span>OUR CREW</span>
        </div>
        <CrewGrid slides={ticketSlider} />
        {/* <CardSlider slides={ticketSlider} /> */}
        <ProjectsMainSlider slides={content} />
        {/* <RoadMap roadmapData={roadmapData} /> */}
        <MediaOnProjectPage media={roadmapData} />
        {/* <ProjectsProducts /> */}
        <LogoSlider logos={logos} />
        <br />
        <ProjectBigCards slides={blogs} />
        <ProjectCardsGrid />
      </div>
      <ProjectCallender />

      <ProductBigSlider slides={otherProjects} />
      {/* <ProjectQuestions /> */}
      <div className="project_black_section">
        <QuestionSection questionData={projectsQuestion} />
      </div>
    </>
  );
};

export default Projects;
