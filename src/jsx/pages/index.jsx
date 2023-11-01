import React, { useEffect, useState } from "react";
import Header from "./home/HeaderMenu.jsx";
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

function Homepage() {
  
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(async () => {
    if (isPrimeiraVez) {
      await getPrices();
      setIsPrimeiraVez(false);
    }

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
          <CTA />
          {/*<NoticiasHome/>*/} 
          <Footer1 />
        </>
      )}
    </>
  );
}

export default Homepage;
