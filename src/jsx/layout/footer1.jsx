import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../images/brand/logoHeader.png";
import fcaLogo from "../../images/fca-logo-500.png";
import logofsc from "../../images/fscs-2.png";
import logobtc from "../../images/btc.png";
import logousdt from "../../images/usdt.png";
import logopix from "../../images/pix.png";
import logoboleto from "../../images/boleto.png";
import "../../css/home/footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        {/* Topo */}
        <div className="header-footer">
          <div className="footer-brand">
            <img src={Logo} alt="Ever Green Capital Logo" />
            <p className="footer-address">
              Chester House 2nd Floor, Office 220, 81-83 Fulham High Street, London, England, SW6 3JA
            </p>
          </div>
          <div className="footer-social">
            <ul>
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
              <li><a href="#"><i className="fa fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>

        {/* Links úteis */}
        <div className="nav-footer">
          <div>
            <p>{t("Useful links")}</p>
            <Link to="/policyandprivacy">{t("Privacy Policy")}</Link>
            <Link to="/termsofuse">{t("Terms of use")}</Link>
          </div>
          <div>
            <p>{t("Application_Mercados")}</p>
            <Link to="/actives">{t("Active")}</Link>
            <Link to="/historic">{t("Historic")}</Link>
          </div>
          <div>
            <p>{t("Application_QuemSomos")}</p>
            <Link to="/ourhistory">{t("Our story")}</Link>
            <Link to="/howworks">{t("How it works")}</Link>
          </div>
          <div>
            <p>{t("Contact")}</p>
            <p>+44 7311-574899</p>
            <p>support@evergreenbroker.co.uk</p>
          </div>
        </div>

        {/* Selos regulatórios */}
        <div className="footer-sticks">
          <img src={fcaLogo} alt="Registro FCA" />
          <img src={logofsc} alt="Selo FSCS" />
        </div>

        {/* Descrição */}
        <div className="footer-bottom">
          <p>{t("application_textrodape")}</p>
          <p>
            <a
              href="https://register.fca.org.uk/s/firm?id=0010X00004H63b5QAB"
              target="_blank"
              rel="noopener noreferrer"
            >
              Registro FCA: 10347767
            </a>
          </p>
        </div>

        {/* Meios de pagamento */}
        <div className="footer-payments">
          <h5>{t("Meios de pagamentos")}</h5>
          <div className="payment-icons">
            <img src={logobtc} alt="Bitcoin" />
            <img src={logousdt} alt="Tether USDT" />
            <img src={logopix} alt="PIX" />
            <img src={logoboleto} alt="Boleto Bancário" />
          </div>
        </div>

        {/* Direitos autorais */}
        <p className="footer-credit">
          © 2016 - 2023 EVER GREEN BROKER | Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
