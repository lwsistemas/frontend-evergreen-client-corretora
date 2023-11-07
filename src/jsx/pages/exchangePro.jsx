//================material=============
import React, { useEffect, useState, componentDidMount, render } from "react";
import { Link } from "react-router-dom";
// import { Tab, Nav, Tabs } from 'react-bootstrap';
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CurrencyFormat from "react-currency-format";
import Moment from "react-moment";
import styled from "styled-components";
import { Card, Button, Form, Row, Nav } from "react-bootstrap";

//import Box from '@mui/material/Box';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  useGmailTabsStyles,
  useGmailTabItemStyles,
} from "@mui-treasury/styles/tabs";
//===================imports===============
import bitcoinIcon from "../../images/profile/btc.png";
import ethIcon from "../../images/profile/eth.png";
import usdIcon from "../../images/profile/usdt.png";
import ltcIcon from "../../images/profile/ltc.png";
import brlIcon from "../../images/profile/brl.png";
import idsuexIcon from "../../images/profile/idx.png";
import CurrencyInput from "react-currency-input-field";
import globalConfig from "../jsonConfig/globalConfig.json";
import Charts from "../element/dashboard/Charts";
import { User } from "../store/User/User.action";
import OrderModal from "../element/Ordermodal";
import axios from "../../services/index";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from "../layout/sidebar/sidebar";
import animated from "../../images/animated-gif.gif";
import HistoryTable from "../element/dashboard/historyTable";
import DataGridDashboard from "../element/dashboard/DataGrid";
//===================css================
import "../../css/dashboard/select.css";
import BottomBar from "../layout/sidebar/bottom-bar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
//===================function================

const InputBRL = styled.input`
  background-color: #485579 !important;
  z-index: 1 !important;
  margin-top: 15px !important;
  &::-webkit-slider-thumb {
    position: relative;
    border: 0 !important;
    height: 25px !important;
    width: 25px !important;
    appearance: none;
    background: url(${brlIcon}) !important;
    background-size: cover !important;
    transition: background-color 150ms;
  }
`;

const InputIDX = styled.input`
  background-color: #485579 !important;
  margin-top: 15px !important;
  z-index: 1 !important;

  &::-webkit-slider-thumb {
    position: relative;
    border: 0 !important;
    height: 25px !important;
    width: 25px !important;
    appearance: none;
    background: url(${(props) => props.icon}) !important;
    background-size: cover !important;
  }
`;

function InputFinal(props) {
  let component = (
    <InputIDX
      icon={props.icon}
      className="slider"
      type="range"
      min={0.0}
      step="0.0000001"
      max={props.balance}
      value={props.quantity}
      onChange={(e) => {
        // console.log(props.balance)
        props.setQuantity(e.target.value);
        props.setQuantitySec((e.target.value * props.value).toFixed(2));
      }}
    />
  );
  return component;
}

