import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectImageVideo from "./components/ProjectImageVideo";
import "./Project.css";
import API from "../../utils/API";
import ProjectContent from "./components/ProjectContent";
import ProjectQuestionSection from "./components/ProjectQuestionSection";
import ProjectContentSlides from "./components/ProjectContentSlides";

const Project = () => {
  const { id } = useParams();

  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await API.get(`/singleprojectcontent/category/${id}`);
        setContent(response.data);
      } catch (error) {
        console.error("Failed to fetch Content:", error);
      }
    };
    if (id) {
      fetchContent();
    }
  }, [id]);

  // Questionar
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(
          `/singleprojectquestions/category/${id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch Questions:", error);
      }
    };
    if (id) {
      fetchQuestions();
    }
  }, [id]);

  // all Projects

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get(`/singleproject`);
        console.log("Projects");
        console.log(response.data);
        // setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch Projects:", error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div className="single_project_page_container">
      <ProjectImageVideo categoryId={id} />
      <ProjectContent items={content} />
      <ProjectQuestionSection questionData={questions} />
      <ProjectContentSlides />
    </div>
  );
};

export default Project;
