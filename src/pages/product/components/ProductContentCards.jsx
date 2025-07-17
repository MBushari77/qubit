import React from "react";
import "./ProductContentCards.css";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const ProductContentCards = ({ cardsData }) => {
  return (
    <div className="container product-content-cards-container py-5">
      <center>
        <p className="content_cards_tagline">values</p>
        <h1 className="content_cards_title">
          Designed to make <br />a differnce{" "}
        </h1>
      </center>
      <div className="row content-cards-inner-container">
        {cardsData.map((card, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="product-content-cards-card text-center">
              <img
                src={`${BaseAPI}/uploads/${card.icon}`}
                alt={card.title}
                className="product-content-cards-icon mb-3"
              />
              <h5 className="product-content-cards-title mb-2">{card.title}</h5>

              <Link className="product-content-cards-text">{card.text}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductContentCards;
