import React from "react";
import "./ProjectsProducts.css";
import API from "../../../utils/API";
import { useEffect, useState } from "react";
import BaseAPI from "../../../utils/BaseAPI";

const ProjectsProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(`/project_product`);
        console.log("response.data.data");
        console.log(response.data);
        setProducts(response.data || []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container category-products-wrapper project_products_container_cards py-5">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="category-products-card text-center">
              <h5 className="category-products-title">{product.title}</h5>

              <img
                src={`${BaseAPI}/uploads/${product.image}`}
                alt={product.name}
                className="category-products-main-image mb-3"
              />

              <div className="category-products-dots mb-2">
                {JSON.parse(product.icons).map((icon, i) => (
                  <span key={i} className={`bi bi-${icon}`} />
                ))}
              </div>

              <h6 className="category-products-tagline">{product.name}</h6>
              <button className="home_prod_card_show_more_link category_hero_button category_product_page_button">
                Learn More
              </button>

              <center>
                <ul
                  className="category-products-features list-unstyled"
                  style={{ width: "fit-content" }}
                >
                  {JSON.parse(product.features).map((adv, i) => (
                    <li key={i}>
                      <span
                        className={`bi bi-${
                          adv.value ? "check-circle" : "slash-circle"
                        }`}
                      />{" "}
                      {adv.text}
                    </li>
                  ))}
                </ul>
              </center>
              <hr />

              <p className="category-products-desc">{product.text}</p>

              {/* <div className="category-products-name">
                {product.headline_three}
              </div> */}
              <div className="category-products-sizes">
                Available sizes: <div className="br" />
                {JSON.parse(product.sizes).map((size, i) => (
                  <span key={i} className="size_tag">
                    {size}"
                  </span>
                ))}
              </div>

              <p className="category-products-desc">{product.moreInfo}</p>

              {/* <div className="category-products-thumbnails my-3">
                <div className="row g-1">
                  {JSON.parse(product.features).map((feature, i) => (
                    <div key={i} className="col-12">
                      <div className="category-products-thumb-box text-center">
                        <img
                          src={`${BaseAPI}/${feature.image}`}
                          alt="Thumbnail"
                          className="category-products-thumb"
                        />
                        <div className="category-products-thumb-text">
                          {feature.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsProducts;
