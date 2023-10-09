import { useTranslation } from "react-i18next";
import TitleSecondary from "../../../../components/text/titleSecondary";

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="trade-app section-padding" id="about">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title text-center">
              <TitleSecondary>{t("Application_QuemSomos")}</TitleSecondary>
              <p> {t("Application_TxtQuemSomos")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12">
            <div
              className="card trade-app-content "
              style={{ background: "transparent" }}
            >
              <div
                className="card-body"
                style={{ background: "#1D1D1D", borderRadius: "9px" }}
              >
                <span>
                  <i className="fa fa-users" style={{ color: "#FFC107" }}></i>
                </span>
                <h4 className="card-title">{t("Application_agentes")}</h4>
                <p>{t("txt_agentes")}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12">
            <div
              className="card trade-app-content"
              style={{ background: "transparent" }}
            >
              <div
                className="card-body"
                style={{ background: "#1D1D1D", borderRadius: "4px" }}
              >
                <span>
                  <i className="la la-desktop" style={{ color: "#FFC107" }}></i>
                </span>
                <h4 className="card-title">{t("Application_plataforma")}</h4>
                <p>{t("Application_Txtplataforma")}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12">
            <div
              className="card trade-app-content"
              style={{ background: "transparent" }}
            >
              <div
                className="card-body"
                style={{ background: "#1D1D1D", borderRadius: "4px" }}
              >
                <span>
                  <i
                    className="la la-connectdevelop"
                    style={{ color: "#FFC107" }}
                  ></i>
                </span>
                <h4 className="card-title">API</h4>
                <p>{t("Application_txtApi")} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
