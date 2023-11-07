import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/index";
import { useSelector, useDispatch } from "react-redux";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Signin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hashUser, setHashUser] = useState("");
  const [operationProps] = useState({});
  const [dispatchUser, setDispatchUser] = useState();
  const [disabledButton, setDisabledButton] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userLoginError, setUserLoginError] = useState(null); // Estado para controlar o erro de login
  const userLogin = useSelector((state) => state.user);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("savedLogin", login);
      localStorage.setItem("savedPassword", password);
    }

    try {
      setDisabledButton(true);
      const user = (await axios.post("/login", { login, password })).data;
      if (user.Error) {
        operationProps.operationStatus = false;
        operationProps.header = t("Login Error");
        operationProps.body = `${t(user.Error)}`;
        setShow(true);
        setUserLoginError(user.Error); // Define o erro de login
        setTimeout(() => {
          setShow(false);
          setDisabledButton(false); // Destrava o botão em caso de erro
        }, 6000);
      } else {
        dispatch(User(user));
        history.push("/dashboard");
      }
    } catch (err) {
      operationProps.operationStatus = false;
      operationProps.header = t("Login Error");
      operationProps.body = `${t("An error has occurred. Please try again.")}`;
      setShow(true);
      setDisabledButton(false); // Destrava o botão em caso de erro
      setTimeout(() => {
        setShow(false);
      }, 6000);
      console.log(err);
    }
  };

  const checkValue = async (email, pass) => {
    setLogin(email);
    setPassword(pass);
    if (email !== undefined && email !== "" && pass !== undefined && pass !== "") {
      if (pass.length >= 6) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  };

  const handleRememberMeClick = () => {
    if (!rememberMe) {
      localStorage.removeItem("savedLogin");
      localStorage.removeItem("savedPassword");
    }
    setRememberMe(!rememberMe);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const savedLogin = localStorage.getItem("savedLogin");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedLogin && savedPassword) {
      setLogin(savedLogin);
      setPassword(savedPassword);
      setRememberMe(true);
      setDisabledButton(false);
    }
  }, []);

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

          {userLogin === null ? (
            <>

              <div className="card-content">
                <div className="mb-5 icon-back">
                  <Link to={"/"}>
                    <ArrowBackIcon />
                  </Link>
                </div>
                <div
                  className="card-login-header justify-content-left"
                  style={{ background: "none !important" }}
                >
                  <h2 className="card-title">{t("Sign in")}</h2>
                </div>
                <form
                  method="post"
                  name="myform"
                  className="signin_validate"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("Enter your email")}
                      name="login"
                      maxLength="64"
                      value={login}
                      onChange={(e) =>
                        checkValue(e.target.value.replace(" ", ""), password)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>{t("Password")}</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder={t("Password")}
                        name="password"
                        maxLength="32"
                        value={password}
                        onChange={(e) =>
                          checkValue(login, e.target.value.replace(" ", ""))
                        }
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                    </div>

                  </div>
                  {userLoginError && (
                    <div className="alert alert-danger">{t(userLoginError)}</div>
                  )}
                  <div className="form-row d-flex w-100 justify-content-between mt-4 mb-2">
                    <div className="form-group mb-0">
                      <label className="toggle">
                        <input
                          className="toggle-checkbox"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={handleRememberMeClick}
                        />
                        <span
                          style={{ border: "1px solid #9396a2" }}
                          className="toggle-switch"
                        ></span>
                        <span className="toggle-label">{t("Remember me")}</span>
                      </label>
                    </div>
                    <div className="form-group mb-0">
                      <Link to={"./forgot"}>{t("Forgot Password?")}</Link>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <ButtonSubmit disabled={disabledButton}>
                      {t("Sign in")}
                    </ButtonSubmit>
                  </div>
                </form>
                <div className="new-account mt-3 text-center">
                  <p>
                    {t("Dont have an account?")}{" "}
                    <Link to={"./signup/createUser"}>{t("Sign up")}</Link>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="centered-container">
                <h3>{t("User login already exists...")}</h3>
                <div>
                  <Link className="btn btn-dark" to={"/dashboard"}>
                    <i className="mdi mdi-login-variant"></i>{" "}
                    {t("Application_EntrarNaPlataforma")}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Signin;
