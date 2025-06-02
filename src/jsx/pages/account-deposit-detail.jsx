import React, { useState, useEffect } from "react";
import Header2 from "../pages/home/HeaderMenu";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import axios from "../../services";
import { useParams, useHistory } from "react-router-dom";
import BottomBar from "../layout/sidebar/bottom-bar";
import { Dialog } from "@mui/material";
import { Button } from "react-bootstrap";
import { DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import Moment from "react-moment";
import { isIOS, isAndroid } from "react-device-detect";


function AccountDeposit() {
  const history = useHistory();
  const { t } = useTranslation();
  const [Payment, setPayment] = useState([]);
  const [PaymentDeposit, setPaymentDeposit] = useState([]);
  const parametros = useParams();
  const [ContratoAtual] = useState(parametros.code);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    setAlertMessage("Texto copiado para a área de transferência");

    // Limpa a mensagem de alerta após 3 segundos
    setTimeout(() => {
      setAlertMessage("");
    }, 4000);
  };

  const handleCopyClick = (text) => {
    copyToClipboard(text);
  };

  const getPaymentDados = async () => {
    try {
      const Payment = (await axios.get(`/payment/code/` + ContratoAtual)).data;
      setPayment(Payment);
      return Payment;
    } catch (err) {
      return err.message;
    }
  };

  const getPaymentDeposit = async () => {
    try {
      const response = (await axios.post(`payment/wallet/business`)).data;
      setPaymentDeposit(response);
      return response;
    } catch (err) {
      return err.message;
    }
  };

  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const copy = async () => {
    const textToCopy = text;

    if (isIOS || isAndroid) {
      // Se for um dispositivo iOS ou Android, use a API Clipboard da Web
      try {
        await navigator.clipboard.writeText(textToCopy);
        setAlertMessage("Texto copiado para a área de transferência");
      } catch (error) {
        setAlertMessage("Erro ao copiar o texto para a área de transferência");
      }
    } else {
      // Para outros dispositivos, utilize a abordagem anterior
      const textField = document.createElement("textarea");
      textField.value = textToCopy;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setAlertMessage("Texto copiado para a área de transferência");
    }

    // Limpa a mensagem de alerta após 3 segundos
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };


  function handleClick() {
    history.push("/user/mydocuments");
  }

  useEffect(async () => {
    await getPaymentDados();
    await getPaymentDeposit();
  }, []);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    let isMounted = true; // Variável para verificar se o componente está montado

    const fetchData = async () => {
      try {
        const paymentData = await getPaymentDados();

        if (isMounted) {
          setPayment(paymentData);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err.message);
        }
      }
    };

    if (Payment.status !== "102") {
      const interval = setInterval(fetchData, 5000);

      return () => {
        isMounted = false; // Define o componente como desmontado
        clearInterval(interval); // Limpa o intervalo para interromper as chamadas futuras
      };
    }

    return () => {
      isMounted = false; // Define o componente como desmontado
    };
  }, [Payment.status]);


  return (
    <>
      <Header2 title={t("Payment details") + " #" + Payment.code} />

      <div className="content-body">
        <div className="container-fluid h-100">
          <div className="card">
            <div className="card-body">
              <div className="invoice">
                <div className="invoice-header">
                  <h2>{t("Payment details") + " #" + Payment.code}</h2>
                  <h4 className="text-primary">Pagamento por {Payment.type === "pix" ? "PIX" : "Depósito Bancário"}</h4>
                </div>
                <div className="invoice-details">
                  <p>{t("Application_InvoiceNumber")}: #{Payment.code}</p>
                  <p>
                    {t("Application_InvoiceDate")}: <Moment format="DD/MM/YYYY HH:mm">{Payment.createdAt}</Moment>
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-4 col-lg-2">
                    <div className="card">
                      {Payment.type === "pix" ? (
                        <>
                          <div className="qr-code">
                            <QRCode title="GeeksForGeeks" value={`${Payment.qrcodeimage}`} style={{ width: "100%" }} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="card-dadosBancarios dadosBancarios">
                            <div className="dadosBancariosItem">
                              <span>FAV: {PaymentDeposit.RAZAOSOCIAL}</span>
                              <div className="copyDados" onClick={() => handleCopyClick(PaymentDeposit.RAZAOSOCIAL)}>
                                <i className="fa fa-copy"></i>
                              </div>
                            </div>
                            <div className="dadosBancariosItem">
                              <span>CNPJ: {PaymentDeposit.CNPJ}</span>
                              <div className="copyDados" onClick={() => handleCopyClick(PaymentDeposit.CNPJ)}>
                                <i className="fa fa-copy"></i>
                              </div>
                            </div>
                            <div className="dadosBancariosItem">
                              <span>AG: {PaymentDeposit.agencia}</span>
                              <div className="copyDados" onClick={() => handleCopyClick(PaymentDeposit.agencia)}>
                                <i className="fa fa-copy"></i>
                              </div>
                            </div>
                            <div className="dadosBancariosItem">
                              <span>CC: {PaymentDeposit.conta}</span>
                              <div className="copyDados" onClick={() => handleCopyClick(PaymentDeposit.conta)}>
                                <i className="fa fa-copy"></i>
                              </div>
                            </div>
                            <div className="dadosBancariosItem">
                              <span>BANCO/COD: {PaymentDeposit.banco + "(" + PaymentDeposit.COD + ")"}</span>
                              <div className="copyDados" onClick={() => handleCopyClick(PaymentDeposit.banco + "(" + PaymentDeposit.COD + ")")}>
                                <i className="fa fa-copy"></i>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-10">
                    <div className="card">
                      <div className="table-responsive">
                        <table className="invoice-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th className="text-center">{t("Description")}</th>
                              <th className="text-center">{t("Size")}</th>
                              <th className="text-right">{t("Value")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{Payment.code}</td>
                              <td className="text-center">{t("Deposit_Request")} {Payment.code}</td>
                              <td className="text-center">1</td>
                              <td className="text-right">
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                  currencySign: "accounting",
                                }).format(Payment.value)}
                              </td>
                            </tr>
                            <tr>
                              <td className="thick-line"></td>
                              <td className="thick-line"></td>
                              <td className="thick-line text-center">Total USD</td>
                              <td className="thick-line text-right">
                                {Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(Payment.valueUsd)}
                              </td>
                            </tr>
                            <tr>
                              <td className="no-line"></td>
                              <td className="no-line"></td>
                              <td className="no-line text-center">Total USD $</td>
                              <td className="no-line text-right">
                                <h4 className="m-0">
                                  Total:{" "}
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(Payment.valueUsd)}
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {Payment.type === "pix" ? (
                    <>
                      <div className="col-md-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control border-primary"
                                value={Payment.qrcodeimage}
                                id="codeqr"
                                onChange={inputHandler}
                                onBlur={inputHandler}
                                onFocus={inputHandler}
                                onClick={copy}
                                style={{ fontSize: "10px" }}
                                readOnly={false}
                              />


                            </div>

                            <div className="invoice-header" style={{color: '#000'}}>  
                                  <p>Chave PIX: Aleatória - 17f2d28f-3ad9-4172-aaf0-ba5d55b749d6</p>
                                  <p>Razão Social: Convert Serviços Digitais LTDA </p>
                            </div>


                            <div className="center">Clique na caixa do texto para copiar o CÓD PIX</div>
                            <button className="btn btn-outline-primary mr-2" onClick={copy}>Copiar Pix Copia & Cola</button>
                            <button className="btn btn-outline-primary" onClick={handleClick}>Enviar Comprovante</button>
                          </div>
                        </div>


                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row">
                        <div className="card">
                          <div className="card-body">
                            <button className="btn btn-outline-primary" onClick={handleClick}>Enviar Comprovante</button>
                          </div>
                        </div>
                      </div>


                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <BottomBar />
      <Dialog className="dialog" open={isDialogOpen} onClose={closeDialog}>
        <div className="dialog-content">
          <DialogTitle>
            <div>
              <h2 className="text-success">Deposito confirmado <i className="fa fa-thumbs-up"></i></h2>
              <div>Seu pagamento via {Payment.type} no valor de {Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Payment.valueUsd)} foi confirmado com sucesso.</div>
            </div>



          </DialogTitle>
          <DialogActions>

            <Button onClick={closeDialog}
              color="success" autoFocus>
              Obrigado.
            </Button>
          </DialogActions>
        </div>
      </Dialog>


    </>
  );
}

export default AccountDeposit;
