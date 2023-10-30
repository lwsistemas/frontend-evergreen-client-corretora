//================material=============
import React, { useEffect, useState, componentDidMount, render } from "react";
import { Link } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { User } from "../store/User/User.action";
import CurrencyFormat from "react-currency-format";
import CurrencyInput from "react-currency-input-field";
import Moment from "react-moment";
import styled from "styled-components";
import { Card, Button, Form, Row, Nav } from "react-bootstrap";
import TradingViewWidget2 from '../element/dashboard/TradingViewWidget';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Slider from "@mui/material/Slider";
import { useGmailTabsStyles, useGmailTabItemStyles } from "@mui-treasury/styles/tabs";
import bitcoinIcon from "../../images/profile/btc.png";
import brlIcon from "../../images/profile/brl.png";
import Charts from "../element/dashboard/Charts";
import OrderModal from "../element/Ordermodal";
import axios from "../../services/index";
import HeaderExchangePro from "../layout/headerExchangePro";
import Sidebar from "../layout/sidebar/sidebar";
import animated from "../../images/animated-gif.gif";
import HistoryTable from "../element/dashboard/historyTable";
import DataGridDashboard from "../element/dashboard/DataGrid";
import OrderBook from "../element/dashboard/OrderBooks";
import OrderBookAllTraders from "../element/dashboard/OrderBooksAllTraders";
import LogoHeader from "../../images/brand/logoHeader.png";
//===================css================
import "../../css/dashboard/select.css";
import BottomBar from "../layout/sidebar/bottom-bar";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@material-ui/core/styles'

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import globalConfig from "../jsonConfig/globalConfig.json";
import { Loader } from "./home/components/loader";

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#fff',
            },
            secondary: {
                main: '#fff',
            },
        },
    }
)


