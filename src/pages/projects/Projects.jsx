import React, { useEffect, useState } from "react";
import "./projects.css";
import CardSlider from "../product/components/ProductCardSlider";
import API from "../../utils/API";
import RoadMap from "./components/RoadMap";
import ProjectsProducts from "./components/ProjectsProducts";
import LogoSlider from "./components/LogoSlider";
import ProductBigSlider from "../product/components/ProductBigSlider";
import QuestionSection from "../product/components/QuestionSection";

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

  return (
    <>
      <div className="projects_page_container">
        <CardSlider slides={ticketSlider} />
        <RoadMap roadmapData={roadmapData} />
        <ProjectsProducts />
        <LogoSlider logos={logos} />
      </div>
      <ProductBigSlider slides={otherProjects} />
      {/* <ProjectQuestions /> */}
      <div className="project_black_section">
        <QuestionSection questionData={projectsQuestion} />
        <ProductBigSlider slides={blogs} />
      </div>
    </>
  );
};

export default Projects;
