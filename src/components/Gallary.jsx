import React, { useState } from "react";
import "./Gallary.css";
import BaseAPI from "../utils/BaseAPI";

const grid = [4, 4, 4, 8, 4, 4, 8];
const colors = ["white", "black"];

const Gallary = ({ backgrounds }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleLearnMore = (index) => {
    setActiveProduct(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveProduct(null);
  };

  return (
    <div className="home_tickets_container">
      <div className="row hometicket_section">
        {backgrounds.map((bg, index) => (
          <div
            className={`col-lg-${grid[index]} col-md-${grid[index]} col-sm-12 home_ticket`}
            key={index}
          >
            <div
              className="home_prod_card"
              style={{
                backgroundImage: `url("${BaseAPI}/uploads/${bg.image}")`,
              }}
            >
              <div className="home_prod_card_info">
                <div className="home_prod_card_show_more">
                  <div>
                    <div className={`category_gallary_${index}`}>
                      {" "}
                      <div>
                        <h3
                          className="card_info_name"
                          style={{ color: bg.color || colors[index % 2] }}
                        >
                          {bg?.title.length < 2 ? "" : bg?.title}
                        </h3>
                        <i
                          className="card_info_description"
                          style={{ color: bg.color || colors[index % 2] }}
                        >
                          {bg.info}
                        </i>
                      </div>
                    </div>
                    <button
                      className="home_prod_card_show_more_link"
                      onClick={() => handleLearnMore(index)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="product_modal">
          <button
            className="modal_close pi pi-times"
            onClick={closeModal}
          ></button>

          <div className="modal_content_vertical">
            {activeProduct !== null && (
              <>
                {backgrounds[activeProduct || 0].images.map((image, index) => (
                  <img key={index} src={image} alt={`${index + 1}`} />
                ))}
              </>
            )}
            <div className="modal_footer">
              <div>
                <button className="footer_pdf_button pi pi-file-pdf"></button>
              </div>
              <div>
                <h4>Something Should Be In Here</h4>
                <p>Yeah Something Should Be In Here</p>
              </div>
            </div>
            <div className="download_pdf_footer">
              <button>Download Spec Sheet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallary;