function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{
                display: value === index ? 'block' : 'none',
                padding: '3px', // Adicione margem para melhor leitura
                background: "#131722"
            }}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

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
    const [currencyTrade, setCurrencyTrade] = useState("BTCUSDT");
    const [currency, setCurrency] = useState(1);
    const [secondary, setsecondary] = useState(0);
    const [currencyCoinTrade, setCurrencyCoinTrade] = useState("");
    const [currencyAtual, setCurrencyAtual] = useState(1);
    const [secondaryCoin, setSecondaryCoin] = useState(0);
    const [variantDay, setVarianteDay] = useState(0);
    const [coinPrices, setCoinPrices] = useState([]);
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
    const [currencyCoinBuy, setCoinBuy] = useState(0);
    const [currencyCoinSell, setCoinSell] = useState(0);
    const [uidCoin, setUidCoin] = useState(1);
    const [idMoeda, setiIdMoeda] = useState(1);
    const [disabledInput, setDisabledInput] = useState(false);
    const [isLoad, setIsLoad] = useState("none");
    const [maxSellbar, setMaxSellbar] = useState(0);
    const [walletPricesList, setWalletPricesList] = useState([]);
    const [firstAccess, setFirstAccess] = useState(true);
    const [filterValue, setFilterValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUi, setIsLoadingUi] = useState(false);
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 480);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const indicatorColors = ["#404854", "#404854"];
    const [tabIndex, setTabIndex] = React.useState(0);
    const tabsStyles = useGmailTabsStyles({ indicatorColors, position: "none !important", });
    const tabItem1Styles = useGmailTabItemStyles({ color: indicatorColors[0] });
    const tabItem2Styles = useGmailTabItemStyles({ color: indicatorColors[0] });
    const stilo = {
        position: "absolute",
        zIndex: 10,
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,

    };

    //---------------------API------------

    const getWalletPrices = async () => {
        try {
            const listPrices = (await axios.get(`wallet/?uid=${user.id}`)).data;
            //            console.log(listPrices)
            // const filterPrice = listPrices.filter(item=> item.type === id)
            // console.log(listPrices)
            setWalletPricesList(listPrices);
        } catch (err) {
            return err.message;
        }
    };

    function formatNumberWithTwoDecimalPlaces(numberString) {
        let number = parseFloat(numberString);

        // Arredonda o número para 2 casas decimais
        return number.toFixed(2);
    }



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
        var current = document.getElementsByClassName("market-item");
        if (elemento) {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id != "") {
                    current[i].className = "market-item";
                }
            }
            elemento.className = "market-item selected";
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
    
    const setAwaithLoader = async (value) => {
        if (value) {
            setDisabledInput(true);
            setIsLoadingUi(true);
        } else {
            setDisabledInput(false);
            setIsLoadingUi(false);
        }
    };


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
        //getSymbol(value.coin)




        let coinAux = [];
        coinPrices.map((coin) => {
            if (coin.coin == value.coin) {
                coinAux = coin;
            }
        });

        let newbalance = await getBalances(coinAux.coin);

        if (newbalance.wallet.balance != undefined) {
            setBalance(newbalance.wallet.balance);
        } else {
            setBalance(0);
        }

    };

    //-----------------Efferct------------
    // useEffect(async () => { setActive('BTC')}, [])

    // useEffect( async ()=>{
    //   const prices = (await axios.get(`/price/prices`)).data;
    //   setCoinPrices(prices);
    //   console.log("coinPrices")
    //   console.log(coinPrices)
    // },[])




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

    const getWalletCoin = async (currency) => {
        try {
            const history = await axios.get(`/price/symbol/${currency}`);
            //console.log(history)
            setCoinBuy(history.data.price)
            //console.log("CODE " + idMoeda)
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
        setAwaithLoader(true);
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
                setAwaithLoader(false);
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
                //console.log(data)

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
                setAwaithLoader(false);
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
                setAwaithLoader(false);
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
            setAwaithLoader(false);
            return err;
        }
    };
    const handleSell = async (e) => {
        setAwaithLoader(true);
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
                setAwaithLoader(false);
                return true;
            }
            console.log("..." + currencySell);
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
                setAwaithLoader(false);
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
                setAwaithLoader(false);
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
            setAwaithLoader(false);
            return err;
        }
    };
    const setIcon = async (props) => {
        setCurrentIcon(props)
    };

    const setSymbol = () => {
        if (code === "USD") {
            return code
        } else {
            return code + "USD"
        }
    }

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

    useEffect(async () => {
        setIsLoading(true)
        await validUser()
        //        console.log("currency " + currency)
        let response = await getPrices2(currency);
        getWalletPrices();
        getWalletCoin(currency)
        if (firstAccess == true) {
            setActive("BTC");
        }
        setFirstAccess(false);


        // console.log(coinPrices.filter(item => item.coin === currency)[0])
        setIsLoading(false)

    }, []);


    const getPrices2 = async (id) => {
        try {
            const prices = (await axios.get(`/price/prices`)).data;
            const currentPrice = prices.find((e) => e.coin === id);

            if (currentPrice) {
                setBuyPrice(formatNumberWithTwoDecimalPlaces(currentPrice.ask));
                setSellPrice(formatNumberWithTwoDecimalPlaces(currentPrice.bid));
                setVar24h(currentPrice.pctChange);
                setCoinPrices(prices);
            }

            return prices;
        } catch (err) {
            return err.message;
        }
    };

    useEffect(() => {
        let interval;

        const fetchPricesPeriodically = async () => {
            interval = setInterval(async () => {
                try {
                    const response = await axios.get(`/price/prices`);
                    const prices = response.data;

                    setCoinPrices(prices);
                    await getPrices2(currency);
                } catch (error) {
                    console.error('Erro ao buscar preços periódicos:', error);
                }
            }, 3000);
        };

        // Chame a função que lida com a busca de preços periódicos
        fetchPricesPeriodically();

        // Lide com a limpeza correta do intervalo quando o componente for desmontado
        return () => {
            clearInterval(interval);
        };
    }, [currency]); // Certifique-se de incluir 'currency' como dependência para atualizar periodicamente com base nela



    return (
        <>
            <HeaderExchangePro balance={balance} balanceBRL={balanceBRL} title="Exchange Pro" />
            <OrderModal show={show} operationProps={operationProps} />

            <div className="content" id="dashboard" style={{ margin: "5px", marginTop: "65px" }}>
                <div className="content">
                    <div className="row">
                        {isLoading ? (
                            // Conteúdo a ser exibido quando isLoading for verdadeira

                            <div className="col-md-12" style={{ marginLeft: "20px" }}>
                                <Stack spacing={1} width="100%">


                                    <div style={{ width: "100%" }}>
                                        <Skeleton variant="text" sx={{ fontSize: '16px', backgroundColor: '#1E2026' }} />
                                    </div>


                                    <Skeleton variant="rectangular" sx={{
                                        backgroundColor: '#1E2026',
                                        minWidth: "1219px",
                                        height: '140px',
                                        "@media (max-width: 767px)": {
                                            display: 'none' // Oculta para dispositivos móveis
                                        }
                                    }} />



                                    <Skeleton variant="rectangular" sx={{
                                        backgroundColor: '#1E2026',
                                        minWidth: "360px",
                                        height: "275px",
                                        "@media (min-width: 768px)": {
                                            display: 'none' // Oculta para desktops
                                        }
                                    }} />

                                    <Skeleton variant="rectangular" sx={{
                                        backgroundColor: '#1E2026',
                                        minWidth: "360px",
                                        height: "205px",
                                        "@media (min-width: 768px)": {
                                            display: 'none' // Oculta para desktops
                                        }
                                    }} />



                                </Stack>
                            </div>

                        ) : (
                            // Conteúdo a ser exibido quando isLoading for falsa
                            <div className="m-2" style={{ width: "98%", paddingLeft: "5px", Right: "30px" }}>
                                {/* Inicial do cabeçaho de saldos e moedas */}
                                <div className="row">
                                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-xxl-4 d-sm-none d-md-block d-none d-sm-block">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">
                                                    {code}/
                                                    USD
                                                </h4>
                                                <small>
                                                    {t("24h")}:{" "}
                                                    <strong style={{
                                                        color: var24h >= 0 ? "#10d876" : "#E50202",
                                                    }}>
                                                        {var24h} %
                                                    </strong>
                                                </small>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl col-lg col-md col-sm-auto col-6">
                                                        <p className="mb-0">{t("Index Price")}</p>
                                                        <h6>
                                                            {Intl.NumberFormat("en-US", {
                                                                style: "currency",
                                                                currency: "USD",
                                                                minimumFractionDigits: 2
                                                            }).format(buyPrice)}{" "}

                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-xxl-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">{t("Application_WalletUSD")}</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl col-lg col-md col-sm-auto col-6">
                                                        <p className="mb-0">{t("Balance")}</p>
                                                        <h6>
                                                            {Intl.NumberFormat("en-US", {
                                                                style: "currency",
                                                                currency: "USD",
                                                            }).format(balanceBRL)}
                                                        </h6>
                                                    </div>
                                                    <div className="col-xl col-lg col-md col-sm-auto col-6">
                                                        <p className="mb-0">{t("Update")}</p>
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
                                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-xxl-4 d-sm-none d-md-block d-none d-sm-block">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">
                                                    {t("Your wallet")}: {code}
                                                </h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl col-lg col-md col-sm-auto col-6">
                                                        <p className="mb-0">{t("Balance")}</p>
                                                        <h6>
                                                            <CurrencyFormat value={balance}
                                                                decimalScale={6}
                                                                displayType={"text"}
                                                                thousandSeparator={true} />{" "}
                                                            {code}
                                                        </h6>
                                                    </div>
                                                    <div className="col-xl col-lg col-md col-sm-auto col-6">
                                                        <p className="mb-0">{t("Update")}</p>
                                                        <h6>
                                                            <Moment format="DD/MM/YY - HH:mm">{lastModify}</Moment>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* fim do cabeçaho de saldos e moedas */}
                            </div>
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-2">

                            {
                                isLoading ? (
                                    <Stack spacing={1} width="100%">
                                        <div style={{ width: "100%" }}>
                                            <Skeleton variant="text" sx={{ fontSize: '16px', backgroundColor: '#1E2026' }} />
                                        </div>
                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "240px",
                                            height: '550px',
                                            "@media (max-width: 767px)": {
                                                display: 'none' // Oculta para dispositivos móveis
                                            }
                                        }} />

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "360px",
                                            height: "275px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "360px",
                                            height: "205px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />
                                    </Stack>

                                ) : (



                                    <div className="card" style={{ background: "transparent" }}>
                                        <div className="card-header" style={{ marginBottom: "1px" }}>
                                            <div className="row">

                                                <div className="">
                                                    <input type="text"
                                                        value={filterValue}
                                                        onChange={(e) => setFilterValue(e.target.value)}
                                                        placeholder="Filtrar moedas"
                                                        className="form-control"
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <PerfectScrollbar>
                                            <div className="column"
                                                style={{
                                                    display: "flex;",
                                                    alignItems: " center;",
                                                    flexWrap: "wrap;",
                                                    justifyContent: "center;",
                                                    height: isMobile ? "220px" : "623px",
                                                    overflowY: "auto",
                                                    overflowX: "hidden",
                                                }}>



                                                {coinPrices
                                                    .filter((coin) => {
                                                        // Verifica se o filtro está em branco ou se o código ou nome da moeda contém o filtro.
                                                        return (
                                                            filterValue === '' ||
                                                            coin.code.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                            coin.name.toLowerCase().includes(filterValue.toLowerCase())
                                                        );
                                                    })
                                                    .map((coin) => {
                                                        // O restante do seu código permanece o mesmo
                                                        // Certifique-se de adaptar essas mudanças ao seu código específico.

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
                                                                <div className="exchange-market-list"
                                                                    onClick={async () => {
                                                                        setAllValues(coin);
                                                                        //console.log("id da coin "  + coin.coin)
                                                                        setActive(coin.code);
                                                                        setCode(coin.code)
                                                                        setIcon(coin.img)
                                                                        setFilterValue("")
                                                                        setiIdMoeda(coin.coin)

                                                                    }}
                                                                >

                                                                    <div className="market-item" id={coin.code}>
                                                                        <div className="favorite-icon">
                                                                            &#9733;
                                                                            <img src={`https://infinitycapital.global/${coin.img}`} alt={coin.name} />
                                                                        </div>
                                                                        <div className="market-info">
                                                                            <div className="market-name"> {coin.code}<small>/USD</small></div>
                                                                            <div className="market-value">
                                                                                <div>
                                                                                    $
                                                                                    {coin.coin === 825 ? (
                                                                                        Intl.NumberFormat("en-US", {
                                                                                            currency: "USD",
                                                                                            minimumFractionDigits: 2,
                                                                                            maximumFractionDigits: 6,
                                                                                        }).format(coin.ask)
                                                                                    ) : (
                                                                                        formatNumberWithTwoDecimalPlaces(coin.ask)
                                                                                    )}
                                                                                </div>
                                                                                <div className="market-change" style={colorpct}>{`${coin.pctChange}% (24h)`}</div>
                                                                            </div>
                                                                            {/* <div className="market-change">{`${coin.pctChange}% (24h)`}</div> */}

                                                                        </div>


                                                                    </div>

                                                                </div>




                                                            );
                                                        }
                                                    })
                                                }
                                            </div>
                                        </PerfectScrollbar>
                                    </div>
                                )
                            }





                        </div>
                        <div className="col-md-6">
                            <div className="col-md-12">


                                {isLoading ? (
                                    <Stack spacing={1} width="100%">

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "240px",
                                            height: '260px',
                                            Top: "35px",
                                            "@media (max-width: 767px)": {
                                                display: 'none' // Oculta para dispositivos móveis
                                            }
                                        }} />
                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "340px",
                                            height: "275px",
                                            marginTop: "25px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />
                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "360px",
                                            height: "205px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />
                                    </Stack>
                                ) : (
                                    <div>
                                        <div className="tradingview-widget-container card" style={{ height: "460px", display: offBinance }}>
                                            <Charts currency={currency} dataUprice={dataUprice} />
                                        </div>
                                        <div className="tradingview-widget-container card" style={{ position: 'relative', height: '460px' }}>
                                            <img
                                                src={LogoHeader}
                                                style={{
                                                    position: 'absolute',
                                                    top: isMobile ? '52.5%' : "20%",
                                                    left: isMobile ? '45.2%' : "2%",
                                                    height: '35px',
                                                    opacity: 0, // Começa com a imagem invisível
                                                    animation: 'fadeLoop 3s linear infinite', // 3 segundos para cada ciclo
                                                    zIndex: 99999,
                                                }}
                                            />

                                            <TradingViewWidget2 symbol={setSymbol()} id='ExchangePro' style={{ position: 'relative' }} />
                                        </div>
                                    </div>
                                )}



                                {/* Inicial Sessao comprar vender */}

                                {isLoading ? (

                                    <Stack spacing={1} width="100%">

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "140px",
                                            height: '160px',
                                            Top: "35px",
                                            "@media (max-width: 767px)": {
                                                display: 'none' // Oculta para dispositivos móveis
                                            }
                                        }} />

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "140px",
                                            height: '160px',
                                            Top: "35px",
                                            "@media (max-width: 767px)": {
                                                display: 'none' // Oculta para dispositivos móveis
                                            }
                                        }} />
                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "340px",
                                            height: "275px",
                                            marginTop: "25px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />

                                    </Stack>

                                ) : (
                                    <div>
                                        <div className="card" style={{ minHeight: "200px" }}>
                                            <div style={{ display: isLoad }}>
                                                <img src={animated} style={stilo}></img>
                                            </div>
                                            <createTheme theme={theme}>
                                                <Paper square elevation={8} style={{ borderRadius: "5px" }}>
                                                    <Tabs
                                                        value={tabIndex}
                                                        onChange={(e, index) => setTabIndex(index)}
                                                        variant="fullWidth"
                                                        style={{ height: "40px", backgroundColor: "#161A1E" }}
                                                        indicatorColor="primary"

                                                    >
                                                        <Tab
                                                            disableTouchRipple
                                                            style={{
                                                                textTransform: "none",
                                                                color: "#20B26C",
                                                                fontSize: "16px",
                                                                height: "29px",
                                                                fontWeight: tabIndex === 0 ? "bold" : "normal",
                                                            }}
                                                            label={
                                                                <div>
                                                                    {t("Buy") + " " + code}
                                                                    <div style={{ fontSize: "11px", marginTop: "-5px" }}>
                                                                        ${parseFloat(buyPrice).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            }

                                                        />
                                                        <Tab
                                                            disableTouchRipple
                                                            style={{
                                                                textTransform: "none",
                                                                color: "#EF454A",
                                                                fontSize: "16px",
                                                                height: "29px",
                                                                fontWeight: tabIndex === 1 ? "bold" : "normal",
                                                            }}
                                                            label={
                                                                <div>
                                                                    {t("Sell") + " " + code}
                                                                    <div style={{ fontSize: "11px", marginTop: "-5px" }}>
                                                                        ${parseFloat(sellPrice).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            }
                                                        />
                                                    </Tabs>

                                                    <TabPanel value={tabIndex} index={0}>
                                                        <div className="row" style={{ padding: "5px" }}>

                                                            <div className="col-md-12">
                                                                <span style={{ color: "#585E69", margin: "3px", fontSize: "14px" }} >Disponível {" "}
                                                                    <CurrencyFormat value={balanceBRL}
                                                                        decimalScale={2}
                                                                        displayType={"text"}
                                                                        thousandSeparator={true} />
                                                                </span>

                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend"><span className="input-group-text text-success">$</span></div>
                                                                    <CurrencyInput className="form-control text-right"
                                                                        id="input-example"
                                                                        name="input-name"
                                                                        placeholder="0"
                                                                        autocomplete="off"
                                                                        defaultValue={0.0}
                                                                        decimalsLimit={2}
                                                                        value={currencyBuyBR}
                                                                        maxlength="30"
                                                                        disabled={disabledInput}
                                                                        style={{color:"green"}}
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
                                                                <div className="mt-2">
                                                                    <Slider value={currencyBuyBR}
                                                                        min={0}
                                                                        disabled={disabledInput}
                                                                        max={balanceBRL}
                                                                        onChange={barchangeBuy}
                                                                        valueLabelDisplay="auto"
                                                                        aria-labelledby="non-linear-slider"
                                                                        sx={{
                                                                            width: "98%",
                                                                            color: "#10d876",
                                                                            marginLeft: "3px",
                                                                            fontSize: "10px",
                                                                            height: "10px;",
                                                                        }} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group" style={{ marginTop: "1px" }}>
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text">
                                                                                <img src={`https://infinitycapital.global/${currentIcon}`}
                                                                                    style={{ width: "25px", height: "25px" }} />
                                                                                <div style={{ marginLeft: "5px", style:"green" }}>
                                                                                    {" "}
                                                                                    {code}
                                                                                </div>
                                                                            </span>
                                                                        </div>


                                                                        <CurrencyInput className="form-control text-right"
                                                                            id="input-example"
                                                                            name="input-name"
                                                                            placeholder="0"
                                                                            autocomplete="off"
                                                                            defaultValue={0.0}
                                                                            decimalsLimit={7}
                                                                            value={currencyBuy}
                                                                            maxlength="30"
                                                                            disabled={disabledInput}
                                                                            style={{color:"green"}}
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
                                                                    <div style={{ maxWidth: "100%", margin: "10px" }} className="row">
                                                                        <div>
                                                                            <h6 className="card-title text-success" style={{ fontSize: "22px" }}>
                                                                                ≅{" "}
                                                                                <CurrencyFormat value={finalValueBuy}
                                                                                    decimalScale={7}
                                                                                    displayType={"text"}
                                                                                    thousandSeparator={true} />
                                                                            </h6>
                                                                        </div>




                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div style={{ marginLeft: "10px" }}>
                                                                <button type="submit"
                                                                    name="submit"
                                                                    disabled={disabledInput}
                                                                    style={{ height: "35px", borderRadius: "5px" }}
                                                                    className="btn btn-outline-success"
                                                                    value="buy"
                                                                    onClick={handleBuy}>
                                                                    {t("Buy Now") + " " + code}

                                                                </button>
                                                                {isLoadingUi ?(
                                                                    <Loader />

                                                                ):(
                                                                    <div></div>

                                                                )};
                                                                
                                                            </div>

                                                        </div>

                                                    </TabPanel>

                                                    <TabPanel value={tabIndex} index={1}>
                                                        <div className="row" style={{ padding: "5px" }}>

                                                            <div className="col-md-12">
                                                                <span style={{ color: "#585E69", margin: "3px", fontSize: "14px" }} >Disponível {" "}
                                                                    <CurrencyFormat value={balance}
                                                                        decimalScale={6}
                                                                        displayType={"text"}
                                                                        thousandSeparator={true} />
                                                                </span>

                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-group" style={{ marginTop: "1px" }}>
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text">
                                                                                <img src={currentIcon}
                                                                                    style={{ width: "25px", height: "25px" }} />
                                                                                <div style={{ marginLeft: "5px", color:"red" }}>
                                                                                    {" "}
                                                                                    {code}
                                                                                </div>
                                                                            </span>
                                                                        </div>

                                                                        <CurrencyInput className="form-control text-right"
                                                                            id="input-example"
                                                                            name="input-name"
                                                                            placeholder="0"
                                                                            autocomplete="off"
                                                                            defaultValue={0.0}
                                                                            decimalsLimit={7}
                                                                            value={currencySell}
                                                                            maxlength="30"
                                                                            disabled={disabledInput}
                                                                            style={{color:"red"}}
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
                                                                <div className="mt-2">
                                                                    <Slider value={currencySell}
                                                                        min={0}
                                                                        disabled={disabledInput}
                                                                        step={balance / 100}
                                                                        max={balance}
                                                                        onChange={barchangeSell}
                                                                        valueLabelDisplay="auto"
                                                                        aria-labelledby="non-linear-slider"
                                                                        sx={{
                                                                            width: "100%",
                                                                            color: "#ff0000",
                                                                        }} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group" style={{ marginTop: "1px" }}>
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text text-danger">$</span>
                                                                        </div>
                                                                        <CurrencyInput className="form-control text-right"
                                                                            id="input-example"
                                                                            name="input-name"
                                                                            placeholder="0"
                                                                            autocomplete="off"
                                                                            defaultValue={0.0}
                                                                            decimalsLimit={2}
                                                                            value={currencySellBR}
                                                                            maxlength="30"
                                                                            disabled={disabledInput}
                                                                            style={{color:"red"}}
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
                                                                    <div style={{ maxWidth: "100%", margin: "10px" }} className="row">
                                                                        <div>
                                                                            <h6 className="card-title" style={{ fontSize: "22px", color:"red" }}>
                                                                                ≅{" "}
                                                                                <CurrencyFormat value={currencySellBR}
                                                                                    decimalScale={2}
                                                                                    displayType={"text"}
                                                                                    thousandSeparator={true} />
                                                                            </h6>
                                                                        </div>




                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div style={{ marginLeft: "10px" }}>
                                                                <button type="submit"
                                                                    name="submit"
                                                                    disabled={disabledInput}
                                                                    className="btn btn-outline-danger"
                                                                    value="sell"
                                                                    onClick={handleSell}>
                                                                    {t("Sell Now") + " " + code}
                                                                </button>
                                                                {isLoadingUi ?(
                                                                    <Loader />

                                                                ):(
                                                                    <div></div>

                                                                )};
                                                            </div>

                                                        </div>

                                                    </TabPanel>
                                                </Paper>
                                            </createTheme>
                                        </div>
                                    </div>
                                )
                                }
                                {/* Final Sessao comprar vender */}



                            </div>

                        </div>
                        <div className="col-md-4 row">
                            <div className="col-md-6" style={{ height: "auto", margin: "0 0 0 0" }}>


                                {isLoading ? (
                                    <Stack spacing={1} width="100%">

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            maxWidth: "290px",
                                            height: '585px',
                                            Top: "35px",
                                            "@media (max-width: 767px)": {
                                                display: 'none' // Oculta para dispositivos móveis
                                            }
                                        }} />


                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "340px",
                                            height: "275px",
                                            marginTop: "25px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />

                                    </Stack>

                                ) : (
                                    <OrderBook SymbolCoin={idMoeda} />
                                )}


                            </div>
                            <div className="col-md-6" style={{ height: "auto", margin: "0 0 0 0" }}>
                                {isLoading ? (
                                    <Stack spacing={1} width="100%">

                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            maxWidth: "290px",
                                            height: '585px',
                                            Top: "35px",
                                            "@media (max-width: 767px)": {
                                                display: 'none' // Oculta para dispositivos móveis
                                            }
                                        }} />


                                        <Skeleton variant="rectangular" sx={{
                                            backgroundColor: '#1E2026',
                                            minWidth: "340px",
                                            height: "275px",
                                            marginTop: "25px",
                                            "@media (min-width: 768px)": {
                                                display: 'none' // Oculta para desktops
                                            }
                                        }} />

                                    </Stack>

                                ) : (
                                    <OrderBookAllTraders SymbolCoin={idMoeda} />
                                )}


                            </div>
                            <div className="col-md-12" style={{ marginTop: "-15px" }}>
                                <PerfectScrollbar style={{ maxHeight: '213px' }}>
                                    <div className="card">
                                        <div className="card-body trade-history">
                                            <HistoryTable thisData={currentHistory} />
                                        </div>
                                    </div>
                                </PerfectScrollbar>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-12" style={{ margin: "5px 10px 15px -10px", maxHeight: "160px" }}>
                        <div className="card">
                            {isLoading ? (
                                <Stack spacing={1} width="100%">


                                    <div style={{ width: "100%" }}>
                                        <Skeleton variant="text" sx={{ fontSize: '16px', backgroundColor: '#1E2026' }} />
                                    </div>


                                    <Skeleton variant="rectangular" sx={{
                                        backgroundColor: '#1E2026',
                                        minWidth: "120px",
                                        height: 'auto',
                                        "@media (max-width: 767px)": {
                                            display: 'none' // Oculta para dispositivos móveis
                                        }
                                    }} />



                                    <Skeleton variant="rectangular" sx={{
                                        backgroundColor: '#1E2026',
                                        minWidth: "360px",
                                        height: "275px",
                                        "@media (min-width: 768px)": {
                                            display: 'none' // Oculta para desktops
                                        }
                                    }} />





                                </Stack>
                            ) : (
                                <div>
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
                                                            <th scope="col">{t("Application_Data")}</th>
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
                            )}


                        </div>
                    </div>

                </div>
            </div>
            <BottomBar selectedIcon="exchange" />
        </>
    );
}
export default Dashboard;
