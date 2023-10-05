import React from "react";
import bg from "../../../../images/home/hero/slide3.png";
import ButtonPrimary from "../../../../components/button/primary";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TitleSecondary from "../../../../components/text/titleSecondary";
import "../../../../css/home/coin.css";
import imgCryptos from "../../../../images/home/CTA/cryptos.png";
import { useMediaQuery } from "@material-ui/core";
const CTA = () => {
  const { t } = useTranslation();
  const isSmallerThan992 = useMediaQuery("(min-width: 992px)");

  return (
    <div className="trade-app section-padding">
      <div className="container">
        <div
          className="d-flex align-items-start position-relative"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "auto",
            borderRadius: "4px",
            padding: isSmallerThan992 ? "60px 48px" : "48px 16px",
            justifyContent: "space-between",
            marginBottom: "80px",
            marginBottom: "40px",
          }}
        >
          <div className="text-white">
            <TitleSecondary>{t("Join_Platform")}</TitleSecondary>
            <p>{t("Create your account and start investing")}</p>
            <Link>
              <Link to={"signup/createuser"}>
                <ButtonPrimary>{t("Create_Account")}</ButtonPrimary>
              </Link>
            </Link>
          </div>
          <img
            className="cryptos"
            src={imgCryptos}
            style={
              isSmallerThan992 ? { display: "block" } : { display: "none" }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;