function Dashboard() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  // const globalConfig.tokenCoins = []
  // globalConfig.tokenCoins[0] = 'BRL'
  // globalConfig.tokenCoins[1] = 'BTC'
  // globalConfig.tokenCoins[2] = 'LTC'
  // globalConfig.tokenCoins[825] = 'USDT'
  // globalConfig.tokenCoins[1027] = 'ETH'
  // globalConfig.tokenCoins[12345] = 'IDX'

  const [value, setValue] = useState();
  const [variation, setVaraiation] = useState();
  const [marketcap, setMarketCap] = useState();
  const [hourVariation, setHourVariation] = useState();
  const [thourVariation, setTHourVariation] = useState();
  const [balance, setBalance] = useState();
  const [lastModify, setLastModify] = useState();
  const [quantity, setQuantity] = useState(0);
  const [quantitySec, setQuantitySec] = useState(0);
  const [history, setHistory] = useState([]);
  const [currentHistory, setCurrentHistory] = useState([]);
  const [balanceBRL, setBalanceBRL] = useState(0);
  const [balanceUSD, setBalanceUSD] = useState(0);
  const [lastModifyBRL, setLastModifyBRL] = useState();
  const [show, setShow] = useState(false);
  const [operationProps] = useState({});
  const [currentIcon, setCurrentIcon] = useState(bitcoinIcon);
  const [activeTabClassName, setActivTabClassName] = useState("");
  const [onBinance, setOnBinance] = useState("block");
  const [offBinance, setOffBinance] = useState("none");
  const [dataUprice, setDataUprice] = useState([]);

  const dispatch = useDispatch();

  //----const------/
  const indicatorColors = ["#fff", "#fff"];
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabsStyles = useGmailTabsStyles({
    indicatorColors,
    position: "none !important",
  });
  const tabItem1Styles = useGmailTabItemStyles({ color: indicatorColors[0] });
  const tabItem2Styles = useGmailTabItemStyles({ color: indicatorColors[0] });
  const stilo = {
    position: "absolute",
    zIndex: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 150,
    width: "35%",
    left: 0,
    right: 0,
    color: "white",
  };
  //-----useState ----//
  const [currencyTrade, setCurrencyTrade] = useState("BTCUSDT");
  const [currency, setCurrency] = useState(1);
  const [secondary, setsecondary] = useState(0);
  const [currencyCoinTrade, setCurrencyCoinTrade] = useState("");
  const [currencyAtual, setCurrencyAtual] = useState(1);
  const [secondaryCoin, setSecondaryCoin] = useState(0);

  const [variantDay, setVarianteDay] = useState(0);
  let [coinPrices, setCoinPrices] = useState([]);
  const [newValue, setnewValue] = React.useState(0);
  const [ptcBar, setPtcBar] = useState(0);

  const [currencyBuyBR, setCurrencyBuyBR] = useState(0);
  const [currencyBuy, setCurrencyBuy] = useState(0);
  const [finalValueBuy, setfinalValueBuy] = useState(0);
  const [currencySellBR, setCurrencySellBR] = useState(0);
  const [currencySell, setCurrencySell] = useState(0);
  const [finalValueSell, setfinalValueSell] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [var24h, setVar24h] = useState(0);
  const [code, setCode] = useState("BTC");

  const [disabledInput, setDisabledInput] = useState(false);
  const [isLoad, setIsLoad] = useState("none");
  const [maxSellbar, setMaxSellbar] = useState(0);
  const [walletPricesList, setWalletPricesList] = useState([]);
  const [firstAccess, setFirstAccess] = useState(true);
  //---------------------API------------

  const getWalletPrices = async () => {
    try {
      const listPrices = (await axios.get(`wallet/?uid=${user.id}`)).data;
      // console.log(listPrices[0])
      // const filterPrice = listPrices.filter(item=> item.type === id)
      // console.log(listPrices)
      setWalletPricesList(listPrices);
    } catch (err) {
      return err.message;
    }
  };

  function formatNumberWithTwoDecimalPlaces(numberString) {
    let number = parseFloat(numberString);
    let magnitude = Math.pow(10, Math.floor(Math.log10(number)) + 1);

    if (magnitude > 1) {
      return number.toFixed(2);
    } else {
      let decimalPlaces = Math.max(2, Math.abs(Math.floor(Math.log10(number))));
      return number.toFixed(decimalPlaces);
    }
  }

  const getPrices2 = async (id) => {
    try {
      const prices = (await axios.get(`/price/prices`)).data;
      const currentPrice = await prices.filter((e) => {
        if (e) {
          if (e.coin == id) {
            setBuyPrice(formatNumberWithTwoDecimalPlaces(e.ask));
            setSellPrice(formatNumberWithTwoDecimalPlaces(e.bid));
            setVar24h(e.pctChange);
            setCoinPrices(prices);
            // coinPrices = prices
          }
          // console.log(prices)
          return;
        }
      });
      // console.log("coinPrices")
      // console.log(coinPrices)
      // console.log(coinPrices.filter(item => item.coin === currency)[0].code)
      // setCoinPrices(prices);

      // const currentPrice = prices.filter(e => {
      //     return e.coin === currency
      // })
      // setValue(currentPrice[0].price)
      // setVaraiation(currentPrice[0].daily_volume)
      // setMarketCap(currentPrice[0].market_cap)
      // setHourVariation(currentPrice[0].percent_change)
      // setTHourVariation(currentPrice[0].daily_percent_change)
      return prices;
    } catch (err) {
      return err.message;
    }
  };
  //-----------------funtions----------
  const barchangeBuy = async (event, newValue) => {
    if (typeof newValue === "number") {
      setCurrencyBuyBR(formatNumberWithTwoDecimalPlaces(newValue));
      setCurrencyBuy(
        formatNumberWithTwoDecimalPlaces(newValue / buyPrice)
      );
      setfinalValueBuy(
        formatNumberWithTwoDecimalPlaces(newValue / buyPrice)
      );
    }
  };
  const barchangeSell = async (event, newValue) => {
    if (typeof newValue === "number") {
      setCurrencySell(newValue.toString().replace(",", "."));
      setCurrencySellBR(
        (newValue.toString().replace(",", ".") * sellPrice).toFixed(2)
      );
      setfinalValueSell(
        (newValue.toString().replace(",", ".") * 100).toFixed(2)
      );
    }
  };

  const setActive = async (token) => {
    var elemento = await document.getElementById(token);
    // elemento.className = "card-select"
    //var header = document.getElementById("navClass");
    var current = document.getElementsByClassName("card-select");
    if (elemento) {
      for (let i = 0; i < current.length; i++) {
        if (current[i].id != "") {
          current[i].className = "card-not-select";
        }
      }
      elemento.className = "card-select";
    }
  };
  const setAwaith = async (value) => {
    if (value) {
      setDisabledInput(true);
      setIsLoad("block");
    } else {
      setDisabledInput(false);
      setIsLoad("none");
    }
  };

  const teste = async () => {
    try {
      // let a = {
      //     firstName: "leandro",
      //     secondName: "Leao", IdDocument: 1021212121,
      //     mobile: 8321212122, telephone: "0000000000",
      //     email: "leao@leo.com", login: "leoleao", password: "lawfer0911", nationality: "BRASIL", documentType: "Document", countryCode: 55, mobileCode: 55
      // }
      const balance = (await axios.get(`/price/allprices`)).data;

      console.log(balance.ETH);
    } catch (error) {
      console.log("erro");
    }
  };
  // const setPrices2 = async (coins, id) => {
  //     const currentPrice = await coins.filter(e => {
  //         if (e) {
  //             if (e.coin == id) {
  //                 setBuyPrice(e.ask)
  //                 setSellPrice(e.bid)
  //             }
  //             return
  //         }

  //     })

  //     return currentPrice

  // }

  const handleChange = (event, newValue) => {
    setnewValue(newValue);
  };

  const setAllValues = async (value) => {
    setCurrency(value.coin);
    getPrices2(value.coin);
    setCurrencyBuy(0);
    setCurrencyBuyBR(0);
    setCurrencySell(0);
    setCurrencySellBR(0);
    setfinalValueBuy(0);
    setfinalValueSell(0);
    setCurrencySellBR(0);
    setVar24h(value.pctChange);
    getCurrentHistory(value.coin);

    let coinAux = [];
    coinPrices.map((coin) => {
      if (coin.coin == value.coin) {
        coinAux = coin;
      }
    });


    // checkGraph(coinAux.onBinance);
    // if (coinAux.onBinance) {
    //   setCurrencyTrade(coinAux.name + "USDT");
    // }
    // setIcon(coinAux.icon);

    let newbalance = await getBalances(coinAux.coin);

    if (newbalance.wallet.balance != undefined) {
      setBalance(newbalance.wallet.balance);
    } else {
      setBalance(0);
    }
    // return currentPrice
    // setCurrency(id)
    // setIcon(icon)
    // 4(token + "BRL")

    // let newValue = await getPrices(id)
    // console.log("newvalue", newValue[0].price)
    // setValue(newValue[0].price)

    //await getPrices(currency, secondary, globalConfig.tokenCoins)
  };

  //-----------------Efferct------------
  // useEffect(async () => { setActive('BTC')}, [])

  // useEffect( async ()=>{
  //   const prices = (await axios.get(`/price/prices`)).data;
  //   setCoinPrices(prices);
  //   console.log("coinPrices")
  //   console.log(coinPrices)
  // },[])

  useEffect(async () => {
    console.log(currency)
    let response = await getPrices2(currency);
    // console.log("coin")
    // console.log(coinPrices)
    getWalletPrices();
    if (firstAccess == true) {
      setActive("BTC");
    }
    setFirstAccess(false);

    // console.log(coinPrices.filter(item => item.coin === currency)[0])

  }, []);

  useEffect(() => {
  }, [coinPrices, currentHistory, history, balance, currency]);

  useEffect(async () => {
    setInterval(async () => {
      const prices = (await axios.get(`/price/prices`)).data;
      setCoinPrices(prices);
    }, 3000);
  }, []);

  const getHistory = async () => {
    try {
      const history = await axios.get(`/order/${user.id}`);
      setHistory(history.data.reverse());
      return history;
    } catch (err) {
      return err.response;
    }
  };
  const getUprice = async (type) => {
    try {
      const uPrice = await axios.get(`price/uprice/${currency}`);
      setDataUprice(uPrice.data);
      //   console.log(uPrice.data)
    } catch (err) {
      return err.response;
    }
  };
  const getCurrentHistory = async (currency) => {
    try {
      const history = await axios.get(`/order/${user.id}/${currency}`);
      setCurrentHistory(history.data.output);
      return history;
    } catch (err) {
      return err.response;
    }
  };
  const getBalances = async (currency) => {
    try {
      const balance = (
        await axios.put(`/wallet/${currency}`, { authKey: user.authKey })
      ).data;
      setBalance(balance.wallet.balance);
      setBalanceBRL(balance.walletBRL.balance);
      setLastModify(balance.wallet.updatedAt);
      setLastModifyBRL(balance.walletBRL.updatedAt);

      return balance;
    } catch (err) {
      console.log("aqui");
      return err.response;
    }
  };

  const getPrices = async (currency) => {
    try {
      const prices = (await axios.get(`/price`)).data;
      const currentPrice = prices.filter((e) => {
        return e.coin === currency;
      });
      setValue(currentPrice[0].price);
      setVaraiation(currentPrice[0].daily_volume);
      setMarketCap(currentPrice[0].market_cap);
      setHourVariation(currentPrice[0].percent_change);
      setTHourVariation(currentPrice[0].daily_percent_change);

      return currentPrice;
    } catch (err) {
      return err.message;
    }
  };
  const handleBuy = async (e) => {
    setAwaith(true);
    e.preventDefault();
    try {
      const quantBRL = currencyBuyBR.replace(",", ".");
      const criptoQuant = currencyBuy.replace(",", ".");
      if (currencyBuyBR > balanceBRL) {
        operationProps.operationStatus = false;
        operationProps.header = t("Order not placed");
        operationProps.body = t("Insufficient funds");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setAwaith(false);
        return true;
      }
      if (parseFloat(currencyBuy) > 0 && buyPrice > 0) {
        const data = {
          description: `${e.target.value} ${code}`,
          authKey: user.authKey,
          type: `${e.target.value}`,
          coinSimbolo: code,
          status: 1,
          priceMedia: buyPrice,
          finalValue: parseFloat(quantBRL),
          quantity: parseFloat(criptoQuant),
          tax: null,
          dispare: null,
          inputType: secondary,
          outputType: currency,
        };
        console.log(data)

        const order = await axios.post(`/order`, data);
        await getWalletPrices();
        operationProps.operationStatus = true;
        operationProps.header = t("Order placed");
        operationProps.body =
          e.target.value === "buy"
            ? `${t("You bought")} ${currencyBuy} ${code
            }`
            : `${t("You sold")} ${criptoQuant} ${code
            }`;
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setCurrencyBuy(0);
        setCurrencyBuyBR(0);
        setfinalValueBuy(0);
        await getBalances(currency);
        await getHistory();
        setAwaith(false);
        await getCurrentHistory(currency)
        return order;
      } else {
        operationProps.operationStatus = false;
        operationProps.header = t("Order not placed");
        operationProps.body = t("Order value must be greater than 0");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setAwaith(false);
        return true;
      }
    } catch (err) {
      console.log(err);
      operationProps.operationStatus = false;
      operationProps.header = t("Order not placed");
      operationProps.body = t("Insufficient funds");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
      setQuantity(0);
      setQuantitySec(0);
      setAwaith(false);
      return err;
    }
  };
  const handleSell = async (e) => {
    setAwaith(true);
    e.preventDefault();
    try {
      const quantBRL = currencySellBR.replace(",", ".");
      const criptoQuant = currencySell.replace(",", ".");
      if (currencySell > balance) {
        operationProps.operationStatus = false;
        operationProps.header = t("Order not placed");
        operationProps.body = t("Insufficient funds");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setAwaith(false);
        return true;
      }
      console.log(currencySell);
      console.log(parseFloat(criptoQuant));
      console.log(sellPrice);
      if (parseFloat(criptoQuant) > 0 && sellPrice > 0) {
        const data = {
          description: `${e.target.value} ${code}`,
          authKey: user.authKey,
          type: `${e.target.value}`,
          status: 1,
          priceMedia: sellPrice,
          finalValue: parseFloat(quantBRL),
          quantity: parseFloat(criptoQuant),
          tax: null,
          dispare: null,
          inputType: secondary,
          outputType: currency,
        };
        console.log(data);
        const order = await axios.post(`/order`, data);
        await getWalletPrices();
        operationProps.operationStatus = true;
        operationProps.header = t("Order placed");
        operationProps.body =
          e.target.value === "buy"
            ? `${t("You bought")} ${quantity} ${code
            }`
            : `${t("You sold")} ${criptoQuant} ${code
            }`;
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setCurrencySell(0);
        setCurrencySellBR(0);
        setfinalValueSell(0);
        await getBalances(currency);
        await getHistory();
        setAwaith(false);
        await getCurrentHistory(currency)
        return order;
      } else {
        operationProps.operationStatus = false;
        operationProps.header = t("Order not placed");
        operationProps.body = t("Order value must be greater than 0");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setAwaith(false);
        return true;
      }
    } catch (err) {
      console.log(err);
      operationProps.operationStatus = false;
      operationProps.header = t("Order not placed");
      operationProps.body = t("Insufficient funds");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
      setQuantity(0);
      setQuantitySec(0);
      setAwaith(false);
      return err;
    }
  };
  const setIcon = async (icon) => {
    switch (icon) {
      case "ethIcon":
        setCurrentIcon(ethIcon);
        break;
      case "ltcIcon":
        setCurrentIcon(ltcIcon);
        break;
      case "bitcoinIcon":
        setCurrentIcon(bitcoinIcon);
        break;
      case "usdIcon":
        setCurrentIcon(usdIcon);
        break;
      default:
        setCurrentIcon(idsuexIcon);
    }
  };

  const setSymbol = () => {
    if (code === "USD") {
      return code
    } else {
      return code + "USD"
    }
  }
  // const setAllValues = async (token, id, icon, balance, value) => {
  //     console.log(id)
  //     const currentPrice = await coinPrices.filter(e => {
  //         console.log(e)
  //         if (e) {
  //             console.log(e.coin)
  //             if (e.coin == id) {
  //                 setBuyPrice(e.ask)
  //                 setSellPrice(e.bid)
  //             }
  //             return
  //         }

  //     })
  //     console.log(currentPrice)

  //     return currentPrice
  //     setCurrency(id)
  //     setIcon(icon)
  //     4(token + "BRL")
  //     setQuantity(0)
  //     setQuantitySec(0)
  //     let newbalance = await getBalances(id)
  //     setBalance(newbalance.wallet.balance)
  //     let newValue = await getPrices(id)
  //     console.log("newvalue", newValue[0].price)
  //     setValue(newValue[0].price)

  //     //await getPrices(currency, secondary, globalConfig.tokenCoins)

  // }
  const validUser = async () => {
    try {
      const valid = await axios.put("user/validUser", {
        authKey: user.authKey,
      });
      await getHistory();
      await getCurrentHistory(currency);
      await getPrices(currency);
      await getUprice(currency);
      await getBalances(currency);
    } catch (error) {
      if (error.response) {
        if (error.response.status && error.response.status == 406) {
          console.log("invalid user");
          dispatch(User(null));
        } else {
          console.log("Unexpected error");
        }
      } else {
        console.log("Unexpected error 404");
      }
    }
  };

  const checkGraph = async (value) => {
    // console.log("valor:", value);
    if (value) {
      setOffBinance("none");
      setOnBinance("block");
    } else {
      setOnBinance("none");
      setOffBinance("block");
    }
  };
  useEffect(async () => {
    await validUser();
  }, []);

  return (
    <>
      <Header2 balance={balance} balanceBRL={balanceBRL} title="ExchangePro"/>
      <OrderModal show={show} operationProps={operationProps} />
      <Sidebar selectedItem="exchange" />
      <div class="content-body" id="dashboard">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-6 col-xxl-12 col-lg-12 col-xxl-6">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">
                    {code}/
                    {/* {coinPrices.filter(item => item.coin === currency)}/ */}
                    USD
                  </h4>
                  <span>
                    {t("24h Change")}:{" "}
                    <strong
                      style={{
                        color: var24h >= 0 ? "#10d876" : "#E50202",
                      }}
                    >
                      {var24h} %
                    </strong>
                  </span>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-xl col-lg col-md col-sm-auto col-6">
                      <p class="mb-0">{t("Index Price")}</p>
                      <h6>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 6
                        }).format(buyPrice)}{" "}

                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/**
                             * 
                             * <div class="col-xl-3 col-xxl-6 col-lg-6 col-xxl-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">
                                        {
                                            t('Your wallet')
                                        }: {
                                            globalConfig.tokenCoins[secondary]
                                        }</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                    t('Balance')
                                                }</p>
                                            <h6>
                                                {Intl.NumberFormat('pt-br', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(balanceBRL/5.14)}  {globalConfig.tokenCoins[secondary]}
                                            </h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                    t('Last Modify')
                                                }</p>
                                            <h6><Moment format="DD/MM/YY - HH:mm">
                                                {lastModifyBRL}
                                            </Moment></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                             */}
            <div class="col-xl-3 col-xxl-6 col-lg-6 col-xxl-3">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">{t("Application_WalletUSD")}</h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-xl col-lg col-md col-sm-auto col-6">
                      <p class="mb-0">{t("Balance")}</p>
                      <h6>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(balanceBRL)}
                      </h6>
                    </div>
                    <div class="col-xl col-lg col-md col-sm-auto col-6">
                      <p class="mb-0">{t("Last Modify")}</p>
                      <h6>
                        <Moment format="DD/MM/YY - HH:mm">
                          {lastModifyBRL}
                        </Moment>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-xxl-6 col-lg-6 col-xxl-3">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">
                    {t("Your wallet")}: {code}
                  </h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-xl col-lg col-md col-sm-auto col-6">
                      <p class="mb-0">{t("Balance")}</p>
                      <h6>
                        <CurrencyFormat
                          value={balance}
                          decimalScale={6}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        {code}
                      </h6>
                    </div>
                    <div class="col-xl col-lg col-md col-sm-auto col-6">
                      <p class="mb-0">{t("Last Modify")}</p>
                      <h6>
                        <Moment format="DD/MM/YY - HH:mm">{lastModify}</Moment>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-xs-3">
              <div class="card" style={{ background: "transparent" }}>
                <div class="card-header" style={{ marginBottom: "10px" }}>
                  <h4 class="card-title">
                    {" "}
                    {t("Select your token")} -{" "}
                    <Link
                      class="btn btn-primary btn-xxs"
                      to={"./user/mywallet"}
                    >
                      {t("My Wallet")} <i class="fa fa-credit-card"></i>{" "}
                    </Link>{" "}
                  </h4>
                </div>
                <div
                  class="column"
                  style={{
                    display: "flex;",
                    alignItems: " center;",
                    flexWrap: "wrap;",
                    justifyContent: "center;",
                    background: "pink;",
                    width: "100%",
                    height: "400px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  {coinPrices.map((coin) => {
                    if (coin) {
                      let colorpct = {};
                      if (coin.pctChange < 0) {
                        colorpct = {
                          textDecoration: "none",
                          color: "#e50202",
                        };
                      } else {
                        colorpct = {
                          textDecoration: "none",
                          color: "rgb(16 216 118)",
                        };
                      }
                      return (
                        <div
                          class="active"
                          onClick={async () => {
                            setAllValues(coin);
                            setActive(coin.code);
                            setCode(coin.code)
                            // checkGraph(globalConfig.tokenGraf[coin.code])
                          }}
                        >
                          <Card
                            style={{
                              marginRight: "5px",
                              backgroundColor: "rgb(93 120 255) !important;",
                              borderColor: "rgb(93 120 255) !important;",
                              cursor: "pointer",
                            }}
                          >
                            {
                              <Card.Img
                                variant="top"
                                src={coin.img}
                                style={{
                                  width: "32px",
                                  float: "left",
                                  marginRight: "15px",
                                  position: "absolute",
                                  top: "20px",
                                  left: "10px",
                                }}
                              />
                            }
                            <Card.Body
                              class="card-not-select"
                              id={coin.code}
                            >
                              <div
                                class="row"
                                style={{ justifyContent: "space-between" }}
                              >
                                <div>
                                  <div
                                    style={{
                                      margin: "12px 20px 10px",
                                      position: "relative",
                                      left: "15px",
                                    }}
                                  >
                                    <Card.Title>
                                      {coin.code}{" "}
                                      <small>({coin.name})</small>
                                    </Card.Title>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <Card.Text>
                                      {t("Balance")}:{" "}
                                      <strong>
                                        <CurrencyFormat
                                          value={
                                            (walletPricesList.find((item) => item.type === coin.coin)?.balance || 0)
                                          }
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          renderText={(formattedValue) => {
                                            const internationalValue = parseFloat(formattedValue).toLocaleString("pt", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 6,
                                            });
                                            return internationalValue;
                                          }}
                                        />{" "}
                                        {coin.code}
                                      </strong>{" "}
                                    </Card.Text>
                                  </div>
                                </div>
                                <div>
                                  <Card.Text>
                                    <strong>
                                      {Intl.NumberFormat("EN-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 6,
                                      }).format(formatNumberWithTwoDecimalPlaces(coin.ask))}
                                    </strong>
                                  </Card.Text>
                                  <Card.Text>
                                    {" "}
                                    24h{" "}
                                    <strong style={colorpct}>
                                      {coin.pctChange}%
                                    </strong>
                                  </Card.Text>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-md-4 col-xs-5">
              <div
                class="tradingview-widget-container card"
                style={{ height: "460px", display: offBinance }}
              >
                <Charts currency={currency} dataUprice={dataUprice} />
              </div>
              <div
                class="tradingview-widget-container card"
                style={{ height: "460px", display: onBinance }}
              >
                {
                  <TradingViewWidget
                    symbol={setSymbol()}
                    theme={Themes.DARK}
                    locale="pt"
                    autosize
                  />
                }{" "}
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-4">
              <div class="card" style={{ height: "460px" }}>
                <div style={{ display: isLoad }}>
                  <img src={animated} style={stilo}></img>
                </div>
                <Tabs
                  classes={tabsStyles}
                  value={tabIndex}
                  onChange={(e, index) => setTabIndex(index)}
                  TabIndicatorProps={{
                    children: <div className={`MuiIndicator-${tabIndex}`} />,
                  }}
                  position="none !important"
                  style={{
                    position: "relative",
                    borderRadius: "5px",
                    color: " rgba(255, 255, 255);",
                  }}
                  indicatorColor="#fff"
                  variant="fullWidth"
                  disableGeneration
                >
                  <Tab
                    classes={tabItem1Styles}
                    disableTouchRipple
                    style={{
                      textTransform: "uppercase",
                      color: "#fff !important",
                      backgroundColor: "rgb(16, 216, 118)",
                      borderColor: "#10d876",
                    }}
                    label={
                      t("Buy") +
                      " $ " +
                      buyPrice
                    }
                  />
                  <Tab
                    classes={tabItem2Styles}
                    disableTouchRipple
                    style={{
                      textTransform: "uppercase",
                      color: "#fff",
                      backgroundColor: "rgb(229, 2, 2,0.8)",
                      borderColor: "#E50202",
                    }}
                    label={
                      t("Sell") +
                      " $ " +
                      sellPrice
                    }
                  />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
                  <div class="form-group" style={{ marginTop: "20px" }}>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <span class="input-group-text"></span>
                      </div>
                      <CurrencyInput
                        class="form-control text-right"
                        id="input-example"
                        name="input-name"
                        placeholder="0"
                        autocomplete="off"
                        defaultValue={0.0}
                        decimalsLimit={2}
                        value={currencyBuyBR}
                        maxlength="30"
                        disabled={disabledInput}
                        onValueChange={(val, name) => {
                          if (val == undefined) {
                            setCurrencyBuyBR("0");
                            setfinalValueBuy("0");
                            return setCurrencyBuy("0");
                          }
                          setCurrencyBuy(
                            (val.replace(",", ".") / buyPrice).toFixed(7)
                          );
                          setfinalValueBuy(
                            (val.replace(",", ".") / buyPrice).toFixed(7)
                          );
                          return setCurrencyBuyBR(val);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <Slider
                      value={currencyBuyBR}
                      min={0}
                      disabled={disabledInput}
                      max={balanceBRL}
                      onChange={barchangeBuy}
                      valueLabelDisplay="auto"
                      aria-labelledby="non-linear-slider"
                      sx={{
                        width: "100%",
                        color: "#10d876",
                      }}
                    />
                    <div>
                      <p class="mb-0" style={{ textAlign: "right" }}>
                        {t("Balance") + " $ "}
                        <CurrencyFormat
                          value={balanceBRL}
                          decimalScale={2}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="form-group" style={{ marginTop: "20px" }}>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <img
                            src={currentIcon}
                            style={{ width: "25px", height: "25px" }}
                          />
                          <div style={{ marginLeft: "5px" }}>
                            {" "}
                            {code}
                          </div>
                        </span>
                      </div>

                      <CurrencyInput
                        class="form-control text-right"
                        id="input-example"
                        name="input-name"
                        placeholder="0"
                        autocomplete="off"
                        defaultValue={0.0}
                        decimalsLimit={7}
                        value={currencyBuy}
                        maxlength="30"
                        disabled={disabledInput}
                        onValueChange={(val, name) => {
                          if (val == undefined) {
                            setCurrencyBuy("0");
                            return setCurrencyBuyBR("0");
                          }
                          setCurrencyBuyBR(
                            (val.replace(",", ".") * buyPrice).toFixed(2)
                          );
                          console.log(val);
                          setfinalValueBuy(val.replace(",", "."));
                          return setCurrencyBuy(val);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "40px",
                      textAlign: "right",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ maxWidth: "80%", margin: "10px" }}>
                      <h4 class="card-title" style={{ fontSize: "30px" }}>
                        ≅{" "}
                        <CurrencyFormat
                          value={finalValueBuy}
                          decimalScale={7}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </h4>
                    </div>
                    <div
                      style={{
                        maxWidth: "80%",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <img
                        src={currentIcon}
                        alt="Italian Trulli"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "25px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        marginLeft: "5px",
                      }}
                    >
                      {code}
                    </div>
                  </div>
                  <div class="btn-group btn-block mt-1">
                    <button
                      type="submit"
                      name="submit"
                      disabled={disabledInput}
                      style={{ height: "50px", borderRadius: "45px" }}
                      class="btn btn-success"
                      value="buy"
                      onClick={handleBuy}
                    >
                      {t("Buy Now") + " " + code}
                    </button>
                  </div>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <div class="form-group" style={{ marginTop: "20px" }}>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <img
                            src={currentIcon}
                            style={{ width: "25px", height: "25px" }}
                          />
                          <div style={{ marginLeft: "5px" }}>
                            {" "}
                            {code}
                          </div>
                        </span>
                      </div>

                      <CurrencyInput
                        class="form-control text-right"
                        id="input-example"
                        name="input-name"
                        placeholder="0"
                        autocomplete="off"
                        defaultValue={0.0}
                        decimalsLimit={7}
                        value={currencySell}
                        maxlength="30"
                        disabled={disabledInput}
                        onValueChange={(val, name) => {
                          if (val == undefined) {
                            setCurrencySell("0");
                            setfinalValueSell("0");
                            return setCurrencySellBR("0");
                          }
                          setCurrencySellBR(
                            (val.replace(",", ".") * sellPrice).toFixed(2)
                          );
                          setfinalValueSell(
                            (val.replace(",", ".") * sellPrice).toFixed(2)
                          );
                          return setCurrencySell(val);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <Slider
                      value={currencySell}
                      min={0}
                      disabled={disabledInput}
                      step={balance / 100}
                      max={balance}
                      onChange={barchangeSell}
                      valueLabelDisplay="auto"
                      aria-labelledby="non-linear-slider"
                      sx={{
                        width: "100%",
                        color: "#E50202",
                      }}
                    />
                  </div>
                  <div>
                    <div>
                      <p class="mb-0" style={{ textAlign: "right" }}>
                        {t("Balance") +
                          " " +
                          code +
                          " "}{" "}
                        <CurrencyFormat
                          value={balance}
                          decimalScale={7}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="form-group" style={{ marginTop: "20px" }}>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <CurrencyInput
                        class="form-control text-right"
                        id="input-example"
                        name="input-name"
                        placeholder="0"
                        autocomplete="off"
                        defaultValue={0.0}
                        decimalsLimit={2}
                        value={currencySellBR}
                        maxlength="30"
                        disabled={disabledInput}
                        onValueChange={(val, name) => {
                          if (val == undefined) {
                            setCurrencySellBR("0");
                            setfinalValueSell("0");
                            return setCurrencySell("0");
                          }
                          setCurrencySell(
                            (val.replace(",", ".") / sellPrice).toFixed(7)
                          );
                          setfinalValueSell(val.replace(",", "."));
                          return setCurrencySellBR(val);
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "40px",
                      textAlign: "right",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ margin: "10px" }}>
                      <h4 class="card-title" style={{ fontSize: "30px" }}>
                        ≅{" "}
                        <CurrencyFormat
                          value={currencySellBR}
                          decimalScale={2}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </h4>
                    </div>

                    <div
                      style={{
                        fontSize: "25px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        marginLeft: "5px",
                      }}
                    >
                      USD
                    </div>
                  </div>

                  {/* <InputFinal icon={currentIcon} balance={balance} quantitiy={quantity} setQuantity={setQuantity} setQuantitySec={setQuantitySec} value={value} coin={currency} /> */}

                  <div class="btn-group btn-block mt-1">
                    <button
                      type="submit"
                      name="submit"
                      disabled={disabledInput}
                      style={{ height: "50px", borderRadius: "45px" }}
                      class="btn btn-danger"
                      value="sell"
                      onClick={handleSell}
                    >
                      {t("Sell Now") + " " + code}
                    </button>
                  </div>
                </TabPanel>
              </div>
            </div>
            <div class="col-xl-5 col-lg-5 col-md-5 col-xxl-5">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 class="card-title">{t("Trade History")}</h4>
                    </div>
                    <PerfectScrollbar>
                      <div class="card-body trade-history">
                        <HistoryTable thisData={currentHistory} />
                      </div>
                    </PerfectScrollbar>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="col-xl-7 col-lg-7 col-md-7 col-xxl-7">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                {
                                                    t('Order History')
                                                }</h4>
                                        </div>
                                        <div>
                                        <DataGridDashboard history={history}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            {/* <div class="col-xl-4 col-lg-4 col-md-4 col-xxl-4">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                {
                                                    t('Trade History')
                                                }</h4>
                                        </div>
                                        <PerfectScrollbar>
                                            <div class="card-body trade-history">
                                                <div class="table-responsive">
                                                    <table class="table table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">
                                                                    {
                                                                        t('Price')
                                                                    }</th>
                                                                <th scope="col">
                                                                    {
                                                                        t('Size')
                                                                    }</th>
                                                                <th scope="col">
                                                                    {
                                                                        t('Time')
                                                                    }</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                currentHistory.map(order => (
                                                                    <tr>
                                                                        <td><CurrencyFormat value={order.priceMedia} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {globalConfig.tokenCoins[order.inputType]}</td>
                                                                        <td>{order.quantity} {globalConfig.tokenCoins[order.outputType]}</td>
                                                                        <td><Moment format="DD/MM/YY - HH:mm">
                                                                            {order.createdAt}
                                                                        </Moment></td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </PerfectScrollbar>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            <div class="col-xl-7 col-lg-7 col-md-7 col-xxl-7">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 class="card-title">{t("Order History")}</h4>
                    </div>
                    <PerfectScrollbar>
                      <div class="card-body trade-history">
                        <div class="table-responsive">
                          <table class="table table-striped" id="tbUser">
                            <thead>
                              <tr>
                                <th scope="col">{t("ID")}</th>
                                <th scope="col">{t("Size")}</th>
                                <th scope="col">{t("Average price")}</th>
                                <th scope="col">{t("Final Value")}</th>
                                <th scope="col">{t("Description")}</th>
                                <th scope="col">{t("Time")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {history.map((order) => (
                                <tr>
                                  <th scope="row">{order.id}</th>
                                  <td>
                                    {order.quantity}{" "}
                                    {globalConfig.tokenCoins[order.outputType]}
                                  </td>
                                  <td>
                                    <CurrencyFormat
                                      value={order.priceMedia}
                                      decimalScale={2}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                    {" "}
                                    USD
                                    {
                                      // console.log(order)
                                    }
                                  </td>
                                  <td>
                                    <CurrencyFormat
                                      value={order.finalValue}
                                      decimalScale={2}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                    {" "}
                                    USD
                                  </td>
                                  <td>{order.description} </td>
                                  <td>
                                    <Moment format="DD/MM/YY - HH:mm">
                                      {order.createdAt}
                                    </Moment>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar selectedIcon="exchange" />
    </>
  );
}

export default Dashboard;
