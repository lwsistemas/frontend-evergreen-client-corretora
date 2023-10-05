import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../store/User/User.action";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Row, Col, Card, Nav, Tab, Navbar, NavDropdown } from "react-bootstrap";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar/sidebar";
import BottomBar from "../layout/sidebar/bottom-bar";
import axios from "../../services";
import ButtonsTickets from "../element/ButtonsTickets";
import Table from "react-bootstrap/Table";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

function SuporteTicket() {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const user = useSelector((state) => state.user);
  const [assunto, setAssunto] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [file, setFile] = useState(null);
  const [erroConteudo, setErroConteudo] = useState(false);
  const [erroAssunto, setErroAssunto] = useState(false);
  const [erroDepartamento, setErroDepartamento] = useState(false);
  const [erroPrioridade, setErroPrioridade] = useState(false);
  const [erroFile, setErroFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledbutton, setDisabledbutton] = useState(true);

  const dispatch = useDispatch();

  const validateData = (e) => {
    e.preventDefault();

    // Reset error states
    setErroAssunto(false);
    setErroDepartamento(false);
    setErroPrioridade(false);
    setErroConteudo(false);
    setErroFile(false);

    let isValid = true;


    // Perform field validations
    if (!assunto.trim()) {
      setErroAssunto(true);
      isValid = false;
    }
    if (!departamento) {
      setErroDepartamento(true);
      isValid = false;
    }
    if (!prioridade) {
      setErroPrioridade(true);
      isValid = false;
    }
    if (!conteudo.trim()) {
      setErroConteudo(true);
      isValid = false;
    } else { }
    // if (!file) {
    //   setErroFile(true);
    // }

    // If any field has an error, do not submit the form
    if (!isValid) {

      return;
    }

    // Continue with form submission

    setDisabledbutton(true);
    handleSubmitData();

  };

  const handleSubmitData = async () => {
    const request = {
      UID: user.id,
      uidnome: user.firstName + " " + user.secondName,
      authKey: user.authKey,
      departamento: departamento,
      assunto: assunto,
      prioridade: prioridade,
      pergunta: conteudo,
      arquivo: file,
    };
    try {
      const response = (await axios.post("/tickets/create", request)).data;
      setLoading(true)
      console.log(response)
      if(response.success === true){
        window.location.href = '/support';
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const validUser = async () => {
    try {
      const valid = await axios.put("user/validUser", {
        authKey: user.authKey,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status && error.response.status === 406) {
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

  useEffect(() => {
    validUser();
  }, []);

  return (
    <>
      <Header2 title={t("New_Support_Ticket")} />
      <Sidebar selectedItem={"suporte"} />
      <div className="content-body">
        <div className="container">
          <div>
            <ButtonsTickets />
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h3>{t("New_Support_Ticket")}</h3>
                </div>
              </div>
            </div>

            <form method="post" name="myform" className="currency_validate" onSubmit={validateData}>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <label className="mr-sm-2">
                          {t("Application_Assunto")}
                        </label>
                        <input
                          type="text"
                          name="assunto"
                          className="form-control"
                          required={true}
                          onChange={(e) => {
                            setAssunto(e.target.value);
                            setErroAssunto(false); // Clear the error when changing the value
                          }}
                        />
                        {erroAssunto && <p className="text-danger">{t("Assunto_Required_Error")}</p>}
                      </div>

                      <div className="col-md-6">
                        <label className="mr-sm-2">
                          {t("Application_Departamento")}
                        </label>
                        <div className="input-group mb-3">
                          <select
                            name="departamento"
                            className="form-control"
                            onChange={(e) => {
                              setDepartamento(e.target.value);
                              setErroDepartamento(false);
                            }}
                          >
                            <option value="">
                              {t("Select_Departamento")}
                            </option>
                            <option value="1">{t("Application_Financeiro")}</option>
                            <option value="2">{t("Application_Administracao")}</option>
                            <option value="3">{t("Application_Compilance")}</option>
                            <option value="4">{t("Application_Supporte")}</option>
                          </select>
                        </div>
                        {erroDepartamento && <p className="text-danger">{t("Departamento_Required_Error")}</p>}
                      </div>

                      <div className="col-md-6">
                        <label className="mr-sm-2">
                          {t("Application_Prioridade")}
                        </label>
                        <div className="input-group mb-3">
                          <select
                            name="prioridade"
                            className="form-control"
                            onChange={(e) => {
                              setPrioridade(e.target.value);
                              setErroPrioridade(false)
                            }}
                          >
                            <option value="">
                              {t("Select_Prioridade")}
                            </option>
                            <option value="1">{t("Application_Baixa")}</option>
                            {/* Add more priority options here */}
                          </select>
                        </div>
                        {erroPrioridade && <p className="text-danger">{t("Prioridade_Required_Error")}</p>}
                      </div>

                      <div className="col-md-12">
                        <label className="mr-sm-2">
                          {t("Application_Conteudo")}
                        </label>
                        <textarea
                          className="form-control"
                          name="conteudo"
                          id="conteudo"
                          cols="30"
                          rows="10"
                          required={true}
                          onChange={(e) => {
                            const conteudoValue = e.target.value;
                            setConteudo(conteudoValue);

                            if (conteudoValue.trim() === '') {
                              setErroConteudo(true);
                              setDisabledbutton(true);
                            } else if (conteudoValue.length < 1) {
                              setErroConteudo(false);
                              setDisabledbutton(true);
                            } else {
                              setErroConteudo(false);
                              setDisabledbutton(false);
                            }
                          }}
                        />
                        {erroConteudo && <p className="text-danger">{t("Conteudo_Required_Error")}</p>}
                      </div>

                      <div className="col-md-12 mt-

3">
                        <label className="mr-sm-2">
                          {t("Application_Anexar_Arquivo")}
                        </label>
                        <input
                          type="file"
                          name="file"
                          id=""
                          className="btn btn-primary"
                          onChange={(e) => {
                            const fileValue = e.target.value;
                            setFile(fileValue);}}

                        />
                        {erroFile && <p className="text-danger">{t("File_Required_Error")}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <button
                    type="submit"
                    className="btn btn-success form-control"
                    onClick={validateData}
                    disabled={disabledbutton}                  >
                    {loading ? t("Sending_Request") : t("Send_Request_Support")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar selectedIcon={"suporte"} />
    </>
  );
}

export default SuporteTicket;
