import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar/sidebar";
import { useTranslation } from "react-i18next";
import TradingViewWidget2 from '../element/dashboard/TradingViewWidget';
import axios from "../../services/index";
import { useSelector, useDispatch } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";
import CurrencyFormat from "react-currency-format";
import { User } from '../store/User/User.action'
import Moment from "react-moment";
import BottomBar from "../layout/sidebar/bottom-bar";
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { Dialog } from '@mui/material';
import { Modal, Button, Form } from 'react-bootstrap';
import { Loader } from "./home/components/loader";




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

function Exchange() {
  const { t } = useTranslation();
  const parametros = useParams();
  const [ContratoAtual] = useState(parametros.id);
  const user = useSelector((state) => state.user);
  const [Robot, setRobot] = useState([]);
  const [userID, setuserID] = useState(0);
  const [CodeID] = useState(parametros.idmkt);
  const [Tickets, setTickets] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpenSaque, setDialogOpenSaque] = useState(false);
  const [isMsgDialog, setMsgDialog] = useState(t('Application_MsgSaqueNaoHabilitado'));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isValorDisponivel, setisValorDisponivel] = useState(0)
  const [isValorMargem, setisValorMargem] = useState(0)
  const [inputValue, setInputValue] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isValorSacado, setisValorSacado] = useState(0)
  const [isLoading, setIsLoading] = useState(true);


  const dispatch = useDispatch()
  const mmzero = 0.02


  const VerificarValores = () => {
    //console.log(inputValue)



    if (inputValue > parseFloat(isValorMargem)) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);


    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();



    const data = {
      authKey: user.authKey,
      ValorRequisitado: inputValue,
      hash: Robot.hashTransaction,
    }

    const response = await axios.post('/marketinvestment/robo/withdraw', data)
    if (response.data.status == 'success') {
      openDialogSaque(true)
      handleClose()
      setisValorSacado(inputValue)
    }


    //handleClose();
  };

  const openDialog = (e) => {
    e.preventDefault();

    if (Robot.isSaque == 1) {
      setisValorMargem(Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
      }).format(Robot.disponivel * Robot.valueMargem / 100 - mmzero))
      handleShow()
    } else {
      setDialogOpen(true);

      const intervalId = setInterval(() => {
        setDialogOpen(false);

        // Limpa o intervalo após a chamada
        clearInterval(intervalId);
      }, 5000); // 3000 milissegundos = 3 segundos
    }



  };

  const openDialogSaque = (e) => {
    setDialogOpenSaque(true)
  }

  const closeDialog = () => {
    setDialogOpen(false);
    //window.location.href = '/robos';
  };


  const closeDialogSaque = () => {
    setDialogOpenSaque(false);
    //window.location.href = '/robos';
  };


  const getRobot = async () => {
    try {
      const Robot = (
        await axios.get(`/marketinvestment/robo/relatorio/${ContratoAtual}`)
      ).data;
      setRobot(Robot);
    } catch (err) {
      return err.response;
    }
  };

  const getUser = async () => {
    //    console.log(`user.id: ${user.id}`);
    try {
      const userID = (
        await axios.get(`/user/view/${user.id}`, { authKey: user.authKey })
      ).data;
      setuserID(userID);
      return userID;
    } catch (err) {
      return err.response;
    }
  };

  const getTickets = async (idps) => {
    try {
      const Tickets = await axios.get(`/marketinvestment/robo/all/${CodeID}`);
      setTickets(Tickets.data.reverse());
      return Tickets;
    } catch (err) {
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
          // console.log("invalid user");
          dispatch(User(null));
        } else {
          // console.log("Unexpected error");
        }
      } else {
        // console.log("Unexpected error 404");
      }
    }
  };

  useEffect(async () => {

    setIsLoading(true)
    await validUser()
    await getRobot();
  }, [])

  useEffect(async () => {
    await getUser();
    const interval = setInterval(async () => {
      await getTickets();
      await getRobot();
    }, 5000);
    return () => {
      clearInterval(interval);
    };

  }, []);

  useEffect(async () => {
    await getTickets();

    setIsLoading(false)
  }, []);

  return (
    <>
      <Header2 title={t("Hash") + " : " + ContratoAtual} />
      <Sidebar selectedItem="markets" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5">
                <div className="card">

                  <div className="card-body">
                    <div> </div>
                    <h5 className="text-gray">
                      {t("Application_Investimento")}{" "}
                      {Intl.NumberFormat("en", {
                        style: "currency",
                        currency: "USD",
                      }).format(Robot.valor)}{" "}
                    </h5>
                    <h5 className="text-gray">
                      {" "}
                      {t("Application_Retorno")}
                      {Intl.NumberFormat("en", {
                        style: "currency",
                        currency: "USD",
                      }).format(Robot.ganho)}{" "}
                    </h5>

                    <h5 className="text-gray">
                      {t("Application_Available")}{" "}
                      {(() => {
                        if (Robot.disponivel > 0) {
                          return (
                            <span className="text-gray">
                              {Intl.NumberFormat("en", {
                                style: "currency",
                                currency: "USD",
                              }).format(Robot.disponivel)}
                            </span>
                          );
                        } else {
                          return (
                            <span className="text-danger">
                              $&nbsp;
                              {Intl.NumberFormat("en", {
                                maximumSignificantDigits: 4,
                              }).format(0.0)}
                            </span>
                          );
                        }
                      })()}
                    </h5>
                    <div>
                      {(() => {
                        if (Robot.status == 0) {
                          return (

                            <Link class="btn btn-outline-primary  btn-xxs"
                              onClick={openDialog}>
                              {t('Application_BtnSacarDisponivel')}&nbsp;<WithoutFiatIcon
                                color={"#FFC107"} /></Link>

                          );
                        } else {
                          return (

                            <Link class="btn btn-outline-primary  btn-xxs disabled"
                              disabled>
                              {t('Application_BtnSacarDisponivel')}&nbsp;<WithoutFiatIcon
                                color={"#FFC107"} /></Link>

                          );
                        }
                      })()}
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                      {t("Application_AtivoInvestments")}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div
                      className="tradingview-widget-container card"
                      style={{ height: "335px" }}
                    >
                      {
                        <TradingViewWidget2 symbol={`${Robot.moedaSimbolo}USD`} id='RoboInterno'
                          
                        />
                      }{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className={"col-md-12"}>
                <div className="card">
                  <div class={"card-body"}>
                    <div className="table-responsive">
                      <div className="card-body">
                        <div className="table-responsive">
                          <Table className="table table-hover table-borderless table-striped-columns table-bordered">
                            <thead>
                              <tr>

                                <th className="hidden-phone">{t("Application_Data")}</th>
                                <th>{t("Application_Ganhos")}</th>
                                <th>{t("Application_Porcentagem")}</th>
                                <th>{t("Application_Status")}</th>
                                <th>{t("Application_Tipo")} </th>
                                <th className="text-left">{t("Application_HashTransaction")}</th>
                                {/*<th>{t("Application_Acoes")}</th>*/}
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                const display = Tickets.map((data) => (
                                  <tr>

                                    <td className="text-left">
                                      <Moment format="DD/MM/YY - HH:mm">
                                        {data.createdAt}
                                      </Moment>
                                    </td>
                                    <td className="text-left">
                                      {(() => {
                                        if (data.tipo == 1) {
                                          return (
                                            <span className="text-success">
                                              ${" "}
                                              <CurrencyFormat
                                                value={data.ganho}
                                                decimalScale={6}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                              />
                                            </span>
                                          );
                                        } else {
                                          return (
                                            <span className="text-danger">
                                              ${" "}
                                              {Intl.NumberFormat("en-IN", {
                                                maximumSignificantDigits: 6,
                                              }).format(data.ganho)}
                                            </span>
                                          );
                                        }
                                      })()}
                                    </td>
                                    <td className="text-left">
                                      {(() => {
                                        if (data.tipo == 1) {
                                          return (
                                            <span className="text-success">
                                              {" "}
                                              <CurrencyFormat
                                                value={data.resultValue}
                                                decimalScale={6}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                              />{" "}
                                              %
                                            </span>
                                          );
                                        } else {
                                          return (
                                            <span className="text-danger">
                                              {" "}
                                              {Intl.NumberFormat("en-IN", {
                                                maximumSignificantDigits: 6,
                                              }).format(data.resultValue)}{" "}
                                              %
                                            </span>
                                          );
                                        }
                                      })()}
                                    </td>

                                    <td className="text-left">
                                      {(() => {
                                        if (data.status == 0) {
                                          return (
                                            <span className="badge badge-info">
                                              {t("Application_Ativos")}
                                            </span>
                                          );
                                        } else if (data.status == 1) {
                                          return (
                                            <span className="badge badge-success">
                                              {t("Application_Aguardando")}
                                            </span>
                                          );
                                        } else if (data.status == 2) {
                                          return (
                                            <span className="badge badge-warning">
                                              {t("Application_Finalizado")}
                                            </span>
                                          );
                                        } else if (data.status == 3) {
                                        } else {
                                          return (
                                            <span className="badge badge-info">
                                              {t("Application_Outros")}
                                            </span>
                                          );
                                        }
                                      })()}
                                    </td>
                                    <td className="text-left">
                                      {(() => {
                                        if (data.tipo == 1) {
                                          return (
                                            <span className="badge badge-success">
                                              {t("Application_Gain")}{" "}
                                              <i className="fa fa-arrow-up"></i>
                                            </span>
                                          );
                                        } else if (data.tipo == 2) {
                                          return (
                                            <span className="badge badge-danger">
                                              {t("Application_Loss")}{" "}
                                              <i className="fa fa-arrow-down"></i>
                                            </span>
                                          );
                                        }
                                      })()}
                                    </td>
                                    <td className="text-left">
                                      {data.hashTransaction.substring(0, 32)}
                                    </td>
                                    {/*<td>
                                    <Link
                                      to={`#`}
                                      class={"btn btn-sm btn-dark"}
                                    >
                                      <i className="fa fa-eye"></i>{" "}
                                    </Link>
                                  </td>*/}

                                  </tr>
                                ));
                                return display;
                              })()}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Dialog className='dialog' open={isDialogOpen} onClose={closeDialog}>
                  <div className='dialog-content'>
                    <DialogTitle> {
                      <div >
                        <h2 className='text-danger'>Transação não liberada! <i className="fa fa-exclamation-triangle"></i></h2>
                        <div>{isMsgDialog}</div>
                      </div>}
                    </DialogTitle>

                    <DialogActions>

                      <Button onClick={closeDialog}
                        color="primary" autoFocus>
                        Fechar <i className="fa fa-close"></i>
                      </Button>
                    </DialogActions>
                  </div>
                </Dialog>

                <Dialog className='dialog' open={isDialogOpenSaque} onClose={closeDialogSaque}>
                  <div className='dialog-content'>
                    <DialogTitle> {
                      <div >
                        <h2 className='text-success'>Transação confirmada <i className="fa fa-smile-o"></i></h2>
                        <div>{t('Application_msgSaqueConfirmado', {
                          valor: Intl.NumberFormat("en", {
                            style: "currency",
                            currency: "USD",
                          }).format(isValorSacado)
                        })}</div>
                      </div>}
                    </DialogTitle>

                    <DialogActions>

                      <Button onClick={closeDialogSaque}
                        color="success" autoFocus>
                        Fechar <i className="fa fa-thumbs-o-up"></i>
                      </Button>

                    </DialogActions>
                  </div>
                </Dialog>

                <Modal show={show} onHide={handleClose} className="justify-content-center" centered>
                  <Modal.Header closeButton className="bg-dark">
                    <Modal.Title>{t('Application_msgSaque', {
                      valor: Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 2,
                      }).format(Robot.disponivel * Robot.valueMargem / 100 - mmzero)
                    })}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="bg-dark align-items-center">
                    <Form onSubmit={handleSubmit}>

                      <Form.Group>
                        <Form.Label>{t('Application_DigiteValor')}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t("Application_DigiteValor")}
                          value={inputValue}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const regex = /^[0-9,\.]*$/; // Permite números inteiros e decimais com um ponto como separador decimal
                            if (regex.test(inputValue)) {
                              setInputValue(inputValue.replace(",", ".")); // Substitui vírgula por ponto se houver
                            }

                          }}
                          onBlur={VerificarValores}
                          onKeyUp={VerificarValores}
                          readOnly={false}
                        />
                      </Form.Group>
                      {showErrorMessage && (
                        <p className="alert alert-danger">
                          O valor inserido é maior do que {isValorMargem}.
                        </p>
                      )}

                      <Button
                        variant="success"
                        type="submit"
                        disabled={
                          showErrorMessage ||
                          inputValue === "" ||
                          parseFloat(inputValue) === 0 || //
                          parseFloat(inputValue) > parseFloat(isValorMargem)
                        }
                      >
                        {t("Application_confirm")} <i className="fa fa-check-circle-o"></i>
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer className="bg-dark">
                    <Button variant="dark" onClick={handleClose}>
                      Fechar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomBar selectedIcon="markets" />

    </>
  );
}

export default Exchange;

