import React from "react";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductList from "../../ui/ProductList";

// Banner Images
import HomeBanner1 from "../../../assets/banner-image/macbook-banner.png";
import HomeBanner2 from "../../../assets/banner-image/ps5-controller-banner.png";
import HomeBanner3 from "../../../assets/banner-image/iphone-banner.png";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  lazyLoad: "ondemand",
  accessibility: true,
};

const banners = [
  { src: HomeBanner1, alt: "MacBook Banner" },
  { src: HomeBanner2, alt: "PS5 Controller Banner" },
  { src: HomeBanner3, alt: "iPhone Banner" },
];

function Home() {
  return (
    <div className="container">
      {/* Banner Slider */}
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {banners.map((banner, index) => (
            <div key={index} className="slide">
              <img
                className="d-block w-100"
                src={banner.src}
                alt={banner.alt}
              />
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-center mt-4 mb-4">🔥 Our Special Offers! 🔥</h1>

      {/* Product List */}
      <ProductList />
    </div>
  );
}

export default Home;
