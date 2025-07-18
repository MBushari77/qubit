import React, { useState } from "react";
import DynamicEventCalendar from "../../home/homeComponents/DynamicEventCalendar";

const ProjectCallender = () => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="project_callendar_container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12"></div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="hero-slider-card">
            <DynamicEventCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCallender;
