import React, { useState } from "react";
import dayjs from "dayjs";
import "./calendar.css";
import "dayjs/locale/ar";

dayjs.locale("en");

// Monday (1) to Friday (5)
const weekdays = ["M", "T", "W", "T", "F"]; // Skipping S (Saturday) and S (Sunday)

const DynamicEventCalendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [platform, setPlatform] = useState("");

  const firstDayOfMonth = currentMonth.startOf("month");

  // Find start date: go back to Monday before or equal to firstDayOfMonth
  const offsetToMonday = (firstDayOfMonth.day() + 6) % 7; // make Monday = 0
  const calendarStartDay = firstDayOfMonth.subtract(offsetToMonday, "day");

  // Build calendar days: filter out Saturday(6) and Sunday(0)
  const days = [];
  let i = 0;
  while (days.length < 25) {
    const date = calendarStartDay.add(i, "day");
    const dayOfWeek = date.day();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push({
        date,
        currentMonth: date.month() === currentMonth.month(),
      });
    }

    i++;
  }

  const handleDateClick = (day) => {
    setSelectedDate(day.format("YYYY-MM-DD"));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // optionally you can log or send data here
    console.log({
      date: selectedDate,
      time,
      name,
      phone,
    });
  };

  return (
    <div className="event-calendar">
      <div className="calendar-header">
        <h4>Book a Meeting Now</h4>
        <h5>{currentMonth.format("MMMM YYYY")}</h5>
      </div>
      <div className="calendar-body">
        <div className="weekdays weekdays-5">
          {weekdays.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>
        <div className="days days-5-cols">
          {days.map((dayObj, i) => {
            const isToday = dayObj.date.isSame(dayjs(), "day");
            const isSelected =
              selectedDate && dayObj.date.isSame(selectedDate, "day");

            return (
              <div
                key={i}
                className={`day 
                  ${!dayObj.currentMonth ? "other-month" : ""} 
                  ${isToday ? "has-event" : ""} 
                  ${isSelected ? "selected-day" : ""}
                `}
                onClick={() => handleDateClick(dayObj.date)}
              >
                {dayObj.date.date()}
              </div>
            );
          })}
        </div>
        <div className="row caleder_controler">
          <div className="col-6">
            <button
              onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
              className="bi bi-chevron-left"
            ></button>
          </div>
          <div className="col-6">
            <button
              onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
              className="bi bi-chevron-right"
            ></button>
          </div>
        </div>
        {/* inputs fileds here */}
        <form onSubmit={handleSubmit} className="calendar-form mt-3 row g-3">
          <div className="col-6">
            <div className="calendar-form-input-group">
              <i className="bi bi-clock"></i>
              <input
                type="time"
                className="calendar-form-input form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="calendar-form-input-group">
              <i className="bi bi-person"></i>
              <input
                type="text"
                className="calendar-form-input form-control"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="calendar-form-input-group">
              <i className="bi bi-telephone"></i>
              <input
                type="tel"
                className="calendar-form-input form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-4 text-center">
            <select
              className="form-select calendar-form-select"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
            >
              <option value="">Select Meeting Type</option>
              <option value="zoom">Zoom</option>
              <option value="google_meet">Google Meet</option>
              <option value="teams">Microsoft Teams</option>
              <option value="physical">Physical Meeting</option>
            </select>
          </div>

          <div className="col-8 text-center">
            <button type="submit" className="calendar-form-submit-btn">
              Send
            </button>
          </div>

          {submitted && (
            <div className="col-12">
              <div className="calendar-form-success alert alert-success mt-3">
                Your request has been sent successfully. Thank you for
                contacting us!
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DynamicEventCalendar;
