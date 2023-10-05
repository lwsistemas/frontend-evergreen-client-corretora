import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../services/index";
import { useDispatch } from "react-redux";
import LanguageSelect from "../element/languageSelect";
import { useTranslation } from "react-i18next";
import Header3 from "../layout/header3";
import { useLocation } from "react-router-dom";
import { ButtonSubmit } from "../../components/button/submit";
import { Modal } from "react-bootstrap";
import ButtonPrimary from "../../components/button/primary";
import "../../components/modal/index.css"
import { User } from "../store/User/User.action";

function Reset2() {
  // const IdDocument = useSelector(state => state.reset)
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erroPassword, setErrorPassword] = useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [disable, setDisable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();

  const handleRedirectToDashboard = () => {
    dispatch(User(user));
    history.push("/dashboard");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!password || !confirmPassword) {
        setMessagePassword("Enter password and / or password confirmation");
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
      if (password === confirmPassword) {
        if (password !== "") {
          if (password.length >= 6 && password.length <= 21) {
            setErrorPassword(false);
          } else {
            setMessagePassword("Enter password with 6 to 21 characters");
            setErrorPassword(true);
          }
        }
      } else {
        setMessagePassword("Passwords do not match");
        setErrorPassword(true);
      }
      if (erroPassword === false) {
        setErrorPassword(false);
        setDisable(true);
        const request = await axios.put("/reset", {
          email,
          password,
          confirmPassword,
        });
        setUser(request.data.user)
        setShowModal(true)
      }
    } catch (err) {
      if (err.response) {
        setErrorPassword(true);
        setMessagePassword(err.response.data.error);
      } else {
        setMessagePassword("An error has occurred. Please try again.");
        setErrorPassword(true);
        setDisable(false);
      }
    }
  };
  const handleButton = (password, confirmPassword) => {
    console.log("IdDocument:", password, "code", confirmPassword);
    if (
      password != "" &&
      confirmPassword != "" &&
      password != undefined &&
      confirmPassword != undefined
    ) {
      if (password.length >= 6 && confirmPassword == password) {
        setDisable(false);
        return false;
      } else {
        setDisable(true);
        return true;
      }
    } else {
      setDisable(true);
      return true;
    }
  };

  return (
    <>
      <Modal show={showModal} dialogClassName="custom-modal">
        <Modal.Header style={{ borderBottom: 'none' }}>
          <Modal.Title style={{ color: 'white' }}>{t("Authentication completed successfully.")}</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ borderTop: 'none' }}>
          <button onClick={handleRedirectToDashboard}>{t('Confirm')}</button>
        </Modal.Footer>
      </Modal>

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
                  <div className="form-group">
                    <label>{t("New password")}</label>
                    <input
                      autocomplete="off"
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value.replace(" ", ""));
                        handleButton(e.target.value, confirmPassword);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t("Confirm new password")}</label>
                    <input
                      autocomplete="off"
                      type="password"
                      className="form-control"
                      name="passwordConfirmation"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value.replace(" ", ""));
                        handleButton(password, e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <div
                      className={
                        "text-danger " + (!erroPassword ? "d-none" : "")
                      }
                    >
                      {t(messagePassword)}
                    </div>
                  </div>
                  <div class="text-center mt-4">
                    <ButtonSubmit disabled={disable}>{t("Confirm")}</ButtonSubmit>
                  </div>

                </form>
                <div class="new-account text-center mt-3">
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

export default Reset2;
