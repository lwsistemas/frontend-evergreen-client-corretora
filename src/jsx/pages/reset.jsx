import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/index";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Document } from "../store/Reset/Reset.action";
import LanguageSelect from "../element/languageSelect";
import { useTranslation } from "react-i18next";
import Header3 from "../layout/header3";
import { useLocation } from "react-router-dom";
import { ButtonSubmit } from "../../components/button/submit";

function Reset() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [code, setCode] = useState("");
  const [IdDocument, setIdDocument] = useState("");
  const [erroCode, setErroCode] = useState(false);
  // const [erroIdDocument, setErroIdDocument] = useState(false)
  const [erroGeneric, setErroGeneric] = useState(false);
  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const number = new RegExp("^[0-9]+$");
  const { t } = useTranslation();

  const handleIdDocument = async (e) => {
    if (number.test(e)) {
      setIdDocument(e);
    }
    if (e === "") {
      setIdDocument(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (erroCode == false) {
        setErroGeneric(false);
        setErroCode(false);
        setDisable(true);
        const request = await axios.post("/resetConfirmData", {
          token: code,
          email,
        });
        // dispatch(Document(IdDocument))
        history.push(`/reset?email=${email}`);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.error.flag == "user") {
        } else {
          setErroCode(true);
        }
        setDisable(true);
      } else {
        setErroGeneric(true);
        setDisable(false);
      }
    }
  };
  const handleButton = (code) => {
    if (code != "" && code != undefined) {
      setErroCode(false);
      setDisable(false);
      return false;
    } else {
      setDisable(true);
      return true;
    }
  };

  return (
    <>
      <div class="body-login">
        <div class="backgroud-login" style={{}}>
          <div class=" justify-content-left" style={{ height: "100%" }}>
            <div class="painel-login">
              <div class="card-content">
              <div
                  class="card-login-header justify-content-left"
                  style={{ background: "none !important" }}
                >
                  <h2 class="card-title">{t("Reset password")}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label>
                      {t("Enter the code sent to the email")}{" "}
                    </label>
                    <input
                      autocomplete="off"
                      type="text"
                      class="form-control"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.replace(" ", ""));
                        handleButton(e.target.value);
                      }}
                    />
                  </div>
                  <div class="form-group">
                    <div
                      className={"text-danger " + (!erroCode ? "d-none" : "")}
                    >
                      {t("Incorrect code.")}
                    </div>
                  </div>
                  <div class="text-center mt-4">
                    <ButtonSubmit disabled={disable}>{t("Next")}</ButtonSubmit>
                  </div>
                </form>
                <div
                  className={"text-danger " + (!erroGeneric ? "d-none" : "")}
                >
                  {t("An error has occurred. Please try again.")}
                </div>
                <div class="new-account mt-3 text-center">
                  <p class="mb-1">{t("Don't Received?")} </p>
                  <div className="text-center d-flex justify-content-center" style={{gap:"24px"}}>
                    <Link to={"./forgot"}>{t("Resend")}</Link>
                    <Link to={"./signin"}>{t("Back to login")} </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
