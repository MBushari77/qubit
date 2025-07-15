import React, { useState } from "react";
// import "./Tickets.css";
// import cover from "./tickites_images/PixelBloom digital signage-1.jpg";
// import bloom2 from "./tickites_images/PixelBloom digital signage-2.jpg";
// import bloom3 from "./tickites_images/PixelBloom digital signage-3.jpg";
// import bloom4 from "./tickites_images/PixelBloom digital signage-4.jpg";
// import bloom5 from "./tickites_images/PixelBloom digital signage-5.jpg";
// import bloom6 from "./tickites_images/PixelBloom digital signage-6.jpg";
// import bloom7 from "./tickites_images/PixelBloom digital signage-7.jpg";
// import bloom8 from "./tickites_images/PixelBloom digital signage-8.jpg";

// import bg1 from "./tickites_images/bg/1.jpg";
// import bg2 from "./tickites_images/bg/2.jpg";
// import bg3 from "./tickites_images/bg/3.jpg";
// import bg4 from "./tickites_images/bg/4.jpg";
// import bg5 from "./tickites_images/bg/5.jpg";
// import bg6 from "./tickites_images/bg/6.jpg";
// import bg7 from "./tickites_images/bg/7.jpg";

// // import pdfs from assets
// import pdf1 from "./pdfs/PixelBloom digital signage.pdf";
import BaseAPI from "../../../utils/BaseAPI";

// const bloom = [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8];
// const backgrounds = [
//   {
//     img: bg1,
//     name: "PixelBloom ",
//     info: "PixelBloom Two offers enhanced clarity and brightness.",
//     images: [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8],
//     color: "white",
//     file: pdf1,
//   },
//   {
//     img: bg3,
//     name: "",
//     info: "Ideal for indoor displays, PixelBloom Three stands out.",
//     images: [
//       kioskSheet1,
//       kioskSheet2,
//       kioskSheet3,
//       kioskSheet4,
//       kioskSheet5,
//       kioskSheet6,
//       kioskSheet7,
//       kioskSheet8,
//     ],
//     color: "black",
//     file: pdf1,
//   },
//   {
//     img: bg2,
//     name: "PixelBloom Four",
//     info: "PixelBloom Four delivers seamless integration for businesses.",
//     images: [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8],
//     color: "white",
//     file: pdf1,
//   },
//   {
//     img: bg4,
//     name: "PixelBloom Five",
//     info: "A versatile solution, PixelBloom Five adapts to any space.",
//     images: [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8],
//     color: "black",
//     file: pdf1,
//   },
//   {
//     img: bg6,
//     name: "PixelBloom Seven",
//     info: "Perfect for events, PixelBloom Seven is easy to set up.",
//     images: [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8],
//     color: "white",
//     file: pdf1,
//   },
//   {
//     img: bg5,
//     name: "PixelBloom Six",
//     info: "PixelBloom Six combines efficiency with stunning visuals.",
//     images: [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8],
//     color: "black",
//     file: pdf1,
//   },
//   {
//     img: bg7,
//     name: "PixelBloom Eight",
//     info: "PixelBloom Eight features advanced connectivity options.",
//     images: [bloom2, bloom3, bloom4, bloom5, bloom6, bloom7, bloom8],
//     color: "white",
//     file: pdf1,
//   },
// ];

const grid = [8, 4, 4, 4, 4, 4, 8];
const colors = ["white", "black"];

const SubCategoryGrid = ({ backgrounds }) => {
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
        {/* <div className="col-12 home_ticket">
          <div
            className="home_prod_card"
            style={{
              backgroundImage: `url(${cover})`,
            }}
          >
            <div className="home_prod_card_info">
              <div className="home_prod_card_show_more">
                <h3>Hello There how are you</h3>
              </div>
            </div>
          </div>
        </div> */}

        {backgrounds.map((bg, index) => (
          <div
            className={`col-lg-${grid[index]} col-md-${grid[index]} col-sm-12 home_ticket`}
            key={index}
          >
            <div
              className="home_prod_card"
              style={{
                backgroundImage: `url("${BaseAPI}/uploads/${bg.icon}")`,
              }}
            >
              <div className="home_prod_card_info">
                <div className="home_prod_card_show_more">
                  <div>
                    <div>
                      {" "}
                      <h3
                        className="card_info_name"
                        style={{ color: colors[index % 2] }}
                      >
                        {bg.title}
                      </h3>
                      <i
                        className="card_info_description"
                        style={{ color: colors[index % 2] }}
                      >
                        {bg.info}
                      </i>
                    </div>
                    <button
                      className="home_prod_card_show_more_link"
                      onClick={() => handleLearnMore(index)}
                    >
                      Learn More
                    </button>
                    {/* <button className="home_prod_card_show_more_link home_prod_card_show_more_link2">
                      Brochure
                    </button> */}
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

export default SubCategoryGrid;
