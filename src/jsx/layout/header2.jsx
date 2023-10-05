import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import LanguageSelect from "../element/languageSelect";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../store/User/User.action";
import { useTranslation } from "react-i18next";
import axios from "../../services/index";
import CurrencyFormat from "react-currency-format";
import LogoHeader from "../../images/brand/logoHeader.png";
import configGlobal from "../jsonConfig/globalConfig.json";

const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

function Header2(props) {
  // const imageDefault = 'https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?ssl=1'
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showAvatar, setShowAvatar] = useState("none");
  const [showAvatarDefaults, setShowAvatarDefaults] = useState("none");
  const user = useSelector((state) => state.user);

  const avatar = "/" + user.avatar;
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 480);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const handleSubmit = async (e) => {
    try {
      await axios.post("user/logout", { authKey: user.authKey });
    } catch (err) {
      console.log("erro");
    }
    dispatch(User(null));
  };
  const setAvatar = async () => {
    if (user.avatar != "" && user.avatar != undefined) {
      setShowAvatarDefaults("none");
      setShowAvatar("block");
    } else {
      setShowAvatar("none");
      setShowAvatarDefaults("block");
    }
  };

  useEffect(async () => {
    await setAvatar();
  }, []);

  return (
    <>
      <div className={`header dashboard${scrolled ? " scroll" : ""}`}>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-12">
            
              <nav class="navbar navbar-expand-lg navbar-light px-0 justify-content-between align-items-center">
               
              {isMobile ? (
                <Link to={"/dashboard"}>
                  <img
                    src={LogoHeader}
                    style={{
                      width: 80,
                      maxHeight: "70px",
                      float: "left",
                    }}
                  ></img>
                </Link>
              ) : (
                <h4 style={{marginBottom:"0"}}>{props.title}</h4>
              )}

                <div class="header-right d-flex my-2 align-items-center">
                  <div class="language">
                    <LanguageSelect />
                  </div>
                  <div class="dashboard_log">
                    <Dropdown className="profile_log">
                      <Dropdown.Toggle as={ProfileToggle}>
                        <div className="profile_log">
                          <div class="user">
                            <div style={{ display: showAvatar }}>
                              <img
                                src={avatar}
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                }}
                                width="35px"
                                height="35px"
                              />
                            </div>
                            <div style={{ display: showAvatarDefaults }}>
                              <span class="thumb">
                                <i class="mdi mdi-account"></i>
                              </span>
                            </div>
                            <span class="arrow">
                              <i class="la la-angle-down"></i>
                            </span>
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu size="sm" title="">
                        <div class="user-email">
                          <div class="user">
                            <div style={{ display: showAvatar }}>
                              <img
                                src={avatar}
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                }}
                                width="30px"
                                height="30px"
                              />
                            </div>
                            <div style={{ display: showAvatarDefaults }}>
                              <span class="thumb">
                                <i class="mdi mdi-account"></i>
                              </span>
                            </div>
                            <div class="user-info">
                              <h6>
                                {user.firstName} {user.secondName}
                              </h6>
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>

                        <div class="user-balance">
                          <div class="available">
                            <p>{t("Balance available")}</p>
                            <span>
                              ${" "}
                              <CurrencyFormat
                                value={props.balanceBRL}
                                decimalScale={2}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </span>
                          </div>
                        </div>
                        <Link to={"../user/editUser"} class="dropdown-item">
                          <i class="mdi mdi-human-greeting"></i> {t("Account")}
                        </Link>
                        <Link to={"../contratos"} class="dropdown-item">
                          <i class="mdi mdi-vector-arrange-above"></i>{" "}
                          {t("Application_Contratos")}
                        </Link>
                        <Link to={"../deposit"} class="dropdown-item">
                          <i class="mdi mdi-coins"></i> {t("Deposit fiat")}
                        </Link>
                        <Link
                          to={"../account-deposit-cripto"}
                          class="dropdown-item"
                        >
                          <i class="mdi mdi-coin"></i> {t("Deposit crypto")}
                        </Link>
                        <Link
                          to={"../account-withdraw-fiat"}
                          class="dropdown-item"
                        >
                          <i class="mdi mdi-cash-multiple"></i>{" "}
                          {t("Withdraw fiat")}
                        </Link>
                        <Link to={"../support"} class="dropdown-item">
                          <i class="mdi mdi-message-bulleted"></i>{" "}
                          {t("Application_Support")}
                        </Link>

                        <Link
                          to={"../signin"}
                          onClick={() => {
                            dispatch(User(null));
                            handleSubmit();
                          }}
                          class="dropdown-item logout"
                        >
                          <i class="mdi mdi-logout"></i> {t("Logout")}
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header2;
