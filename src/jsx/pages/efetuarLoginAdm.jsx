import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../services/index";
import { useDispatch } from "react-redux";
import { User } from "../store/User/User.action";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OrderModal from "../element/Ordermodal";
import { createUser } from "../store/Create/Create.action";
import LanguageSelect from "../element/languageSelect";
import CheckPopupLogin from "../element/CheckPopupLogin";
import "../../css/login/login.css";
import LogoHeader from "../../images/brand/logoHeader.png";
import ButtonPrimary from "../../components/button/primary";
import { ButtonSubmit } from "../../components/button/submit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Signin() {
    const parametros = useParams();
    const [login, setLogin] = useState(parametros.usuario);
    const [password, setPassword] = useState(parametros.password);
    const [show, setShow] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hashUser, setHashUser] = useState("");
    const [operationProps] = useState({});
    const [dispatchUser, setDispatchUser] = useState();
    const [disabledButton, setDisabledButton] = useState(true);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setDisabledButton(true);
            const user = (await axios.post("/loginAdm", { login, password })).data;
            if (user.Error) {
                operationProps.operationStatus = false;
                operationProps.header = t("Login Error");
                operationProps.body = `${t(user.Error)}`;
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 6000);
            } else {
                if (user.emailValidate) {
                    if (user.IsAuth != 0) {
                        setHashUser(user.authKey);
                        setDispatchUser(user);
                        setShowPopup(true);
                    } else {
                        dispatch(User(user));
                        history.push("/dashboard");
                    }
                } else {
                    dispatch(createUser(user));
                    history.push("/confirmEmail");
                }
            }
        } catch (err) {
            operationProps.operationStatus = false;
            operationProps.header = t("Login Error");
            operationProps.body = `${t("An error has occurred. Please try again.")}`;
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 6000);
            console.log(err);
        }
        setDisabledButton(false);
    };

    const checkValue = async (email, pass) => {
        setLogin(email);
        setPassword(pass);
        if (email != undefined && email != "" && pass != undefined && pass != "") {
            //if (pass.length >= 6 && validateEmail(email)) {
            if (pass.length >= 6) {
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        } else {
            setDisabledButton(true);
        }
    };



    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <>
            <OrderModal show={show} operationProps={operationProps} />
            <CheckPopupLogin
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                user={hashUser}
                history={history}
                dispatchUser={dispatchUser}
                dispatch={dispatch}
            />

            <div className="body-login">
                <div className="background-login">
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
                        <div className="card-content">
                            <div className="mb-5 icon-back">
                                <Link to={"/"}>
                                    <ArrowBackIcon />
                                </Link>
                            </div>
                            <div
                                class="card-login-header justify-content-left"
                                style={{ background: "none !important" }}
                            >
                                <h2 class="card-title">{t("Sign in")}</h2>
                            </div>
                            <form
                                method="post"
                                name="myform"
                                class="signin_validate"
                                onSubmit={handleSubmit}
                            >
                                <div class="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder={t("Enter your email")}
                                        name="login"
                                        maxlength="64"
                                        value={login}
                                        onChange={(e) =>
                                            checkValue(e.target.value.replace(" ", ""), password)
                                        }
                                        readOnly="true"
                                        disabled="true"
                                    />
                                </div>
                                <div class="form-group">
                                    
                                    <input
                                        type="hidden"
                                        class="form-control"
                                        placeholder={t("Password")}
                                        name="password"
                                        maxlength="32"
                                        value={password}
                                        onChange={(e) =>
                                            checkValue(login, e.target.value.replace(" ", ""))
                                        }
                                    />
                                </div>
                                <div class="form-row d-flex w-100 justify-content-between mt-4 mb-2">
                                    <div class="form-group mb-0">
                                        
                                    </div>
                                    
                                </div>
                                <div class="text-center mt-4">
                                    <ButtonSubmit >
                                        {t("Sign in")}
                                    </ButtonSubmit>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signin;
