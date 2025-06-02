import Title from "../../components/text/title";
import Header from "./home/HeaderIndex.jsx";
import Footer1 from "../layout/footer1";
import Hero from "./home/components/hero_quemsomos.jsx";
import { useTranslation } from "react-i18next";
import { Loader } from "./home/components/loader";
import { Link } from 'react-router-dom';
import imgPortfolio from '../../images/empresarios-que-trabalham-com-ipad-de-alto-angulo.jpg'
import imgPortfolio2 from '../../images/executivos-apertando-as-maos-terminando-a-reuniao.jpg'
import imgjpMorgan from '../../images/jp_morgan.jpg'
import Card from 'react-bootstrap/Card';

function OurHistory() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Hero />
      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="portfolio_img">
                <img src={imgPortfolio} alt="" className="img-fluid img-wrap" />
              </div>
            </div>

            <div className="col-md-7">
              <div className="text-justify">
                <h4>{t("Application_QuemSomos_01")}</h4>
                <h4>{t("Application_QuemSomos_02")}</h4>
              </div>
            </div>

            <div className="col-md-7 text-justify p-3">
              <p>{t("Application_QuemSomos_03")}</p>
              {/* <p>{t("Application_QuemSomos_04")}</p> */}

            </div>

            <div className="col-md-5">
              <div className="portfolio_img">
                <img src={imgjpMorgan} alt="" className="img-fluid" />
              </div>
            </div>

            <div className="col-md-5 mb-3">
              <div className="portfolio_img">
                <img src={imgPortfolio2} alt="" className="img-fluid" />
              </div>
            </div>

            <div className="col-md-7 text-justify mb-3">
              <p>{t("Application_QuemSomos_05")}</p>
              <p>{t("Application_QuemSomos_06")}</p>
            </div>

            {/* <div className="col-md-12 text-justify">
              <p>{t("Application_QuemSomos_07")}</p>
              <p>{t("Application_QuemSomos_08")}</p>
            </div> */}


          </div>


          <div className="row">

            <div className="col-md-12">
              <Card
                bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Missão da Elite Capital: Liderar a Transformação Financeira Global</Card.Title>
                  <Card.Text>
                    {/* {t("Application_textMissao")} */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card
                bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Visão da Elite Capital: Reimaginando e Moldando o Futuro Financeiro</Card.Title>
                  <Card.Text>
                    {/* {t("Application_textVisao")} */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card
                bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Valores da Elite Capital: Nossa Base para a Excelência Financeira</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>1. {t("Application_textValores1")}</li>
                      <li>2. {t("Application_textValores2")}</li>
                      <li>3. {t("Application_textValores3")}</li>
                      <li>4. {t("Application_textValores4")}</li>
                      <li>5. {t("Application_textValores5")}</li>
                      <li>6. {t("Application_textValores6")}</li>
                      <li>7. {t("Application_textValores7")}</li>


                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>





          </div>



        </div>
      </div>
      <Footer1 />
    </>
  );
}

export default OurHistory;