import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/index";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../css/login/login.css";
import { ButtonSubmit } from "../../components/button/submit";

const  Forgot = () => {
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [messageErro, setMessageError] = useState("");
  const [disable, setDisable] = useState(true);

  const history = useHistory();
  const { t } = useTranslation();
  const setValue = (value) => {
    let aux = value.replace(" ", "");
    setEmail(aux);
    if (validateEmail(aux)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisable(true);
      let erroEmailAux = false;
      console.log("aaa", email);
      if (email == undefined || email == "") {
        erroEmailAux = true;
        setMessageError("Insert Email");
        setErroEmail(true);
      } else {
        setErroEmail(false);
      }
      console.log(erroEmailAux);
      if (erroEmailAux == false) {
        const request = await axios.post("/forgot", { email });
        console.log(request);
        history.push(`/confirmDataReset?email=${email}`);
        // history.push('/confirmDataReset')
      }
    } catch (error) {
      setErroEmail(true);

      if (error.response) {
        setMessageError("User not found");
        setDisable(true);
      } else {
        setMessageError("An error has occurred. Please try again.");
        setDisable(false);
      }
    }
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

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
                  <label>{t("Email")}</label>
                  <input
                    type="text"
                    class="form-control"
                    value={email}
                    onChange={(e) => setValue(e.target.value.replace(" ", ""))}
                  />
                </div>
                <div class="form-group">
                  <div
                    className={"text-danger " + (!erroEmail ? "d-none" : "")}
                  >
                    {t(messageErro)}
                  </div>
                </div>
                  <div class="text-center mt-4">
                    <ButtonSubmit disabled={disable}>{t("Request reset")}</ButtonSubmit>
                  </div>
              </form>
              <div class="new-account  text-center mt-3">
                <Link to={"./signin"}>
                  {t("Back to login")}{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
  );
}

export default Forgot;
