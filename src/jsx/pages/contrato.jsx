import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../layout/header2";
import { useTranslation } from "react-i18next";
import axios from "../../services";
import parse from "html-react-parser";
import Moment from "react-moment";
import jsPDF from "jspdf";
import "../../css/contrato.css";
import { Dialog } from "@mui/material";
import { DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Card, Form, Col } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { useSelector, useDispatch } from "react-redux";
import { User } from '../store/User/User.action'

function Contrato() {
  const defaultImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAADICAYAAAAeGRPoAAAAAXNSR0IArs4c6QAACHNJREFUeF7t1QENAAAIwzDwbxodLMXBe5LvOAIECBAgQOC9wL5PIAABAgQIECAwBt0TECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBAy6HyBAgAABAgEBgx4oUQQCBAgQIGDQ/QABAgQIEAgIGPRAiSIQIECAAAGD7gcIECBAgEBAwKAHShSBAAECBAgYdD9AgAABAgQCAgY9UKIIBAgQIEDAoPsBAgQIECAQEDDogRJFIECAAAECBt0PECBAgACBgIBBD5QoAgECBAgQMOh+gAABAgQIBAQMeqBEEQgQIECAgEH3AwQIECBAICBg0AMlikCAAAECBA71UQDJ6RV1xQAAAABJRU5ErkJggg==";

  const user = useSelector((state) => state.user);
  const [firstName, setFirsName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const parametros = useParams();
  const [ContratoAtual] = useState(parametros.idContract);
  const [contract, setContract] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [erroFirstName, setErroFirstName] = useState(false);
  const [erroSecondName, setErroSecondName] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSignature, setErroSignature] = useState(false);
  const [messageFirstName, setMessageFirstName] = useState("");
  const [messageSecondName, setMessageSecondName] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageSignature, setMessageSignature] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [firstAcess, setFirstAcess] = useState(true);
  const dispatch = useDispatch()

  let signatureImage = defaultImage;
  // const doc = new jsPDF();
  const reportTemplateRef = useRef(null);
  const signatureCanvasRef = useRef();

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "cm",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal", "12px");
    doc.setFontSize("10px");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save(contract.description);
      },
    });
  };

  const getContract = async () => {
    try {
      const contract = (await axios.get(`/contract/` + ContratoAtual)).data;
      setContract(contract);

      return contract;
    } catch (err) {
      return err.message;
    }
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const closeDialogCongratulation = () => {
    setDialogOpen(false);
    window.location.href = '/contratos';
  };

  const validateData = async () => {
    let firstNameValid = false;
    let secondNameValid = false;
    let emailValid = false;
    let signatureValid = false;

    // if (handleFirstName() == false) {
    //     setErroFirstName(true);
    //     setMessageFirstName("Nome obrigatório")
    // } else {
    //     setErroFirstName(false);
    //     firstNameValid = true
    // }

    // if (handleSecondName() == false) {
    //     setErroSecondName(true);
    //     setMessageSecondName("Sobrenome obrigatório")
    // } else {
    //     setErroSecondName(false);
    //     secondNameValid = true
    // }

    // if (handleEmail() == false) {
    //     setErroEmail(true);
    //     setMessageEmail("E-mail obrigatório")
    // } else {
    //     setErroEmail(false);
    //     emailValid = true
    // }
    if (handleSignature() == false) {
      setErroSignature(true);
      setMessageSignature(t("Mandatory_Assignment"));
    } else {
      setErroSignature(false);
      signatureValid = true;
    }
    if (
      // firstNameValid == true &&
      // secondNameValid == true &&
      // emailValid == true &&
      signatureValid == true
    ) {
      await handleSubmitData(signatureImage);
    }
  };

  const handleSubmitData = async (signature) => {
    const request = {
      authKey: user.authKey,
      // firstName: firstName,
      // secondName: secondName,
      // email: email,
      signature: signature,
      contractId: contract.id,
    };
    console.log(request);
    try {
      await axios.put(`/contract/${contract.hash}`, request);
      setErroSignature(false);
      setIsSigned(true);
      // closeDialog()
    } catch (error) {
      setErroSignature(true);
      setMessageSignature(t("Incorrect_Data"));
      console.log(error);
    }
  };

  // const handleFirstName = () => {
  //     if (firstName == "") {
  //         return false
  //     } else {
  //         return true
  //     }
  // }

  // const handleSecondName = () => {
  //     if (secondName == "") {
  //         return false
  //     } else {
  //         return true
  //     }
  // }

  // const handleEmail = () => {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (email == "" && firstAcess == true) {
  //         setErroEmail(false);
  //         return false
  //     } else {
  //         if (emailRegex.test(email)) {
  //             setErroEmail(false);
  //             return true
  //         } else {
  //             setErroEmail(true);
  //             setMessageEmail("Inserir e-mail válido")
  //             return false
  //         }
  //     }
  // }

  const handleSignature = () => {
    if (signatureCanvasRef.current) {
      signatureImage = signatureCanvasRef.current.toDataURL();
      if (signatureImage == defaultImage) {
        return false;
      } else {
        return true;
      }
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
  }, [])

  useEffect(() => {
    //console.log("fez requisição");
    getContract();
  }, [isDialogOpen]);

  // useEffect(() => {
  //     handleFirstName()
  //     setFirstAcess(false)
  // }, [firstName])

  // useEffect(() => {
  //     handleSecondName()
  //     setFirstAcess(false)
  // }, [secondName])

  // useEffect(() => {
  //     handleEmail()
  //     setFirstAcess(false)
  // }, [email])

  useEffect(() => { }, [isSigned]);

  document.title = contract.description + contract.id

  return (
    <>

      <div className="content-body">
        <div className="container">
          <h1>{contract.description}</h1>
          <h3>{t("Contract_N") + " " + contract.id}</h3>
          <div class={"row"}>
            <div className={"col-md-8"}>
              <div ref={reportTemplateRef}>
                <div
                  className={"text-justify"}
                  style={{ fontSize: "12px", margin: "10px 10px 10px 10px" }}
                >
                  {parse(`${contract.content}`)}
                </div>
              </div>
            </div>
            <div className={"col-md-4"}>
              <div># {t("Contract number") + ": " + contract.id}</div>
              <h4>
                {" "}
                {t("Contract value") +
                  ": " +
                  Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(contract.contract_value)}
              </h4>
              <div>
                {t("Start Date")}:{" "}
                <Moment format="DD/MM/YYYY">{contract.dataInicial}</Moment>
              </div>
              <div>
                {t("Final Date")}:{" "}
                <Moment format="DD/MM/YYYY">{contract.dataFinal}</Moment>
              </div>
              <div>{t("Type of contract")}:</div>
              {/* <button
                className="button generate-pdf"
                onClick={handleGeneratePdf}
              >
                {t("Generate PDF")}
              </button> */}
              {contract.signed == 0 ? (
                <button className="button sign" onClick={openDialog}>
                  {t("Sign")}
                </button>
              ) : (
                <button className="button">{t("Application_Assinado")}</button>
              )}
              <Dialog
                className="dialog"
                open={isDialogOpen}
                onClose={closeDialog}
              >
                <div className="dialog-content">
                  <DialogTitle>
                    {" "}
                    {isSigned == false ? (
                      <div>{t("Application_Assinatura")}</div>
                    ) : (
                      <div>
                        <h2 className="text-success">{t("Congratulations")}</h2>
                        <div>
                          {contract.description +
                            " " +
                            t("Application_Assinado_Sucesso")}
                        </div>
                      </div>
                    )}
                  </DialogTitle>
                  <DialogContent>
                    {isSigned == false ? (
                      <Form>
                        {/* <Form.Group controlId="formGridFirsName">
                                                        <Form.Label>{"Nome"}</Form.Label>
                                                        <Form.Control type="text" value={firstName} onChange={e => setFirsName(e.target.value)} />
                                                        <div className={"text-danger " + (!erroFirstName ? "d-none" : "")}>
                                                            {messageFirstName}
                                                        </div>
                                                    </Form.Group> */}
                        {/* <Form.Group controlId="formGridFirsName">
                                                        <Form.Label>{"Sobrenome"}</Form.Label>
                                                        <Form.Control type="text" value={secondName} onChange={e => setSecondName(e.target.value)} />
                                                        <div className={"text-danger " + (!erroSecondName ? "d-none" : "")}>
                                                            {messageSecondName}
                                                        </div>
                                                    </Form.Group> */}
                        {/* <Form.Group controlId="formGridFirsName">
                                                        <Form.Label>{"E-mail"}</Form.Label>
                                                        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                                        <div className={"text-danger " + (!erroEmail ? "d-none" : "")}>
                                                            {messageEmail}
                                                        </div>
                                                    </Form.Group> */}
                        <SignatureCanvas
                          ref={signatureCanvasRef}
                          penColor="#a19fa7"
                          canvasProps={{
                            width: 500,
                            height: 200,
                            className: "sigCanvas",
                          }}
                        />
                        <div
                          className={
                            "text-danger " + (!erroSignature ? "d-none" : "")
                          }
                        >
                          {messageSignature}
                        </div>
                      </Form>
                    ) : null}
                  </DialogContent>
                  <DialogActions>
                    {isSigned == false ? (
                      <Button onClick={validateData} color="primary" autoFocus>
                        {t("Sign")}
                      </Button>
                    ) : null}
                    <Button onClick={isSigned == false ? closeDialog : closeDialogCongratulation} color="primary" autoFocus>
                      {isSigned == false
                        ? t("Cancel")
                        : t("Application_Fechar")}
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contrato;
