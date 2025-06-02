import React, { useEffect, useState } from "react";
import Header from "./home/HeaderIndex.jsx";
import Footer1 from "../layout/footer1";
import axios from "../../services/index";
import Hero from "./home/components/hero";
import CTA from "../pages/home/components/cta";
import iconDown from "../../images/home/prices/down.png";
import iconUp from "../../images/home/prices/up.png";
import { Loader } from "./home/components/loader";
import { MarketPrices } from "./home/components/market-prices";
import { About } from "./home/components/about";
import NoticiasHome from '../pages/home/components/NoticiasHome'
import FAQ from "./home/components/faq-home.jsx";

function Homepage() {

  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrimeiraVez, setIsPrimeiraVez] = useState(true);

  const getPrices = async () => {
    try {
      const prices = (await axios.get(`/price`)).data;
      setPrices(prices.reverse());
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getPrices();
    }, 2000); // A cada 5 segundos

    return () => {
      clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Hero />
          <MarketPrices prices={prices} />
          <About />
          <FAQ />
          <CTA />
          {/* <NoticiasHome/> */}
          <Footer1 />
        </>
      )}
    </>
  );
}

export default Homepage;
