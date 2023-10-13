//================material=============
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CurrencyFormat from "react-currency-format";
import Moment from "react-moment";
import AlertCom from "../element/dashboard/alertaCom";


import {
  useGmailTabsStyles,
  useGmailTabItemStyles,
} from "@mui-treasury/styles/tabs";
//===================imports===============

import globalConfig from "../jsonConfig/globalConfig.json";

import OrderModal from "../element/Ordermodal";
import axios from "../../services/index";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar/sidebar";
import { User } from "../store/User/User.action";
import { Loader } from "./home/components/loader";

import SeloVerificacao from '../../images/selo_verificacao.png'

//===================css================
import "../../css/dashboard/select.css";
import BottomBar from "../layout/sidebar/bottom-bar";

function Dashboard() {
  
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [ConteudoBlogs, setConteudoBlogs] = useState([]);
  const [balance, setBalance] = useState();
  const [balanceBTC, setBalanceBTC] = useState();
  const [lastModify, setLastModify] = useState();
  const [balanceBRL, setBalanceBRL] = useState(0);
  const [lastModifyBRL, setLastModifyBRL] = useState();
  const [show, setShow] = useState(false);
  const [operationProps] = useState({});
  const indicatorColors = ["#fff", "#fff"];
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);
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

  const HoverText = {

  }
  //-----useState ----//
  const [currency, setCurrency] = useState(1);
  const [secondary, setsecondary] = useState(0);
  const [userID, setuserID] = useState(0);
  const [coinPrices, setCoinPrices] = useState([]);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [var24h, setVar24h] = useState(0);
  const [disabledInput, setDisabledInput] = useState(false);
  const dispatch = useDispatch();
  var status = user.status;



  const DepositFiatIcon = (props) => (
    <svg
      width="20"
      height="19"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.2996 18.4C11.047 18.4 7.59961 14.9526 7.59961 10.7C7.59961 6.4474 11.047 3 15.2996 3C19.5544 3 22.9996 6.4474 22.9996 10.7C22.9996 14.9526 19.5544 18.4 15.2996 18.4"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.326 7.43961C4.2516 7.63761 1 10.9772 1 15.1C1 19.3526 4.4474 22.8 8.7 22.8C11.7734 22.8 14.4046 20.9872 15.641 18.3824"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const EmprestimoIcon = (props) => (
    <svg width="20"
      height="19"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">

      <defs>


      </defs>

      <g id="Inflation">

        <path class="cls-1" d="M21.43,8.79H2.57a.56.56,0,0,0-.4.17A.58.58,0,0,0,2,9.37V20.22a.57.57,0,0,0,.57.57H21.43a.57.57,0,0,0,.57-.57V9.37A.58.58,0,0,0,21.43,8.79Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-2" d="M22,17.29a3.5,3.5,0,0,0-3.5,3.5h2.93a.57.57,0,0,0,.57-.57Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-2" d="M2,17.29v2.93a.57.57,0,0,0,.57.57H5.5A3.5,3.5,0,0,0,2,17.29"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-2" d="M18.5,8.79a3.5,3.5,0,0,0,3.5,3.5V9.37a.58.58,0,0,0-.57-.58Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-2" d="M2.57,8.79A.58.58,0,0,0,2,9.37v2.92a3.5,3.5,0,0,0,3.5-3.5Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-3" d="M8.7,3.21a1,1,0,0,0-.76.33L6.34,5.35a1,1,0,0,0,.08,1.41,1,1,0,0,0,1.26,0V9.49a1,1,0,1,0,2,0V6.81a1,1,0,0,0,1.27,0A1,1,0,0,0,11,5.35L9.43,3.54a1,1,0,0,0-.73-.33"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-4" d="M15.31,11.38a1,1,0,0,0,.75-.34l1.6-1.8a1,1,0,0,0-.08-1.41,1,1,0,0,0-1.26,0V5.1a1,1,0,0,0-2,0V7.77A1,1,0,0,0,13,9.24l1.6,1.8a1,1,0,0,0,.74.34"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-2" d="M22,9.37a.58.58,0,0,0-.57-.58H20v12h1.39a.57.57,0,0,0,.57-.57Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-5" d="M20,8.79v2.9a3.47,3.47,0,0,0,2,.6V9.37a.58.58,0,0,0-.57-.58Zm2,8.5a3.47,3.47,0,0,0-2,.61v2.89h1.39a.57.57,0,0,0,.57-.57Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-6" d="M10.44,19.49h3.12a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5H10.44a.5.5,0,0,0-.5.5A.5.5,0,0,0,10.44,19.49Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

        <path class="cls-6" d="M11.5,12.52v-.23a.5.5,0,0,1,1,0v.23a1.45,1.45,0,0,1,.51.33,1.39,1.39,0,0,1,.31.45.5.5,0,0,1-.27.66.49.49,0,0,1-.65-.27.38.38,0,0,0-.09-.13.41.41,0,0,0-.29-.13h0a.43.43,0,0,0,0,.86,1.44,1.44,0,0,1,.5,2.78v.22a.5.5,0,0,1-1,0v-.22a1.45,1.45,0,0,1-.51-.33,1.33,1.33,0,0,1-.31-.46.5.5,0,1,1,.92-.38.31.31,0,0,0,.1.13.4.4,0,0,0,.3.13.44.44,0,0,0,0-.87,1.43,1.43,0,0,1-.5-2.77Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />

      </g>

    </svg>
  );

  const WithoutFiatIcon = (props) => (
    <svg
      width="20"
      height="19"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.74663 15.1602C5.60858 15.1606 5.49694 15.2727 5.49717 15.4107C5.49741 15.5488 5.60945 15.6605 5.74749 15.6604C5.88554 15.6603 5.99738 15.5483 5.99738 15.4103C5.99709 15.272 5.88488 15.1601 5.74662 15.1602"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.99965 13.9097C10.8284 13.9097 11.5003 14.5815 11.5003 15.4103C11.5003 16.2391 10.8284 16.9109 9.99965 16.9109C9.17088 16.9109 8.49902 16.2391 8.49902 15.4103C8.49902 14.5815 9.17088 13.9097 9.99965 13.9097"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0019 12.4091V18.4116C17.0019 19.5166 16.1061 20.4124 15.0011 20.4124H4.99583C4.46532 20.4122 3.95659 20.2014 3.58157 19.8261C3.20655 19.4509 2.99595 18.9421 2.99609 18.4116V12.408C2.99624 11.8774 3.20712 11.3687 3.58235 10.9937C3.95758 10.6187 4.46642 10.4081 4.99693 10.4082H15.0022C15.5327 10.4084 16.0414 10.6192 16.4164 10.9945C16.7915 11.3697 17.0021 11.8785 17.0019 12.4091Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.2518 15.6604C14.3899 15.66 14.5015 15.5479 14.5013 15.4099C14.501 15.2718 14.389 15.1601 14.251 15.1602C14.1129 15.1603 14.0011 15.2723 14.0011 15.4103C14.0014 15.5486 14.1136 15.6605 14.2518 15.6604"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.19531 10.4082L7.40614 5.88934L7.40645 5.88834C7.54389 5.37594 7.87925 4.93912 8.33876 4.67398C8.79827 4.40884 9.34429 4.33711 9.85669 4.47455L19.5199 7.06375L19.5209 7.06406C20.0333 7.20149 20.4701 7.53686 20.7353 7.99637C21.0004 8.45589 21.0721 9.00191 20.9347 9.5143L19.3812 15.3123C19.1016 16.3509 18.0497 16.9815 17.0019 16.7387"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const WithoutCryptoIcon = (props) => (
    // <svg
    //   width="24"
    //   height="25"
    //   viewBox="0 0 24 25"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M5.74663 15.1602C5.60858 15.1606 5.49694 15.2727 5.49717 15.4107C5.49741 15.5488 5.60945 15.6605 5.74749 15.6604C5.88554 15.6603 5.99738 15.5483 5.99738 15.4103C5.99709 15.272 5.88488 15.1601 5.74662 15.1602"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     d="M9.99965 13.9097C10.8284 13.9097 11.5003 14.5815 11.5003 15.4103C11.5003 16.2391 10.8284 16.9109 9.99965 16.9109C9.17088 16.9109 8.49902 16.2391 8.49902 15.4103C8.49902 14.5815 9.17088 13.9097 9.99965 13.9097"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     fill-rule="evenodd"
    //     clip-rule="evenodd"
    //     d="M17.0019 12.4091V18.4116C17.0019 19.5166 16.1061 20.4124 15.0011 20.4124H4.99583C4.46532 20.4122 3.95659 20.2014 3.58157 19.8261C3.20655 19.4509 2.99595 18.9421 2.99609 18.4116V12.408C2.99624 11.8774 3.20712 11.3687 3.58235 10.9937C3.95758 10.6187 4.46642 10.4081 4.99693 10.4082H15.0022C15.5327 10.4084 16.0414 10.6192 16.4164 10.9945C16.7915 11.3697 17.0021 11.8785 17.0019 12.4091Z"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     d="M14.2518 15.6604C14.3899 15.66 14.5015 15.5479 14.5013 15.4099C14.501 15.2718 14.389 15.1601 14.251 15.1602C14.1129 15.1603 14.0011 15.2723 14.0011 15.4103C14.0014 15.5486 14.1136 15.6605 14.2518 15.6604"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    //   <path
    //     d="M6.19531 10.4082L7.40614 5.88934L7.40645 5.88834C7.54389 5.37594 7.87925 4.93912 8.33876 4.67398C8.79827 4.40884 9.34429 4.33711 9.85669 4.47455L19.5199 7.06375L19.5209 7.06406C20.0333 7.20149 20.4701 7.53686 20.7353 7.99637C21.0004 8.45589 21.0721 9.00191 20.9347 9.5143L19.3812 15.3123C19.1016 16.3509 18.0497 16.9815 17.0019 16.7387"
    //     stroke={props.color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    // </svg>
    <i className="fa fa-bitcoin fa-2x" style={{ color: props.color, width: 24, height: 25 }}></i>
  );
  //---------------------API------------

  const getPrices2 = async (id) => {
    try {
      const prices = (await axios.get(`/price/prices`)).data;

      const currentPrice = await prices.filter((e) => {
        if (e) {
          if (e.coin == id) {
            setBuyPrice(e.ask);
            setSellPrice(e.bid);
            setVar24h(e.pctChange);
          }
          return;
        }
      });
      setCoinPrices(prices);
      return prices;
    } catch (err) {
      return err.message;
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

  const validUser = async () => {
    try {
      const valid = await axios.put("user/validUser", {
        authKey: user.authKey,
      });
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

  //-----------------Efferct------------
  useEffect(async () => {
    await validUser();
    let response = await getPrices2(currency);
    setActive("BTC");
  }, [secondary]); //eslint-disable-line

  const getBalances = async (currency) => {
    try {
      const balance = (await axios.put(`/wallet/0`, { authKey: user.authKey }))
        .data;
      setBalance(balance.wallet.balance);
      return balance;
    } catch (err) {
      console.log("aqui");
      return err.response;
    }
  };

  const getBalanceBTC = async (currency) => {
    try {
      const balanceBTC = (
        await axios.put(`/wallet/1`, { authKey: user.authKey })
      ).data;
      setBalanceBTC(balanceBTC.wallet.balance);
      return balanceBTC;
    } catch (err) {
      console.log("aqui");
      return err.response;
    }
  };

  // const getUser = async () => {
  //     console.log(`user.id: ${user.id}`)
  //     try {
  //         const userID = (await axios.get(`/user/view/${user.id}`, {authKey: user.authKey})).data
  //         setuserID(userID)
  //         return userID
  //     } catch (err) {
  //         return err.response
  //     }
  // }

  const getBlog = async () => {
    try {
      const ConteudoBlogs = await axios.get(`/blog/all`);
      setConteudoBlogs(ConteudoBlogs.data.reverse());
      return ConteudoBlogs;
    } catch (err) {
      return err.response;
    }
  };



  useEffect(async () => {
    setIsLoading(true); // Defina isLoading como true antes de carregar o blog
    await getBalances();
    await getBalanceBTC();
    // await getUser()
    await getBlog();
    setIsLoading(false);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <OrderModal show={show} operationProps={operationProps} />
        <Header2 title={`Olá ${user.firstName + " " + user.secondName}`} balanceBRL={balanceBRL} />

        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar selectedItem="home" />
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="main-content"
              style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
              <div class="content-body" id="dashboard">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-5 col-xxl-12 col-lg-12 col-xxl-4">
                      <div class="card">
                        <div class="card-header">
                          <h4 class="card-title" style={{ marginLeft: '25px' }}>
                            Olá {user.firstName}&nbsp;{user.secondName}
                          </h4>

                          {(() => {
                            if (status === 1) {
                              return (
                                <img
                                  src={SeloVerificacao}
                                  style={{
                                    height: '20px',
                                    marginLeft: '-15px',
                                    position: 'absolute'
                                  }}
                                  title="Este é um selo de verificação"
                                />
                              );
                            }
                          })()}



                          <small>
                            {t("Application_CadastradoEm")}{" "}
                            <Moment format="DD/MM/YY">
                              {user.createdAt}
                            </Moment>
                          </small>
                        </div>

                        <div class="card-body">
                          <div class="row">
                            <div class="col-xl col-lg col-md col-sm-auto col-6">
                              <p class="mb-0">{user.email}</p>
                              <h6>
                                {t("Application_Pais")} {user.nationality}
                              </h6>
                            </div>
                          </div>
                          <Link to="/deposit" class="btn btn-outline-primary m-1"><DepositFiatIcon
                            color={"#FFC107"}

                          /> Depositar</Link>
                          <Link to="/account-withdraw-fiat" class="btn btn-outline-primary m-1"><WithoutFiatIcon
                            color={"#FFC107"} /> Sacar</Link>
                          {
                            /*
                            <Link to="/emprestimos" class="btn btn-outline-primary m-1"><EmprestimoIcon
                            color={"#FFC107"}
                          /> Empréstimo</Link>
                           */
                          }
                          <Link to="/account-withdraw-cripto" class="btn btn-outline-primary m-1"> <i className="fa fa-bitcoin"></i> {t('Withdraw crypto')}</Link>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-3 col-xxl-6 col-lg-6 col-xxl-4">
                      <div class="card">
                        <div class="card-header" style={{ minHeight: "70px" }}>
                          <h4 class="card-title">{t("Your wallet")}: USD</h4>
                        </div>
                        <div class="card-body" style={{ minHeight: "122px" }}>
                          <div class="row">
                            <div class="col-xl col-lg col-md col-sm-auto col-6">
                              <p class="mb-0">{t("Balance")}</p>
                              <h6>
                                {Intl.NumberFormat("en", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(balance)}
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
                    <div class="col-xl-4 col-xxl-6 col-lg-6 col-xxl-4">
                      <div class="card">
                        <div class="card-header" style={{ minHeight: "70px" }}>
                          <h4 class="card-title">
                            {t("Your wallet")}:{" "}
                            {globalConfig.tokenCoins[currency]}
                          </h4>
                        </div>
                        <div class="card-body" style={{ minHeight: "122px" }}>
                          <div class="row">
                            <div class="col-xl col-lg col-md col-sm-auto col-6">
                              <p class="mb-0">{t("Balance")}</p>
                              <h6>
                                <CurrencyFormat
                                  value={balanceBTC}
                                  decimalScale={6}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />{" "}
                                {globalConfig.tokenCoins[currency]}
                              </h6>
                            </div>
                            <div class="col-xl col-lg col-md col-sm-auto col-6">
                              <p class="mb-0">{t("Last Modify")}</p>
                              <h6>
                                <Moment format="DD/MM/YY - HH:mm">
                                  {lastModify}
                                </Moment>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12 col-xxl-12 col-lg-12 col-xxl-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">
                            {t("Application_SejaBemVindo")}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AlertCom />

                  <div className="blog section-padding" id="blog">
                    <div className="container">
                      <div>
                        <img
                          src="https://images.infinitycapital.global/banner_entrada.png"
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-xl-6">
                          <div className="section-title text-center">
                            <h2>Blog</h2>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {ConteudoBlogs.map((blog) => (
                          <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="blog-grid">
                              <div className="card">
                                <img
                                  className="img-fluid"
                                  src={blog.Imagem}
                                  alt=""
                                />
                                <div className="card-body">
                                  <Link to={"/blog/id/" + blog.id}>
                                    <h4 className="card-title">{blog.Titulo}</h4>
                                  </Link>
                                </div>
                                <div className="card-footer">
                                  <div className="meta-info">
                                    <Link
                                      to={"/blog/id/" + blog.id}
                                      className="post-date"
                                    >
                                      <i className="la la-calendar"></i>{" "}
                                      <Moment format="DD/MM/YY - HH:mm">
                                        {blog.createdAt}
                                      </Moment>{" "}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>



        <BottomBar selectedIcon="home" />
      </div>
    </>
  );
}

export default Dashboard;
