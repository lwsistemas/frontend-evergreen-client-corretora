import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CoinTypeSelect from "./CoinTypeSelect";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertaCom() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [showAlerta, setShow] = useState(true);
  let status = user.status;

  if (status == 0) {
    /*
        * <div className="card-body" id="Mdiv">
                        <div className="alert alert-danger text-center">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                            <h3 style={{color: '#000000'}}>


                                {t('Application_ContaSemVerificacao')}
                                <br/>
                                <Link to={'/user/mydocuments'} class="btn btn-outline-warning">
                                    {t('Application_EnviarDocumentos')} &nbsp;<i
                                    className='fa fa-upload'></i>
                                </Link>

                            </h3>

                        </div>
                    </div>
                    *
                    *
                    * */

    return (
      <>
        <Alert show={showAlerta} variant="danger" className="center">
          <Alert.Heading>
            <h2 class={"text-danger"}>
              {t("Apllication_verificacaoConta")}{" "}
              <i class="mdi mdi-close-circle"></i>
            </h2>
          </Alert.Heading>

          <hr />
          <h5 class={"text-danger"}>{t("Application_ContaSemVerificacao")}</h5>

          <div className="align-content-center">
            <Link to={"/user/mydocuments"} class="btn btn-outline-warning">
              {t("Application_EnviarDocumentos")} &nbsp;
              <i className="fa fa-upload"></i>
            </Link>
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-danger">
              Fechar Alerta
            </Button>
          </div>
        </Alert>

        {!showAlerta && (
          <Button onClick={() => setShow(true)}>Mostrar Alerta</Button>
        )}
      </>
    );
  } else if (status == 2) {
    return (
      <div className="card-body" id="Mdiv">
        <div className="alert alert-warning text-center">
          <h5 style={{ color: "orange" }}>
            {t("Application_ContaAwaiterificada")} <i class="fa fa-warning"></i>
          </h5>
        </div>
      </div>
    );
  }
  else if (status == 10 ||  status == 11 || status == 12) {
    return (
      <div className="card-body" id="Mdiv">
        <div className="alert alert-warning text-center">
          <h5 style={{ color: "orange" }}>
            {t("Application_UserSuspense")} <i class="fa fa-warning"></i>
          </h5>
        </div>
      </div>
    );
}

  else if (status == 1) {
    return (
      <span></span>
    );
  } else {
    return (
      <>
        <Alert show={showAlerta} variant="danger" className="center">
          <Alert.Heading>
            <h2 class={"text-danger"}>
              {t("Apllication_verificacaoConta")}{" "}
              <i class="mdi mdi-close-circle"></i>
            </h2>
          </Alert.Heading>

          <hr />
          <h5 class={"text-danger"}>{t("Application_ContaSemVerificacao")}</h5>

          <div className="align-content-center">
            <Link to={"/user/mydocuments"} class="btn btn-outline-warning">
              {t("Application_EnviarDocumentos")} &nbsp;
              <i className="fa fa-upload"></i>
            </Link>
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-danger">
              Fechar Alerta
            </Button>
          </div>
        </Alert>

        {!showAlerta && (
          <Button onClick={() => setShow(true)}>Mostrar Alerta</Button>
        )}
      </>
    );
  }
}

export default AlertaCom;
