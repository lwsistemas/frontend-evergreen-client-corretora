import { useTranslation } from "react-i18next";
import TitleSecondary from "../../../../components/text/titleSecondary";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../../css/home/marketPrices.css";

export const MarketPrices = (prices) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const determineDecimalScale = (price) => {
    const decimalPart = price.toString().split(".")[1];
    if (decimalPart) {
      const significantDecimals = decimalPart.match(/^(0*)[1-9]/);
      if (significantDecimals) {
        const zeros = significantDecimals[1].length;
        const totalLength = zeros + significantDecimals[0].length;
        return totalLength > 4 ? totalLength : Math.min(decimalPart.length, 4);
      }
      return Math.min(decimalPart.length, 4);
    }
    return 0;
  };

  const priorityCoins = ["BTC", "ETH", "LTC", "BNB", "XRP"];

  const filteredPrices = prices.prices
    ?.filter((element) => element.isIndex === 1)
    ?.sort((a, b) => {
      const aPriority = priorityCoins.indexOf(a.coinSimbolo.toUpperCase());
      const bPriority = priorityCoins.indexOf(b.coinSimbolo.toUpperCase());
      if (aPriority === -1 && bPriority === -1) return 0;
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;
      return aPriority - bPriority;
    }) || [];

  const totalPages = Math.ceil(filteredPrices.length / itemsPerPage);
  const paginatedPrices = filteredPrices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isLoading = !prices.prices || prices.prices.length === 0;

  return (
    <div className="market-section fade-in" id="price">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-4">
            <TitleSecondary>{t("Application_Market")}</TitleSecondary>
          </div>
          <div className="market-table shadow-box">
            <div className="market-table-header">
              <span>{t("Pairs")}</span>
              <span>{t("Last Price")}</span>
              <span>{t("Change 24h")}</span>
              <span>{t("Action")}</span>
            </div>

            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <div className="market-row transition-row" key={`skeleton-${i}`}>
                    <div className="market-pair">
                      <Skeleton circle width={28} height={28} baseColor="#2c2c2c" className="skeleton-wave" />
                      <Skeleton width={60} baseColor="#2c2c2c" className="skeleton-wave" />
                    </div>
                    <div className="market-price">
                      <Skeleton width={80} baseColor="#2c2c2c" className="skeleton-wave"/>
                    </div>
                    <div className="market-change">
                      <Skeleton width={50} baseColor="#2c2c2c" className="skeleton-wave"/>
                    </div>
                    <div className="market-action">
                      <Skeleton width={60} height={30} baseColor="#2c2c2c" className="skeleton-wave"/>
                    </div>
                  </div>
                ))
              : paginatedPrices.map((coin, index) =>
                  coin.coin && coin.price && (
                    <div className="market-row transition-row" key={index}>
                      <div className="market-pair">
                        <img src={coin.img} alt={coin.coinSimbolo} />
                        <span>{coin.coinSimbolo}/USD</span>
                      </div>
                      <div className="market-price">
                        USD{" "}
                        <CurrencyFormat
                          value={coin.price}
                          decimalScale={determineDecimalScale(coin.price)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </div>
                      <div className={`market-change ${coin.daily_volume < 0 ? "negative" : "positive"}`}>
                        {coin.daily_percent_change}%
                      </div>
                      <div className="market-action">
                        <button className="trade-button hover-scale">{t("Trade")}</button>
                      </div>
                    </div>
                  )
                )}

            {!isLoading && totalPages > 1 && (
              <div className="market-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
