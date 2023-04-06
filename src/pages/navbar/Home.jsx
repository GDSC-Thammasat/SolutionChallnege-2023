import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuestionBodypart from "../../component/QuestionBodyPart";
import "../../style/main.css";
import "../../style/button.css";

import home1 from '../../assets/images/home/home1.jpg'
import home2 from '../../assets/images/home/home2.jpg'
import home3 from '../../assets/images/home/home3.jpg'

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <body id="home-page">
      <section className="carousel">
        <Slider {...settings}>
          <div className="carousel-item">
            <div className="carousel-item__image">
              <a href="https://www.samitivejhospitals.com/article/detail/understanding-office-syndrome">
                <img src={home1} alt="carousel item" />
                <div className="carousel-item__overlay">
                  <h4>What is Office Syndrome?</h4>
                  {/* <p>Image Description</p> */}
              </div>
              </a>
              
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item__image">
              <a href="https://www.chiangmai-hospital.com/en/knowledges/six-symptoms-associated-with-office-syndrome">
                <img src={home2} alt="carousel item" />
                <div className="carousel-item__overlay">
                  <h4>Office Synfrom Symptoms</h4>
                  {/* <p>Image Description</p> */}
              </div>
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item__image">
              <a href="https://www.lazboythailand.com/inspiration/48/good-ways-of-resting-to-prevent-office-syndrome">
                <img src={home3} alt="carousel item" />
                  <h4>How to Prevent Office Syndrome</h4>
                  {/* <p>Image Description</p> */}
              </a>
              <div className="carousel-item__overlay">
              </div>
            </div>
          </div>
        </Slider>
      </section>
      <QuestionBodypart />
    </body>
  );
}

export default Home;
