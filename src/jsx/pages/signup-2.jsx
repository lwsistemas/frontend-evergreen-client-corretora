import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../services/index";
import { useHistory } from "react-router-dom";
import { createUser } from "../store/Create/Create.action";
import countryList from "react-select-country-list";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import OrderModal from "../element/Ordermodal";
import DocumentType from "../element/documentType";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import codes from "../jsonConfig/countryCodes.json";
import LanguageSelect from "../element/languageSelect";
import PhoneNumber from "../element/Phone";
import Loading from "../element/loading";
import { User } from "../store/User/User.action";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input/input";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ButtonSubmit } from "../../components/button/submit";
import LogoHeader from "../../images/brand/logoHeader.png";

function Signup2() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.create);
  const [IdDocument, setIdDocument] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [erroIdDocument, setErroIdDocument] = useState(false);
  const [erroTelephone, setErroTelephone] = useState(false);
  const [erroMobile, setErrorMobile] = useState(false);
  const [erroEmail, setErrorEmail] = useState(false);
  const [errorNacionality, setErrorNacionality] = useState(false);
  const [disable, setDisable] = useState(true);
  const [colorButton, setColorButton] = useState({
    backgroundColor: "#bf0202",
    borderColor: "#bf0202",
  });
  const [mask, setMask] = useState("");
  const [documentType, setDocumentType] = useState("IdDocument");
  const [erroMobilemsg, setErroMobilemsg] = useState("Insert valid phone");
  const [nacionality, setNacionality] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [mobileCode, setMobileCode] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  const [show, setShow] = useState(false);
  const [operationProps] = useState({});
  const [showLoad, setShowLoad] = useState("none");

  const changeHandler = (nacionality) => {
    const newCode = codes.filter((e) => e.name == nacionality.label);
    nacionality.value == "BR"
      ? setDocumentType("Document")
      : setDocumentType("IdDocument");
    newCode.length != 0
      ? setPhoneCode(newCode[0].dial_code)
      : setPhoneCode("00");
    setIdDocument("");
    setNacionality(nacionality);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const number = new RegExp("^[0-9]+$");

  const handleIdDocument = async (e) => {
    if (number.test(e)) {
      setIdDocument(e);
      handleButton(email, telephone, mobile, e, nacionality);
    }
    if (e === "") {
      console.log(e);
      setIdDocument(e);
      handleButton(email, telephone, mobile, "", nacionality);
    }
  };
  const handleTelephone = async (e) => {
    if (number.test(e)) {
      setTelephone(e);
    }
    if (e === "") {
      setTelephone(e);
    }
  };
  const handleMobile = async (e) => {
    if (number.test(e)) {
      setMobile(e);
    }
    if (e === "") {
      setMobile(e);
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
  const selectNacionality = async () => {
    setIdDocument("");
    disabledButton(true);
  };
  const checkNumberPhone = async (thisPhone) => {
    //   getCountryCallingCode('US') === '1'
    setTelephone(thisPhone);
    handleButton(email, thisPhone, mobile, IdDocument, nacionality);
  };
  const checkNumberMobile = async (thisMobile) => {
    //   getCountryCallingCode('US') === '1'
    setMobile(thisMobile);
    handleButton(email, telephone, thisMobile, IdDocument, nacionality);
  };
  function validateMobile(thisMobile) {
    setMobile(thisMobile);
    if (thisMobile != undefined && thisMobile != "")
      if (thisMobile.length >= 8) {
        if (thisMobile.substring(0, 3) == "+55") {
          if (thisMobile.length >= 14) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    else {
      return false;
    }
  }
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const setShowError = async (error) => {
    const setErro = error.flag;
    switch (setErro) {
      case "doc":
        setErroIdDocument(true);
        break;
      case "email":
        setErrorEmail(true);
        break;
      case "mobile":
        setErrorMobile(true);
        break;
      case "login":
        resetValues();
        history.push("/signup/createUser");
        break;
      default:
        resetValues();
        console.log(`Sorry,erro undefined`);
    }
  };
  const resetValues = async () => {
    setEmail("");
    setMobile("");
    setNacionality("");
    setTelephone("");
    setIdDocument("");
    disabledButton(true);
  };
  const handleButton = (email, telephone, mobile, IdDocument, nacionality) => {
    // console.log("email :",email,"telephone :", telephone,"mobile :", mobile, "IdDocument:",IdDocument,"nacionality", nacionality)
    if (
      validateEmail(email) &&
      validateMobile(mobile) &&
      IdDocument != "" &&
      nacionality != "" &&
      IdDocument != undefined &&
      nacionality != undefined
    ) {
      if (nacionality.value == "BR") {
        if (IdDocument.length >= 14) {
          disabledButton(false);
          return false;
        } else {
          disabledButton(true);
          return true;
        }
      } else {
        disabledButton(false);
        return false;
      }
    } else {
      disabledButton(true);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    setErroIdDocument(false);
    setErrorEmail(false);
    setErrorMobile(false);
    setShowLoad("block");
    disabledButton(true);
    e.preventDefault();
    const phoneNumber = await parsePhoneNumber(mobile);
    user.email = email;
    user.mobile = phoneNumber.nationalNumber;
    user.mobileCode = phoneNumber.countryCallingCode;
    let tel = false;
    if (telephone != "" && telephone != undefined) {
      if (telephone.length > 12) {
        const phoneNumber2 = await parsePhoneNumber(telephone);
        user.telephone = phoneNumber2.nationalNumber;
        user.countryCode = phoneNumber2.countryCallingCode;
      } else {
        setErroTelephone(true);
        setShowLoad("none");
        disabledButton(true);
        tel = true;
      }
    } else {
      user.telephone = "";
      user.countryCode = "";
    }
    if (tel) {
      return;
    }
    user.IdDocument = IdDocument.replace(".", "")
      .replace("-", "")
      .replace("/", "");
    user.IdDocument = user.IdDocument.replace(".", "");
    user.nationality = nacionality.label;
    user.documentType = documentType;
    try {
      const cadastro = (await axios.post("/user/register", user)).data;
      dispatch(createUser(cadastro.member));
      setShowLoad("none");
      // history.push('/confirmEmail')
      dispatch(User(cadastro.responseUser));
      history.push("/dashboard");
    } catch (err) {
      if (err.response != undefined) {
        setShowLoad("none");
        operationProps.operationStatus = false;
        operationProps.header = t("Registration error");
        operationProps.body = t(`${err.response.data.error.mensagen}`);
        setShow(true);
        setShowError(err.response.data.error);
      } else {
        setShowLoad("none");
        operationProps.operationStatus = false;
        operationProps.header = t("Registration error");
        operationProps.body = t("Error confirming registration, try again.");
        handleButton(email, telephone, mobile, IdDocument, nacionality);
        setShow(true);
      }
      setTimeout(() => {
        setShow(false);
      }, 6000);
    }
  };
  const checkValue = async () => {
    if (
      user.firstName == undefined ||
      user.firstName == "" ||
      user.secondName == undefined ||
      user.secondName == "" ||
      user.login == undefined ||
      user.login == "" ||
      user.password == undefined ||
      user.password == ""
    ) {
      history.push("/signup/createUser");
    }
  };
  useEffect(async () => {
    await checkValue();
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#000000",
      borderRadius: "8px",
      color: "#fff",
      borderColor: state.isFocused ? "#cca203" : "rgba(255, 255, 255, 0.2)",
      boxShadow: state.isFocused ? "none" : "none",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "#cca203" : state.isFocused ? "#f0f0f0" : "#fff",
      color: state.isSelected ? "##8C8A91" : "#333",
    }),
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
                  <Link to={"/signup/createUser"}>
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
                  class="signup_validate"
                  onSubmit={handleSubmit}
                >
                  <div class="form-group">
                    <label>*{t("Nacionality")}</label>
                    <Select
                      options={options}
                      value={nacionality}
                      className="form-select form-select-sm"
                      styles={customStyles}
                      onChange={(e) => {
                        changeHandler(e);
                        selectNacionality(e);
                      }}
                    />
                  </div>
                  <div class="form-group">
                    <label>*{t(documentType)}</label>
                    {documentType == "Document" ? (
                      <CpfCnpj
                        class="form-control mt-2"
                        value={IdDocument}
                        onChange={(e, type) => {
                          setIdDocument(e.target.value);
                          setMask(type === "CPF");
                          handleButton(
                            email,
                            telephone,
                            mobile,
                            e.target.value,
                            nacionality
                          );
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        class="form-control"
                        placeholder=""
                        autoComplete="off"
                        name="iddocument"
                        value={IdDocument}
                        onChange={(e) => {
                          handleIdDocument(e.target.value.replace(" ", ""));
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      "text-danger " + (!erroIdDocument ? "d-none" : "")
                    }
                  >
                    {t("Document already registered")}
                  </div>
                  {/* <label>{t('Telephone')}</label>
                                        <div class="form-group" >
                                            <PhoneNumber telephone={telephone} setTelephone={checkNumberPhone} />
                                        </div>
                                        <div className={"text-danger " + (!erroTelephone ? "d-none" : "")}>
                                            {t('Insert phone')}
                                        </div> */}

                  <div class="form-group">
                    <label>*{t("Mobile")}</label>
                    <PhoneNumber
                      telephone={mobile}
                      setTelephone={checkNumberMobile}
                    />
                  </div>
                  <div
                    className={"text-danger " + (!erroMobile ? "d-none" : "")}
                  >
                    {t(erroMobilemsg)}
                  </div>
                  <div class="form-group">
                    <label>*Email</label>
                    <input
                      autoComplete="off"
                      type="text"
                      class="form-control"
                      placeholder="xxxx@xxx.com"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.replace(" ", ""));
                        handleButton(
                          e.target.value,
                          telephone,
                          mobile,
                          IdDocument,
                          nacionality
                        );
                      }}
                    />
                  </div>
                  <div
                    className={"text-danger " + (!erroEmail ? "d-none" : "")}
                  >
                    {t("E-mail already registered")}
                  </div>

                  <div class="text-center mt-4">
                    <ButtonSubmit disabled={disable}>
                      {t("Sign up")}
                    </ButtonSubmit>
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

export default Signup2;
