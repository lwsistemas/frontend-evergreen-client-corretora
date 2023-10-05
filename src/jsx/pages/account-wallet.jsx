import React, { useState, useEffect } from "react";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar/sidebar";
import ButtonsUser from "../element/ButtonsUser";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CurrencyFormat from "react-currency-format";
import axios from "../../services/index";
import "../../css/account/account-wallet.css";
import { Loader } from "./home/components/loader";
import { Link } from "react-router-dom";
import { User } from '../store/User/User.action'
import BottomBar from "../layout/sidebar/bottom-bar";

const currencies = [];
currencies[0] = "BRL";
currencies[1] = "BTC";
currencies[2] = "LTC";
currencies[825] = "USD";
currencies[1027] = "ETH";
currencies[12345] = "IDSUEX";

function MyWallet() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState([]);
  const [coinsByUser, setCoinsByUser] = useState();
  const [saldo, setSaldo] = useState();
  const [balanceBRL, setBalanceBRL] = useState();
  const [lastModifyBRL, setLastModifyBRL] = useState();
  const [lastModify, setLastModify] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  const getBalances = async () => {
    try {
      let _balance = [];
      let _balanceUnique = {
        balance: 0,
        coin: "",
        type: 0,
        price: 0,
      };
      let _saldo = 0;
      const _coinsByUser = await axios.get(`/wallet?uid=${user.id}`);

      if (_coinsByUser.data != undefined) {
        for (const coin of _coinsByUser.data) {
          if (coin.type != 0 && coin.CoinName != "BRL") {
            _balanceUnique = {
              balance: 0,
              coin: "",
            };
            const balanceUnique = (
              await axios.put(`/wallet/${coin.type}`, { authKey: user.authKey })
            ).data;
            const priceCoin = (await axios.get(`/price/symbol/${coin.type}`))
              .data;
            _balanceUnique.balance = balanceUnique.wallet.balance;
            _balanceUnique.coin = coin.CoinName;
            _balanceUnique.type = coin.type;
            _balanceUnique.price = priceCoin == null ? 0 : priceCoin.price;
            _balanceUnique.img = priceCoin == null ? "" : priceCoin.img;
            _saldo += balanceUnique.wallet.balance;
            _balance.push(_balanceUnique);
            console.log(_coinsByUser);
          }
        }
      }
      setSaldo(_saldo);
      setCoinsByUser(_coinsByUser.data);
      setBalance(_balance);
      // setBalanceBRL(balance.walletBRL.balance)
      // setLastModify(balance.wallet.updatedAt)
      // setLastModifyBRL(balance.walletBRL.updatedAt)
      return _balance;
    } catch (err) {
      return err.response;
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

  useEffect(async () => {
    await validUser()
    await getBalances();
    setIsLoading(false)
  }, []);

  useEffect(() => { console.log(balance) }, [coinsByUser, balance]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header2 title={t("Your wallet")}/>
          <Sidebar selectedItem="profile" />
          <div className="content-body">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-xxl-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="card acc_balance">

                        <div className="card-body">
                          <ButtonsUser />
                        </div>
                        <div className="d-flex flex-column card-body py-4 align-items-center">
                          <span className="text-center text-uppercase">
                            {t("Total wallet")}
                          </span>
                          <h3 className="text-center mt-1">
                            {Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                            }).format(saldo)}
                          </h3>
                          <div className="d-flex mt-3" style={{ gap: "8px" }}>
                            <Link to="/exchangePro">
                              <button className="btn btn-success">{t("Application_exchangePro")}</button>
                            </Link>
                            <Link to="/deposit">
                              <button className="btn btn-primary">{t("Deposit fiat")}</button>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="balance-list">
                            {balance.filter((element) => element.img).map((element) => (
                              <div
                                className="card-body balance-card"
                                style={{ background: "#191e2b" }}
                              >
                                <div className="balance-row" key={element.coin}>
                                  <div className="d-flex content-icon">
                                    <img src={element.img} />
                                    <h4 className="coin">{element.coin}</h4>
                                  </div>
                                  <div
                                    className="d-flex flex-column content-prices"
                                    style={{ alignItems: "end" }}
                                  >
                                    <span
                                      className="balance"
                                      style={{ fontSize: "24px" }}
                                    >
                                      ${" "}
                                      <CurrencyFormat
                                        value={element.balance.toFixed(2)}
                                        decimalScale={2}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </span>
                                    <span
                                      className="text-bold text-white"

                                    >
                                      ${" "}
                                      <CurrencyFormat
                                        value={formatNumberWithTwoDecimalPlaces(element.price)}
                                        decimalScale={2}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </span>
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
              </div>
            </div>
          </div>
                     <BottomBar selectedIcon="wallet" />
        </>
      )}
    </>

  )
}

export default MyWallet;
