import React, { useState, useEffect } from "react";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar/sidebar";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import axios from "../../services";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BottomBar from "../layout/sidebar/bottom-bar";
import { Dialog } from '@mui/material';
import { Button } from 'react-bootstrap';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'

function AccountDeposit() {
  const history = useHistory()
  const { t } = useTranslation();
  const [Payment, setPayment] = useState([]);
  const parametros = useParams();
  const [ContratoAtual] = useState(parametros.code);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch()

  const getPaymentDados = async () => {
    try {
      const Payment = (await axios.get(`/payment/code/` + ContratoAtual)).data;
      //console.log(prices)
      setPayment(Payment);
      return Payment;
    } catch (err) {
      return err.message;
    }
  };

  const [text, setText] = useState("");
  const [operationProps] = useState({});
  const [show, setShow] = useState(false);

  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const copy = async () => {

    await navigator.clipboard.writeText(text);
    //console.log(Payment.qrcodeimage)
    window.alert("Pix Copia e Cola, foi transferido com sucesso para sua área de trabalho")

  };

  function handleClick() {
    history.push('/user/mydocuments');
  }
  

  useEffect(async () => {
    getPaymentDados();

  }, []);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    window.location.href = '/deposit';
  };


  useEffect(async() => {
    if (Payment.status == "101") {
      setDialogOpen(true);
    }
  })

  useEffect(async () => {
    const interval = setInterval(async () => {
      await getPaymentDados();
    }, 5000);
    return () => {
      clearInterval(interval);
    };

  }, []);


  return (
    <>

      <Dialog className='dialog' open={isDialogOpen} onClose={closeDialog}>
        <div className='dialog-content'>
          <DialogTitle> {
            <div >
              <h2 className='text-success'>Deposito confirmado <i className="fa fa-thumbs-up"></i></h2>
              <div>Seu pagamento via {Payment.type} no valor de {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Payment.valueUsd)} foi confirmado com sucesso.
                           </div>
            </div>}
          </DialogTitle>
          <DialogActions>

            <Button onClick={closeDialog}
              color="success" autoFocus>
              Obrigado.
            </Button>
          </DialogActions>
        </div>
      </Dialog>


      <Header2 title={t("Payment details") + " #" + Payment.code} />
      <Sidebar selectedItem="deposito-fiat" />
      <div class="content-body">
        <div class="container">

          <div className={"row"}>
            <div className={"col-md-3"}>
              <div
                className="card"
                style={{
                  minHeight: "272px",
                  padding: "10px 10px 10px 10px",
                  backgroundColor: "#ffffff",
                }}
              >
                <QRCode
                  title="GeeksForGeeks"
                  value={`${Payment.qrcodeimage}`}
                  size={"100%"}
                />
              </div>
            </div>
            <div className={"col-md-9"}>
              <div className="card">
                <table className="table">
                  <thead>
                    <tr>
                      <td>
                        <strong>#</strong>
                      </td>
                      <td className="text-center">
                        <strong>{t("Description")}</strong>
                      </td>
                      <td className="text-center">
                        <strong>{t("Size")}</strong>
                      </td>
                      <td className="text-right">
                        <strong>{t("Value")}</strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{Payment.code}</td>
                      <td className="text-center">{t('Deposit_Request') + " " + Payment.code}</td>
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
                      <td className="thick-line text-center">
                        <strong>Total USD</strong>
                      </td>
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
                      <td className="no-line text-center">
                        <strong>Total USD $</strong>
                      </td>
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
            <div className={"col-md-12"}>
              <div className="card">
                <div className={"card-body"}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control border-primary"
                      value={Payment.qrcodeimage}
                      id={"codeqr"}
                      onChange={inputHandler}
                      onBlur={inputHandler}
                      onFocus={inputHandler}
                      onClick={copy}
                      style={{ fontSize: "10px" }}
                    />

                  </div>
                  <small className="center">Clique na caixa do texto para copiar o CÓD PIX</small>
                  <div>
                    <button className="btn btn-success btn-block mt-4"
                      onClick={handleClick}
                    >
                      Enviar Comprovante.
                    </button>
                  </div>
                  {
                    /* <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-primary"
                        value={Payment.confirmationurl}
                      />
                      <div className="input-group-append">
                        <a
                          className="input-group-text bg-primary text-white"
                          target="_blank"
                          href={Payment.confirmationurl}
                        >
                          {t("Confirmation URL")}
                        </a>
                      </div>
                    </div> */
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default AccountDeposit;
