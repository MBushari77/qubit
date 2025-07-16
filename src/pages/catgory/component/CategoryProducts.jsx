import React from "react";
import "./CategoryProducts.css";
import watchImage from "./img.png"; // Replace with actual image paths
import API from "../../../utils/API";
import { useEffect, useState } from "react";
import BaseAPI from "../../../utils/BaseAPI";

const CategoryProducts = ({ categoryId }) => {
  const dummyProducts = Array(4).fill({
    name: "Product Name",
    tagline: "Product TagLine",
    description: "The most advanced Mac laptops for demanding workflows.",
    sizes: ["33”", "33”", "33”"],
    features: ["feature one", "feature two", "feature three"],
    thumbnails: Array(4).fill(watchImage),
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(
          `/sectionthree/by-category/${categoryId}`
        );
        console.log(response.data.data);
        setProducts(response.data.data || []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container category-products-wrapper py-5">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="category-products-card text-center">
              <h6 className="category-products-tagline">
                {product.headline_one}
              </h6>

              <span className="category-products-title">
                {product.headline_two}
              </span>

              <img
                src={`${BaseAPI}/${product.image}`}
                alt={product.headline_one}
                className="category-products-main-image mb-3"
              />

              <div className="category-products-name">
                {product.headline_three}
              </div>
              <p className="category-products-desc">{product.description}</p>

              <button className="home_prod_card_show_more_link category_hero_button category_product_page_button">
                Learn More
              </button>

              <center>
                <ul
                  className="category-products-features list-unstyled"
                  style={{ width: "fit-content", textAlign: "center" }}
                >
                  {JSON.parse(product.advantages).map((adv, i) => (
                    <i key={i}>{adv.name}</i>
                  ))}
                </ul>
              </center>
              <div className="category-products-dots mb-2">
                {JSON.parse(product.icons).map((icon, i) => (
                  <span key={i} className={`bi bi-${icon}`} />
                ))}
              </div>
              {/* <hr /> */}

              <div className="category-products-sizes">
                <h4> Available sizes</h4>
                <div className="p"> {product.headline_two}</div>
                <div className="br" />
                {JSON.parse(product.sizes).map((size, i) => (
                  <span key={i} className="size_tag">
                    {size}"
                  </span>
                ))}
              </div>

              <p className="category-products-desc">{product.about}</p>

              <div className="category-products-thumbnails my-3">
                <h6>Features</h6>
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
                      <div className="category-products-thumb-box-hr" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
