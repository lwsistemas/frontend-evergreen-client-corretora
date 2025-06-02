import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import TitleSecondary from "../../../../components/text/titleSecondary";
import "../../../../css/home/about.css";
import aboutImage from "../../../../images/about/1.jpg";

export const About = () => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src={aboutImage}
              alt="Sobre nós"
              className="about-image aos-fade"
            />
          </div>
          <div className="col-lg-6">
            <div className="text-center text-lg-start">
              <TitleSecondary>{t("Application_QuemSomos")}</TitleSecondary>
              <p className="about-description">
                Na EVER GREEN BROKER, nossa missão é revolucionar a forma como
                você interage com o universo financeiro. Oferecemos uma
                plataforma robusta, moderna e segura, conectando você às melhores
                oportunidades de mercado com apenas alguns cliques.
              </p>
            </div>
            <Slider {...settings} className="mt-4">
              <div className="react-slick-card">
                <i className="fa fa-users"></i>
                <h4>{t("Application_agentes")}</h4>
                <p>{t("txt_agentes")}</p>
              </div>
              <div className="react-slick-card">
                <i className="la la-desktop"></i>
                <h4>{t("Application_plataforma")}</h4>
                <p>{t("Application_Txtplataforma")}</p>
              </div>
              <div className="react-slick-card">
                <i className="la la-connectdevelop"></i>
                <h4>API</h4>
                <p>{t("Application_txtApi")}</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
