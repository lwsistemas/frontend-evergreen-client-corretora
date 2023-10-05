import Title from "../../components/text/title";
import Header from "./home/components/header";
import Footer1 from "../layout/footer1";
import Hero from "./home/components/hero_comofunciona.jsx";
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
            
          </div>



        </div>
      </div>
      <Footer1 />
    </>
  );
}

export default OurHistory;