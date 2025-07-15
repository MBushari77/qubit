import React, { useState } from "react";
import "./QuestionSection.css";
import BaseAPI from "../../../utils/BaseAPI";
import { AnimatePresence, motion } from "framer-motion";

const QuestionSection = ({ questionData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleQuestion = (index) => {
    setActiveIndex((prev) => (prev === index ? 0 : index));
  };

  return (
    <>
      {questionData?.length > 0 && (
        <div className="question-section-container">
          {/* Left: Questions */}
          <div className="question-section-left">
            {questionData.map((item, index) => (
              <div
                className={`question-section-block ${
                  activeIndex === index ? "active" : ""
                }`}
                key={index}
              >
                <div
                  className="question-section-question"
                  onClick={() => toggleQuestion(index)}
                >
                  {item.title}{" "}
                  <span
                    className={`bi bi-chevron-down ${
                      activeIndex === index && "bi_active"
                    }`}
                  />
                </div>
                <div
                  className="question-section-answer"
                  style={{
                    maxHeight: activeIndex === index ? "200px" : "0",
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                >
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image with Framer Motion */}
          <div className="question-section-right">
            <AnimatePresence mode="wait">
              {activeIndex !== null && (
                <motion.img
                  key={questionData[activeIndex].icon} // use key to trigger AnimatePresence
                  src={`${BaseAPI}/uploads/${questionData[activeIndex].icon}`}
                  alt="Related visual"
                  className="question-section-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionSection;
