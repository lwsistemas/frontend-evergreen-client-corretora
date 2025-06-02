import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../../../../images/home/hero/slide1.png";
import slide2 from "../../../../images/home/hero/slide2.png";
import slide3 from "../../../../images/home/hero/slide3.png";
import Title from "../../../../components/text/title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../../../components/button/primary";
import ButtonSecondary from "../../../../components/button/secondary";
import { useMediaQuery } from "@material-ui/core";
import imageHero from "../../../../images/home/hero/hero.png";
import "../../../../css/home/slider.css";

const Hero = () => {
  const isSmallerThan992 = useMediaQuery("(min-width: 992px)");
  const { t } = useTranslation();

  return (
    <div className="hero-section">
      <Carousel className="slider-background" controls={false} indicators={false} interval={5000} fade>
        <Carousel.Item>
          <div
            className="slider-image-container"
            style={{ backgroundImage: `url(${slide1})` }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="slider-image-container"
            style={{ backgroundImage: `url(${slide2})` }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="slider-image-container"
            style={{ backgroundImage: `url(${slide3})` }}
          />
        </Carousel.Item>
      </Carousel>

      <div className="container">
        <div className="row justify-content-between align-items-top">
          <div className="col-xl-12 col-lg-12 col-12">
            <div className="intro-content mb-4">
              <Title>
                <span className="gradient-title">EVER GREEN BROKER</span>, {t("Application_Text1")} {t("Application_Text2")}
              </Title>
              <p className="mt-4 text-description">{t("Application_ConteComEquipe")}</p>
            </div>
            <div className="d-flex" style={{ gap: "16px" }}>
              <Link to="/signin">
                <ButtonPrimary>{t("Sign in")}</ButtonPrimary>
              </Link>
              <Link to="/signup/createuser">
                <ButtonSecondary>{t("Create_Account")}</ButtonSecondary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
