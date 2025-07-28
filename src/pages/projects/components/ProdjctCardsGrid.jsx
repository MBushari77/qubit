import React, { useEffect, useState } from "react";
import "./ProjectCardsGrid.css";
import CardForGrid from "./CardForGrid";
import API from "../../../utils/API";

const ProjectCardsGrid = () => {
  const [ticketSlider, setTicketSlider] = useState([]);

  useEffect(() => {
    const fetchTicketSlider = async () => {
      try {
        const response = await API.get(`/projegridctcontent`);
        setTicketSlider(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket slider:", error);
      }
    };
    fetchTicketSlider();
  }, []);

  return (
    <div className="container-fluid project-cards-grid py-4">
      <div className="row h-100 d-none d-md-flex">
        {/* Desktop View */}
        <div className="col-md-6 d-flex flex-column">
          <CardForGrid slide={ticketSlider[0]} idx={0} />
          <div className="row flex-grow-1">
            <div className="col-6 pe-2">
              <CardForGrid slide={ticketSlider[1]} idx={1} />
            </div>
            <div className="col-6 ps-2">
              <CardForGrid slide={ticketSlider[2]} idx={2} />
            </div>
          </div>
        </div>
        <div className="col-md-6 row">
          <div className="col-6 margin-top-zero">
            <CardForGrid slide={ticketSlider[3]} idx={3} />
          </div>
          <div className="col-6 margin-top-zero">
            <CardForGrid slide={ticketSlider[4]} idx={4} />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="d-block d-md-none">
        {ticketSlider.map((slide, idx) => (
          <div className="mb-3" key={idx}>
            <CardForGrid slide={slide} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardsGrid;
