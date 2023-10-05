import React from "react";
import image1 from "../../images/foote1.png";
import image2 from "../../images/footer2.png";
import Logo from "../../images/brand/logoHeader.png";
import { Link } from "react-router-dom";
import "../../css/home/footer.css";
import { useTranslation } from "react-i18next";
import fcaLogo from "../../images/fca-logo-500.png"
import ussSecurity from "../../images/Seal_of_the_United_States_Securities_and_Exchange_Commission.svg.png"
import logoIADI from "../../images/iadi-logo.png"
import logobtc from "../../images/btc.png"
import logousdt from "../../images/usdt.png"
import logoboleto from "../../images/boleto.png"
import logopix from "../../images/pix.png"
function Footer1() {
  const { t } = useTranslation();

  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="header-footer d-flex justify-content-between align-items-top mt-5">
            <a href={"/"}>
              <img src={Logo} alt="logo" style={{ height: "62px" }} />
            </a>
            <div className="text-right">
              <p>Heron Tower, 110 Bishopsgate, London EC2N 4AY, Reino Unido</p>
              <p>{t("Monday to Friday from 09h to 18h")}</p>
              <div className="footer-social">
                <ul className="text-right">
                  <li>
                    <a href={"#"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={"#"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={"#"}>
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href={"#"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="nav-footer d-flex mt-5" style={{ gap: "40px" }}>
            <div className="d-flex flex-column align-items-start">
              <p className="text-bold text-white" style={{ fontSize: "18px" }}>
                {t("Useful links")}
              </p>
              <div className="d-flex flex-column align-items-start">
                <Link to="./policyandprivacy">{t("Privacy Policy")}</Link>
                <Link to="./termsofuse">{t("Terms of use")}</Link>
              </div>
            </div>
            <div className="d-flex flex-column align-items-start">
              <p className="text-bold text-white" style={{ fontSize: "18px" }}>
                {t("Application_Mercados")}
              </p>
              <div className="d-flex flex-column align-items-start">
                <Link to="./actives">{t("Active")}</Link>
                <Link to="./historic">{t("Historic")}</Link>
              </div>
            </div>
            <div className="d-flex flex-column align-items-start">
              <p className="text-bold text-white" style={{ fontSize: "18px" }}>
                {t("Application_QuemSomos")}
              </p>
              <div className="d-flex flex-column align-items-start">
                <Link to="./ourhistory">{t("Our story")}</Link>
                <Link to="./howworks">{t("How it works")}</Link>
              </div>
            </div>
            <div className="d-flex flex-column align-items-start">
              <p className="text-bold text-white" style={{ fontSize: "18px" }}>
                {t("Contact")}
              </p>
              
                <p>{t("Application_Support")}: +44 7311-574899</p>
                <p>support@infinitycapital.global</p>
              
              

              
            </div>
          </div>

          <div
            className="footer-sticks d-flex mt-5 align-items-center"
            style={{ gap: "12px", justifyContent: "end" }}
          >
            <img src={image2} style={{ height: "30px" }} />
            <img src={image1} style={{ height: "30px" }} />
          </div>
          <div className="mt-3">
            <p className="text-center">{t("Description_Infinity_Capital")}</p>
          </div>
          <p className="text-center mt-3 mb-0">
            © Copyright 2015 - 2023 Infinity Capital Global
          </p>
          <div className="footer-sticks mt-5"
            style={{ gap: "35px" }}>
            <div className="row">
              <div className="col-md-7 align-items-center mb-5 mt-3">
                <img src={fcaLogo} style={{ color: "white", height: "85px", marginRight: "15px", float: "left" }} />
                <img src={ussSecurity} style={{ color: "white", height: "85px", marginRight: "15px", float: "left" }} />
                <img src={logoIADI} style={{ color: "white", height: "85px", float: "left" }} />
              </div>
              <div className="text-justify col-md-5 text-sm-start text-bg-dark">
                {t("application_textrodape")}
              </div>
            </div>
          </div>
          <div className="footer-sticks mt-5"
            style={{ gap: "35px" }}>
            <div className="row">
              <div className="col-md-12 d-flex align-items-center mb-5 mt-3">
                <div className="col-md-2 d-flex align-items-center mb-5 mt-3">
                <p>Meios de pagamentos</p>

                </div>
                <div className="col-md-10 d-flex align-items-center mb-5 mt-3">
                <img src={logobtc} style={{ color: "white", height: "35px", marginRight: "5px" }} />
                <img src={logousdt} style={{ color: "white", height: "35px", marginRight: "5px"}} />
                <img src={logopix} style={{ color: "white", height: "35px", marginRight: "5px"}} />
                <img src={logoboleto} style={{ color: "white", height: "35px", marginRight: "5px" }} />
                </div>
              </div>
              
            </div>
          </div>

        </div>



      </div>
    </>
  );
}

export default Footer1;
