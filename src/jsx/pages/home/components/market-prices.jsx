import { useTranslation } from "react-i18next";
import TitleSecondary from "../../../../components/text/titleSecondary";
import CurrencyFormat from "react-currency-format";

export const MarketPrices = (prices) => {
  const { t } = useTranslation();
  return (
    <div
      className={"price-grid"}
      id="price"
      style={{ padding: "70px 0px 0px 0px" }}
    >
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-md-12 mb-3"}>
            <TitleSecondary>{t("Application_Market")}</TitleSecondary>
          </div>
          {prices.prices
            .filter((element) => element.isIndex == 1)
            .map((coin) => {
              if (coin.coin != null && coin.price != null) {
                return (
                  <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-6"}>
                    <div
                      className={"card"}
                      style={{
                        backgroundColor: "#1D1D1D",
                      }}
                    >
                      <div
                        className={"card-header"}
                        style={{
                          backgroundColor: "#1D1D1D",
                          display: "flex",
                        }}
                      >
                        <div className={"d-flex align-items-center"}>
                          <span>
                            <img
                              src={coin.img}
                              style={{
                                width: "25px",
                                height: "25px",
                                margin: "10px",
                              }}
                            />
                          </span>
                          <div
                            className={"flex-grow-2"}
                            style={{
                              marginLeft: "5px",
                              fontSize: "20px",
                              width: "150px",
                            }}
                          >
                            {coin.coinSimbolo}/USD
                          </div>
                        </div>
                        <p
                          className="mb-0"
                        
                        >
                          24h
                        </p>
                       
                      </div>
                      <div
                        className={"card-body"}
                        style={{
                          backgroundColor: "#1D1D1D",
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <h3>
                          USD{" "}
                          <CurrencyFormat
                            value={coin.price}
                            decimalScale={1}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </h3>
                        <span
                          className={"text-success"}
                          style={{
                            color:
                              coin.daily_volume > 0
                                ? "#10d876"
                                : "#E50202",
                          }}
                        >
                          {coin.daily_volume} vol
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  )
}