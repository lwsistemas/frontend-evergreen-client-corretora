import React, { } from 'react';
import { Link } from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from "../pages/home/HeaderMenu";
import Footer2 from '../layout/footer2';
import { useTranslation } from "react-i18next";
import "../../css/login/login.css";
import LogoHeader from "../../images/brand/logoHeader.png";


function AccountApi() {
    const { t } = useTranslation();
    return (
        <>
            <Header2 />


            <div className="body-login">
                <div className="painel-login">
                    <div className="content-banner">
                        <div
                            className="col-xl-12"
                            style={{
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Link to={"/"}>
                                <img
                                    src={LogoHeader}
                                    style={{
                                        width: 200,
                                        maxHeight: "auto",
                                    }}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                    </div>


                    <div className="centered-container">
                        <h3>{t("Application_MsgErroPagina")}</h3>
                        <div>
                            <Link className="btn btn-dark" to={"/dashboard"}>
                                <i className="mdi mdi-login-variant"></i>{" "}
                                {t("Application_Voltar")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer2 />
        </>
    )
}

export default AccountApi;