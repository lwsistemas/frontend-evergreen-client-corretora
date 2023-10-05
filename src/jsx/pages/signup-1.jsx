import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "../../services/index";
import { useDispatch } from "react-redux";
import { createUser } from "../store/Create/Create.action";
import { useTranslation } from "react-i18next";
import "../../css/login/login.css";
import LogoHeader from "../../images/brand/logoHeader.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ButtonSubmit } from "../../components/button/submit";

function Signup1() {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [erroName, setErrorName] = useState(false);
  const [erroUserName, setErrorUserName] = useState(false);
  const [erroPassword, setErrorPassword] = useState(false);

  const [messageName, setMessageName] = useState("");
  const [messageUserName, setMessageUserName] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [colorButton, setColorButton] = useState({
    backgroundColor: "#bf0202",
    borderColor: "#bf0202",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFirstName = async (e) => {
    if (!/[0-9]/g.test(e)) {
      setFirstName(e);
    }
  };
  const handleSecondName = async (e) => {
    if (!/[0-9]/g.test(e)) {
      setSecondName(e);
    }
  };
  const handleSubmit = async (e) => {
    disabledButton(true);
    e.preventDefault();
    // if (!firstName || !secondName) {
    //     setMessageName('Enter first name and/or second name')
    //     setErrorName(true)
    // }
    // else {
    //     setErrorName(false)
    // }
    // if (!userName) {
    //     setMessageUserName('Enter user name')
    //     setErrorUserName(true)
    // }
    // else {
    //     setErrorUserName(false)
    // }
    // if (!password || !confirmPassword) {
    //     setMessagePassword('Enter password and / or password confirmation')
    //     setErrorPassword(true)
    // } else {
    //     setErrorPassword(false)
    // }
    // if ((password === confirmPassword) && (password !== '')) {
    //     if (password.length >= 6 && password.length <= 21) {
    //         setErrorPassword(false)
    //     }else{
    //         setMessagePassword('Enter password with 6 to 21 characters')
    //         setErrorPassword(true)
    //     }
    // } else {
    //     setMessagePassword('Passwords do not match')
    //     setErrorPassword(true)
    // }

    const user = { firstName, secondName, login: userName, password };
    console.log(user);
    const result = (await axios.get(`username/${userName}`)).data;

    if (!result.login) {
      setErrorUserName(false);
      dispatch(createUser(user));
      history.push("/signup/personaldetails");
    } else {
      setMessageUserName("User Name is already in use");
      setErrorUserName(true);
    }
  };
  const handleButton = async (
    firstName,
    secondName,
    userName,
    password,
    confirmPassword
  ) => {
    //console.log("firstName: ", firstName,"secondName: ", secondName, "userName: ",userName,"password: " , password,"confirmPassword: ", confirmPassword)
    if (
      firstName != "" &&
      secondName != "" &&
      userName != "" &&
      password != "" &&
      confirmPassword != "" &&
      userName != undefined &&
      secondName != undefined &&
      firstName != undefined &&
      password != undefined &&
      confirmPassword != undefined
    ) {
      disabledButton(false);
      return false;
    } else {
      disabledButton(true);
      return true;
    }
  };
  const checkPassword = async (word) => {
    setPassword(word);
    if (word != undefined && word != "") {
      if (word.length >= 6 && word == confirmPassword) {
        handleButton(firstName, secondName, userName, word, confirmPassword);
      } else {
        disabledButton(true);
      }
    } else {
      disabledButton(true);
    }
  };
  const checkConfirmPassword = async (word) => {
    setConfirmPassword(word);
    if (word != undefined && word != "") {
      if (word.length >= 6 && word == password) {
        handleButton(firstName, secondName, userName, password, word);
      } else {
        disabledButton(true);
      }
    } else {
      disabledButton(true);
    }
  };
  const disabledButton = async (value) => {
    if (value) {
      setDisable(true);
      setColorButton({ backgroundColor: "#bf0202", borderColor: "#bf0202" });
    } else {
      setDisable(false);
      setColorButton({ backgroundColor: "#10d876", borderColor: "#10d876" });
    }
  };
  return (
    <>
      <div class="body-login">
        <div class="backgroud-login" style={{}}>
          <div class=" justify-content-left" style={{ height: "100%" }}>
            <div class="painel-login">
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

              <div
                class="card-content"
                style={{ background: "#131722cc !important" }}
              >
                <div className="mb-5 icon-back">
                  <Link to={"/"}>
                    <ArrowBackIcon />
                  </Link>
                </div>
                <div
                  class="card-login-header justify-content-left"
                  style={{ background: "none !important" }}
                >
                  <h2 class="card-title">{t("Sign up your account")}</h2>
                </div>
                <form
                  method="post"
                  name="myform"
                  className="signup_validate "
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label>{t("Name")}</label>
                    <div className="input-group">
                      <input
                        autocomplete="off"
                        type="text"
                        className="form-control "
                        placeholder={t("First Name")}
                        name="username"
                        value={firstName}
                        onChange={(e) => {
                          handleFirstName(e.target.value);
                          handleButton(
                            e.target.value,
                            secondName,
                            userName,
                            password,
                            confirmPassword
                          );
                        }}
                      />
                      <input
                        autocomplete="off"
                        type="text"
                        className="form-control"
                        placeholder={t("Second Name")}
                        name="username"
                        value={secondName}
                        onChange={(e) => {
                          handleSecondName(e.target.value);
                          handleButton(
                            firstName,
                            e.target.value,
                            userName,
                            password,
                            confirmPassword
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className={"text-danger " + (!erroName ? "d-none" : "")}>
                    {messageName}
                  </div>
                  <div className="form-group">
                    <label>{t("Username")}</label>
                    <input
                      autocomplete="off"
                      type="text"
                      className="form-control"
                      placeholder={t("Username")}
                      name="username"
                      value={userName}
                      onChange={(e) => {
                        setUsername(e.target.value.replace(" ", ""));
                        handleButton(
                          firstName,
                          secondName,
                          e.target.value.replace(" ", ""),
                          password,
                          confirmPassword
                        );
                      }}
                    />
                  </div>
                  <div
                    className={"text-danger " + (!erroUserName ? "d-none" : "")}
                  >
                    {messageUserName}
                  </div>
                  <div className="form-group">
                    <label>{t("Password")}</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder={t("Password")}
                      name="password"
                      value={password}
                      onChange={(e) =>
                        checkPassword(e.target.value.replace(" ", ""))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>{t("Password confirm")}</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder={t("Password")}
                      name="passwordConfirmation"
                      value={confirmPassword}
                      onChange={(e) =>
                        checkConfirmPassword(e.target.value.replace(" ", ""))
                      }
                    />
                  </div>
                  <div
                    className={"text-danger " + (!erroPassword ? "d-none" : "")}
                  >
                    {messagePassword}
                  </div>

                  <div class="text-center mt-4">
                    <ButtonSubmit disabled={disable}>{t("Next")}</ButtonSubmit>
                  </div>
                </form>
                <div className="new-account text-center mt-3">
                  <p>
                    {t("Already have an account?")}{" "}
                    <Link to={"../signin"}>{t("Sign in")}</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup1;
