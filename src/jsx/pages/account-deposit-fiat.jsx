import React, { useEffect, useState } from "react";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from "../layout/sidebar/sidebar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../services/index";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import CurrencyFormat from "react-currency-format";
import { Tab, Nav, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import OrderModal from "../element/Ordermodal";
import BankSelect from "../element/bankSelect";
import Loading from "../element/loading";
import CurrencyInput from "react-currency-input-field";
import typeDeposit from "../jsonConfig/globalConfig.json";
import { Dialog, DialogTitle } from "@material-ui/core";
import { User } from '../store/User/User.action'
import BottomBar from "../layout/sidebar/bottom-bar";


function AccountWithdraw(props) {
  const currencies = [];
  currencies[0] = "BRL";
  currencies[1] = "BTC";
  currencies[2] = "LTC";
  currencies[825] = "USD";
  currencies[1027] = "ETH";
  currencies[12345] = "IDSUEX";
  const { t } = useTranslation();
  const [histore, setHistore] = useState([]);
  let [quantity, setQuantity] = useState("");
  const [dolar, setDolar] = useState("0");
  const [type, SetType] = useState("");
  const user = useSelector((state) => state.user);
  const hist = useHistory();
  const [operationProps] = useState({});
  const [show, setShow] = useState(false);
  const [showLoad, setShowLoad] = useState("none");
  const [selected, SetSelected] = useState();
  const [bankDisplay, setBankDisplay] = useState("none");
  const [bankSlug, setBankSlug] = useState("");
  const [maxValue, setMaxValue] = useState(0);
  const [MinValue, setMinValue] = useState(10);
  const [formMaxValue, setFormMaxValue] = useState("");
  let [valorUsd, setvalorUsd] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch()
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Modal visível na inicialização


  // useEffect(async () => {
  //   // Lógicas no carregamento do componente...
  //   // setIsAlertVisible(false); // Garantir que o modal esteja visível após carregamento
  // }, []);

  // Função para fechar o modal
  const hideAlertModal = () => {
    setIsAlertVisible(false);
  };

  const quantityNumber = quantity == "" ? "" : parseFloat(quantity.replace(/[^\d.]/g, "").replace(/(\d)(\d{2})$/, "$1.$2"))

  const closeModal = () => {
    setOpenModal(false);
  };

  const redirectToProfile = () => {
    props.history.push(`/user/editUser`);
  };

  const getPrices = async () => {
    try {
      const prices = (await axios.get(`/price/symbol/8250`)).data;

      // console.log(prices.price)
      valorUsd = (parseFloat(prices.price) + 0.15);
      setvalorUsd((parseFloat(prices.price) + 0.15));
    } catch (err) {
      return err.message;
    }
  };

  function handleChange(newValue) {
    setBankSlug(newValue);
  }

  const CalcDolar = async () => {
    await getPrices();
    if (parseFloat(quantityNumber) == 0 || parseFloat(quantityNumber) == null || quantity == "") {
      setDolar(0);
    } else {
      setDolar((quantityNumber) * valorUsd);
    }
  };

  const InputStyle = {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    border: "solid",
    borderRadius: 10,
    width: "25%",
    height: 85,
  };

  const SelectedInputStyle = {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    border: "solid",
    borderRadius: 10,
    borderColor: "#FFC107",
    backgroundColor: "#3A3B3C",
    width: "25%",
    height: 85,
    color: "#FFC107"
  };

  const getHistory = async () => {
    try {
      const histore = await axios.get(`/payment/${user.id}`);
      setHistore(histore.data.reverse());
      return histore;
    } catch (err) {
      return err.response;
    }
  };
  const getMaxValue = async () => {
    try {
      const response = (
        await axios.put(`/payment/maxValue`, { authKey: user.authKey })
      ).data;
      // console.log(response.maxValue);
      setMaxValue(response.maxValue);
      return response;
    } catch (err) {
      return err.response;
    }
  };

  const handleDeposit = async (e) => {
    // console.log(bankSlug)
    e.preventDefault();
    try {
      if (user.idDocument === "" || user.idDocument == null) {
        setOpenModal(true);
        return;
      } else {
        if (quantityNumber > 0 && type !== "credit_card") {
          setShowLoad("block");

          let Valortotal = quantityNumber * valorUsd;

          const data = {
            uid: user.id,
            value: quantityNumber * valorUsd,
            valorUsd: quantityNumber,
            type: type,
            authKey: user.authKey,

          };
          if (type === "deposit") {
            const payment = await axios.post(
              `/payment/deposit`,
              data
            );
            if (payment.data.error) {
              setShowLoad("none");
              operationProps.operationStatus = false;
              operationProps.header = t("Deposit not placed");
              operationProps.body = t("An error ocurred on your deposit");
              setShow(true);
              setTimeout(() => {
                setShow(false);
              }, 6000);
            } else {
              props.history.push({
                pathname: "/deposit-detail/" + payment.data.idPedido,
                satate: payment,
              });
              setShowLoad("none");
            }
            return payment;
          } else {
            const payment = await axios.post(`/payment/lwpay`, data);
            if (payment.data.error) {
              setShowLoad("none");
              operationProps.operationStatus = false;
              operationProps.header = t("Deposit not placed");
              operationProps.body = t("An error ocurred on your deposit");
              setShow(true);
              setTimeout(() => {
                setShow(false);
              }, 6000);
            } else {
              // console.log(payment.data.NumeroPedido);
              props.history.push({
                pathname: `/deposit-detail/${payment.data.idPedido}`,
                satate: payment,
              });
              setShowLoad("none");
            }
            // console.log(payment);
            return payment;
          }
          return type;
        } else if (quantityNumber > 0 && type === "credit_card") {
          setShowLoad("block");
          const data = {
            id: user.id,
            value: quantityNumber,
            type: type,
          };
          const payment = await axios.post(`/payment/card`, data);
          if (payment.data.error) {
            setShowLoad("none");
            operationProps.operationStatus = false;
            operationProps.header = t("Deposit not placed");
            operationProps.body = t("An error ocurred on your deposit");
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 6000);
          } else {
            props.history.get({
              pathname: `/deposit-detail/00000`,
              satate: payment,
            });
            setShowLoad("none");
          }
        } else {
          // console.log(quantity, type);
          operationProps.operationStatus = false;
          operationProps.header = t("Deposit not placed");
          operationProps.body = t("Deposit value must be greater than 0");
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 6000);
          return true;
        }
      }


    } catch (err) {
      setShowLoad("none");
      operationProps.operationStatus = false;
      operationProps.header = t("Deposit not placed");
      operationProps.body = t("An error ocurred on your deposit");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
      return err.response;
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

  useEffect(async () => {
    await validUser()
    await getMaxValue();
    await getHistory();
  }, []);

  useEffect(() => { CalcDolar() }, [quantityNumber])

  return (
    <>
      <Header2 title={t("Deposit Founds")} />
      <OrderModal show={show} operationProps={operationProps} />

      <Dialog className="dialog" open={openModal} onClose={closeModal}>
        <div className="dialog-content">
          <DialogTitle>Por favor, adicione um CPF</DialogTitle>
          <div className="d-flex justify-content-center align-items-center">
            <Button onClick={redirectToProfile} color="primary" autoFocus>
              Atualizar meus dados
            </Button>
          </div>
        </div>
      </Dialog>

      {isAlertVisible && (
        <div className="custom-modal-overlay">
          <div className="custom-modal bg-dark text-white">
            <p className="text-center text-white">
              <strong className="text-red text-white">Atenção aos Métodos de Pagamento na EVER GREEN BROKER</strong><br />
              É importante destacar que todos os depósitos realizados devem ser feitos
              exclusivamente para as contas e via PIX que estão registrados dentro de nossa
              plataforma. Ressaltamos que nenhum dos nossos analistas está autorizado a
              fornecer informações de conta por e-mail, WhatsApp ou qualquer outro meio de
              comunicação externo.
            </p>
            <p className="text-center text-white">
              Para garantir a segurança e a autenticidade de suas transações, pedimos que efetue
              o pagamento do seu depósito seguindo apenas as instruções e os dados fornecidos
              diretamente na plataforma. Esta medida é crucial para prevenir fraudes e manter a
              integridade de suas operações financeiras conosco.
            </p>

            <div className="alert alert-info">
              <p>Prazo de até 48 horas para efetivação do aporte.</p>
              <p>Para agilizar o processo de rentabilização, encaminhe o comprovante do pagamento para seu 
                gerente de contas.</p>
            </div>
            <button onClick={hideAlertModal}>Fechar</button>
          </div>
        </div>
      )}


      <Loading show={showLoad} />
      <div class="content-body">
        <div class="container-fluid h-100">
          <div class="row">
            <div class="col-xl-12">
              <div class="card">

                <div class="card-body">
                  <div class="row justify-content-center">
                    <div class="col-xl-8">
                      <form action="#" class="py-5">
                        <div class="form-group row align-items-center">
                          <div class="col-sm-4">
                            <label for="inputEmail3" class="col-form-label">
                              {t("Value")}
                              <br />
                              <small>
                                {t("Please check double to make sure")}
                              </small>
                              <br></br>
                              <small>
                                {t("$ 10.00")} - ${" "}
                                <CurrencyFormat
                                  value={maxValue}
                                  decimalScale={2}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                .00
                              </small>
                            </label>
                          </div>
                          <div class="col-sm-8">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <label
                                  class="input-group-text bg-primary"
                                  style={{ color: "white" }}
                                >
                                  {t("Total_In_Dollar") + " " + "$"}{" "}
                                </label>
                              </div>
                              <Form.Control
                                type="text"
                                placeholder="0.00"
                                value={quantity == "" ? quantityNumber : Intl.NumberFormat("en-US", {
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }).format(quantityNumber)}
                                onChange={(e) => setQuantity(e.target.value)}
                                onInput={(event) => {
                                  event.target.value = event.target.value.replace(/\D/g, "");
                                  if (event.target.value.length == 1) {
                                    event.target.value = event.target.value.replace(/^(\d)/, "0.0$1");
                                  }
                                  if (event.target.value.length == 2) {
                                    event.target.value = event.target.value.replace(/^(\d)/, "0.$1");
                                  } else {
                                    event.target.value = event.target.value.replace(/(\d)(\d{2})$/, "$1.$2");
                                  }
                                  event.target.value = event.target.value.replace(
                                    /(?=(\d{3})+(\D))\B/g,
                                    ","
                                  );
                                }}
                                pattern="[0-9,.]*"
                                style={{ textAlign: "right" }}
                                inputMode="numeric"
                                class="form-control text-right"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4"></div>
                          <div className="col-sm-8">
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <label
                                  className="input-group-text bg-primary"
                                  style={{ color: "white" }}
                                >
                                  {t("Total_In_Reais") + " " + "R$"}
                                </label>
                              </div>
                              <CurrencyInput
                                class="form-control text-right"
                                id="idola"
                                name="dolar"
                                autocomplete="off"
                                decimalScale={2}
                                decimalsLimit={2}
                                disabled="true"
                                value={dolar}
                                defaultValue={dolar}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row align-items-right justify-content-right">
                          <div style={selected === "pix" ? SelectedInputStyle : InputStyle} onClick={() => {
                            SetSelected("pix");
                            SetType("pix");
                            setBankDisplay("none");
                          }}
                          >
                            <i
                              class="mdi mdi-qrcode"
                              style={{
                                fontSize: 20,
                              }}
                            ></i>
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              {t("Pix")}
                            </label>
                          </div>
                          <div style={selected === 'Deposit' ? SelectedInputStyle : InputStyle} onClick={() => {
                            SetSelected('Deposit')
                            SetType('deposit')
                            setBankDisplay('none')
                          }}>
                            <i class="mdi mdi-bank" style={{
                              fontSize: 20
                            }}></i>
                            <label class="form-check-label" for="exampleRadios1">
                              {t('Appication_DepositoTED')}
                            </label>
                          </div>


                        </div>
                        <div
                          style={{
                            display: bankDisplay,
                            float: "right",
                            margin: 20,
                          }}
                        >

                        </div>
                        <button
                          style={{
                            backgroundColor:
                              quantityNumber > maxValue
                                ? "#bf0202"
                                : quantityNumber < MinValue
                                  ? "#bf0202"
                                  : type == ""
                                    ? "#bf0202"
                                    : "#10d876",
                            borderColor:
                              quantityNumber > maxValue
                                ? "#bf0202"
                                : quantityNumber < MinValue
                                  ? "#bf0202"
                                  : type == ""
                                    ? "#bf0202"
                                    : "#10d876",
                          }}
                          disabled={
                            quantityNumber < MinValue ? true : quantityNumber > maxValue ? true : type == "" ? true : false
                          }
                          className="btn btn-success btn-block mt-4"
                          onClick={handleDeposit}
                        >
                          {t("Deposit now")}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-12 col-xxl-12">
              <Tab.Container defaultActiveKey="open-position">
                <div class="card">
                  <div class="card-header">
                    <Nav variant="pills">
                      <Nav.Link eventKey="open-position">
                        {t("Deposit History")}
                      </Nav.Link>
                    </Nav>
                  </div>
                  <PerfectScrollbar>
                    <div class="card-body open-position-table">
                      <div class="market-history market-order">
                        <Tab.Content>
                          <Tab.Pane eventKey="open-position">
                            <div class="table-responsive">
                              <table class="table table-hover" id="tbUser">
                                <thead>
                                  <tr>
                                    <th scope="col">{t("Code")}</th>
                                    <th scope="col">
                                      {t("Application_Status")}
                                    </th>
                                    <th scope="col">{t("Application_USD")}</th>
                                    <th scope="col">{t("Value")}</th>

                                    <th scope="col">{t("Type")}</th>

                                    <th scope="col">{t("Application_Data")}</th>
                                    <th scope="col"></th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {histore.length !== 0
                                    ? histore.map((deposit) => (
                                      <tr>
                                        <th scope="row">
                                          <Link
                                            to={{
                                              pathname: `/deposit-detail/${deposit.code}`,
                                            }}
                                            class="btn btn-info"
                                          >
                                            {deposit.code}
                                          </Link>
                                        </th>
                                        <td>
                                          {t(
                                            typeDeposit.status[deposit.status]
                                          )}
                                        </td>
                                        <td>
                                          {Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "USD",
                                          }).format(deposit.valueUsd)}{" "}
                                        </td>
                                        <td>
                                          {Intl.NumberFormat("pt-br", {
                                            style: "currency",
                                            currency: "BRL",
                                          }).format(deposit.value)}{" "}
                                        </td>
                                        <td>
                                          {t(
                                            typeDeposit.depositType[
                                            deposit.type
                                            ]
                                          )}{" "}
                                        </td>
                                        <td>
                                          <Moment format="DD/MM/YY - HH:mm">
                                            {deposit.createdAt}
                                          </Moment>
                                        </td>
                                        <td>
                                          <Link
                                            to={{
                                              pathname: `/deposit-detail/${deposit.code}`,
                                            }}
                                            class="btn btn-info"
                                          >
                                            <i class="fa fa-qrcode"></i>{" "}
                                            {t("Check details")}
                                          </Link>
                                        </td>
                                      </tr>
                                    ))
                                    : false}
                                </tbody>
                              </table>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </PerfectScrollbar>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />

    </>
  );
}

export default AccountWithdraw;
