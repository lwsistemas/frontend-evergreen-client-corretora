import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import Footer2 from "../layout/footer2";
import { useTranslation } from "react-i18next";
import axios from "../../services/index";
import { useSelector, useDispatch } from "react-redux";
import OrderModal from "../element/Ordermodal";
import CoinSelect from "../element/coinSelect";
import CurrencyFormat from "react-currency-format";
import { Tab, Nav, Form, Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import Loading from "../element/loading";
import CurrencyInput from "react-currency-input-field";
import TransferSelect from "../element/transferSelect";
import transferType from "../jsonConfig/globalConfig.json";
import Confirm2FA from "../element/general/Confirm2FA";
import GoTo2FA from "../element/general/GoTo2FA";

// ----------------
import DataGridTransfer from "../element/intertransfer/FormPagination";
import { User } from "../store/User/User.action";
import BottomBar from "../layout/sidebar/bottom-bar";

function Security() {
  //----------const ---------------
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const typeEmail = [{ placeholder: "Recipient user email" }];
  const typePhone = [{ placeholder: "Recipient user phone" }];
  const typeUser = [{ placeholder: "Recipient username" }];
  const typeHash = [{ placeholder: "Recipient user wallet address" }];
  const fir = "";

  //-------------------useState----------------------
  const [showHash, setShowHash] = useState("password");
  const [label, setLabel] = useState("Show");
  const [show, setShow] = useState(false);
  const [operationProps] = useState({});
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState();
  const [type, setType] = useState("login");
  const [coinType, setCoinType] = useState("12345");
  const [balance, setBalance] = useState("0");
  const [balanceBRL, setBalanceBRL] = useState();
  const [lastModifyBRL, setLastModifyBRL] = useState();
  const [lastModify, setLastModify] = useState();
  const [senderHistory, setSenderHistory] = useState([]);
  const [receiverHistory, setReceiverHistory] = useState([]);
  const [showLoad, setShowLoad] = useState("none");
  const [disabled, setDisabled] = useState(true);
  const [colorButton, setColorButton] = useState({
    backgroundColor: "#bf0202",
    borderColor: "#bf0202",
  });
  const [placeholderType, setPlaceholderType] = useState(
    typeUser[0].placeholder
  );
  const [placeholderValue, setPlaceholderValue] = useState(
    "Enter the transfer amount"
  );
  const [displayTranfer, setDisplayTranfer] = useState("block");
  const [displayCheck, setDisplayCheck] = useState("none");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [receiverID, setReceiverID] = useState();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 770px)").matches
  );
  const [historyName, setHistoryName] = useState("");
  const [open2FA, setOpen2FA] = useState(false);
  const [openGoTo2FA, setOpenGoTo2FA] = useState(false);

  //---------------------API------------------------

  const getSenderHistory = async () => {
    try {
      const senderHistory = await axios.put(`/interntransfer/sender`, {
        authKey: user.authKey,
      });
      setSenderHistory(senderHistory.data.reverse());
      return senderHistory;
    } catch (err) {
      return err.response;
    }
  };
  const getReceiverHistory = async () => {
    try {
      const receiverHistory = await axios.put(`/interntransfer/receiver`, {
        authKey: user.authKey,
      });
      setReceiverHistory(receiverHistory.data.reverse());
      return receiverHistory;
    } catch (err) {
      return err.response;
    }
  };
  const checkTransfer = async (e) => {
    setShowLoad("block");
    let is2fa = await getTwofactor();
    if (is2fa) {
      setOpenGoTo2FA(false);
    } else {
      setShowLoad("none");
      setOpenGoTo2FA(true);
      return;
    }
    setDisplayTranfer("none");
    try {
      if (balance < quantity) {
        setShowLoad("none");
        operationProps.operationStatus = false;
        operationProps.header = t("Transfer failed");
        operationProps.body = t("Insufficient funds");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        setShowLoad("none");
        setDisplayTranfer("block");
        return false;
      }
      const data = {
        type: type,
        key: address,
      };
      const internTransferCheck = await axios.post(
        `/interntransfer/check`,
        data
      );
      if (Object.keys(internTransferCheck.data).length == 0) {
        setDisplayTranfer("block");
        setShowLoad("none");
      } else {
        setFirstName(internTransferCheck.data.nome);
        setSecondName(internTransferCheck.data.secondname);
        setReceiverID(internTransferCheck.data.receiverHash);
        setDisplayCheck("block");
        setShowLoad("none");
      }
    } catch (error) {
      setShowLoad("none");
      operationProps.operationStatus = false;
      operationProps.header = t("Transfer failed");
      operationProps.body = t("User not found");
      cancelTransfer();
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
      setShowLoad("none");
      setDisplayTranfer("block");
      return error;
    }
  };

  const handleTransfer = async () => {
    const finalQuant = parseFloat(quantity.replace(",", ".")).toFixed(7);
    try {
      if (coinType == 1027) {
        operationProps.operationStatus = false;
        operationProps.header = t("Interntransfer not placed");
        operationProps.body = t("Eth withdraws are not working at moment");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        return false;
      }
      if (finalQuant > 0 && address) {
        const data = {
          authKey: user.authKey,
          type: type,
          status: 1,
          quantity: parseFloat(quantity.replace(",", ".")).toFixed(7),
          coinType: coinType,
          receiverHash: receiverID,
          name: firstName + " " + secondName,
        };
        setShowLoad("block");
        setAddress("");
        console.log("sucess", data);
        const interntransfer = await axios.post(`/interntransfer/`, data);
        setShowLoad("none");
        operationProps.operationStatus = true;
        operationProps.header = t("Interntransfer placed");
        operationProps.body = `${t("Your Interntransfer:")} ${quantity} ${
          transferType.tokenCoins[coinType]
        } ${t("was required")}`;
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        await getBalances(coinType);
        await getSenderHistory();
        setDisplayCheck("none");
        setDisabled(true);
        setQuantity("0");
        setColorButton({ backgroundColor: "#bf0202", borderColor: "#bf0202" });
        setDisplayTranfer("block");
        return interntransfer;
      } else {
        setShowLoad("none");
        cancelTransfer();
        operationProps.operationStatus = false;
        operationProps.header = t("Transfer failed");
        operationProps.body = t("Unexpected error");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 10000);
        return true;
      }
    } catch (err) {
      setShowLoad("none");
      operationProps.operationStatus = false;
      operationProps.header = t("Transfer failed");
      operationProps.body = t("Unexpected error");
      setShow(true);
      cancelTransfer();
      setTimeout(() => {
        setShow(false);
      }, 10000);
      return err;
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
      return err.response;
    }
  };
  const getTwofactor = async () => {
    let newtwofactor = await axios.put(`/user/validTwoFactor`, {
      authKey: user.authKey,
    });
    if (newtwofactor.data) {
      return true;
    } else {
      return false;
    }
  };
  const validUser = async () => {
    try {
      const valid = await axios.put("user/validUser", {
        authKey: user.authKey,
      });
      await getSenderHistory();
      await getReceiverHistory();
      await getBalances(coinType);
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

  //-------------------function-------------------------
  const handler = (e) => {
    setMatches(e.matches);
  };

  const openNext = async () => {
    let is2fa = await getTwofactor();
    if (is2fa) {
      setOpen2FA(true);
    } else {
      setShowLoad("none");
      setOpenGoTo2FA(true);
      return;
    }
  };

  function handleChange(newValue) {
    setCoinType(newValue);
  }
  const disabledButton = async (address, quantity) => {
    if (quantity != undefined && address != undefined && quantity != "") {
      if (
        address != "" &&
        quantity.replace(",", ".") <= 1000 &&
        quantity.replace(",", ".") > 0
      ) {
        setDisabled(false);
        setColorButton({ backgroundColor: "#10d876", borderColor: "#10d876" });
      } else {
        setDisabled(true);
        setColorButton({ backgroundColor: "#bf0202", borderColor: "#bf0202" });
      }
    } else {
      setDisabled(true);
      setColorButton({ backgroundColor: "#bf0202", borderColor: "#bf0202" });
    }
  };

  const typeTranfer = async (valueType) => {
    setAddress("");
    setType(valueType);
    if (valueType == "mobile") {
      setPlaceholderType(typePhone[0].placeholder);
    } else if (valueType == "email") {
      setPlaceholderType(typeEmail[0].placeholder);
    } else if (valueType == "login") {
      setPlaceholderType(typeUser[0].placeholder);
    } else if (valueType == "hash") {
      setPlaceholderType(typeHash[0].placeholder);
    }
  };

  const cancelTransfer = async () => {
    setShowLoad("block");
    setAddress("");
    setQuantity("");
    setDisabled(true);
    setColorButton({ backgroundColor: "#bf0202", borderColor: "#bf0202" });
    setDisplayCheck("none");
    setDisplayTranfer("block");
    setShowLoad("none");
  };

  //-------------------useEffect-------------------------
  useEffect(async () => {
    await validUser();
    window.matchMedia("(min-width: 770px)").addListener(handler);
  }, [coinType]);

  return (
    <>
      <Header2 />
      <Confirm2FA
        hashUser={user.authKey}
        sucessNext={handleTransfer}
        open2FA={open2FA}
        setOpen2FA={setOpen2FA}
      />
      <GoTo2FA openGoTo2FA={openGoTo2FA} setOpenGoTo2FA={setOpenGoTo2FA} />
      <OrderModal show={show} operationProps={operationProps} />
      <Sidebar />
      <Loading show={showLoad} />
      <div class="content-body">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">{t("Intern Transfer")}</h4>
                </div>
                <div
                  style={{
                    display: displayTranfer,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                >
                  <CoinSelect onChange={handleChange} />
                </div>
                <div class="card-body" style={{ display: displayTranfer }}>
                  <div class="row">
                    <div class="col-xl-12">
                      <div class="phone_verify">
                        <h4 class="card-title mb-3 text-center">
                          {t("Transfer")} {transferType.tokenCoins[coinType]}
                        </h4>
                        <div
                          class="form-row align-items-center"
                          style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div class="form-group col-xl-7">
                            <div
                              class=""
                              style={{
                                display: "flex",
                                flexDirection: matches ? "row" : "column",
                              }}
                            >
                              <div
                                class="input-group-append"
                                style={{
                                  marginTop: matches ? 0 : 20,
                                }}
                              >
                                <TransferSelect onChange={typeTranfer} />
                              </div>
                              <input
                                bind={typeHash}
                                type="text"
                                name="currency_amount"
                                value={address}
                                class="form-control text-right"
                                placeholder={t(placeholderType)}
                                autocomplete="off"
                                onChange={(text) => {
                                  setAddress(text.target.value);
                                  disabledButton(text.target.value, quantity);
                                }}
                              />
                            </div>
                          </div>
                          <div class="col-xl-7">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  {transferType.tokenCoins[coinType]}
                                </span>
                              </div>
                              <CurrencyInput
                                class="form-control text-right"
                                id="input-example"
                                name="input-name"
                                value={quantity}
                                placeholder={t(placeholderValue)}
                                defaultValue={0.0}
                                decimalsLimit={7}
                                onValueChange={(value, name) => {
                                  if (value == undefined) {
                                    setQuantity("0");
                                  }
                                  setQuantity(value);
                                  disabledButton(address, value);
                                }}
                              />
                            </div>
                            <div class="mt-2 text-right">
                              {t("Balance")}:{" "}
                              <span class="strong">
                                <CurrencyFormat
                                  value={balance}
                                  decimalScale={7}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />{" "}
                                {transferType.tokenCoins[coinType]}
                              </span>
                            </div>
                          </div>

                          <button
                            style={colorButton}
                            disabled={disabled}
                            className="btn btn-success btn-block mt-4 col-xl-7"
                            onClick={checkTransfer}
                          >
                            {t("Transfer now")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body" style={{ display: displayCheck }}>
                  <h4 class="card-title mb-3 text-center">
                    {t("Transfer")} {transferType.tokenCoins[coinType]}
                  </h4>
                  <div
                    class="align-items-center"
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <text>
                        <text style={{ fontWeight: "bold", fontSize: "20px" }}>
                          {t("Do you want to transfer")}{" "}
                        </text>
                        <text
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "white",
                          }}
                        >
                          {quantity} {transferType.tokenCoins[coinType]}
                        </text>
                        <text style={{ fontWeight: "bold", fontSize: "20px" }}>
                          {" "}
                          {t("to")}{" "}
                        </text>
                        <text
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "white",
                          }}
                        >
                          {firstName} {secondName}?
                        </text>
                      </text>
                    </div>
                    <div>
                      <button
                        style={{
                          backgroundColor: "#10d876",
                          borderColor: "#10d876",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                        className="btn btn-success btn-block mt-4"
                        onClick={openNext}
                      >
                        {t("Confirm")}
                      </button>
                    </div>
                    <div>
                      <button
                        style={{
                          backgroundColor: "#bf0202",
                          borderColor: "#bf0202",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                        className="btn btn-success btn-block mt-4"
                        onClick={cancelTransfer}
                      >
                        {t("Cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-12 col-lg-12 col-xxl-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title"> {t("Transfer History")}</h4>
              </div>
              <DataGridTransfer
                senderHistory={senderHistory}
                receiverHistory={receiverHistory}
              />
            </div>
          </div>
        </div>
      </div>
          <BottomBar />

    </>
  );
}
export default Security;
