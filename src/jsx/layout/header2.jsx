import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCogs } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../store/User/User.action";
import { useTranslation } from "react-i18next";
import axios from "../../services/index";
import CurrencyFormat from "react-currency-format";
import LogoHeader from "../../images/brand/logoHeader.png";
import LanguageSelect from "../element/languageSelect";

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


const ProfileToggleNotificacoes = React.forwardRef(({ children, onClick }, ref) => (
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showAvatar, setShowAvatar] = useState("none");
  const [showAvatarDefaults, setShowAvatarDefaults] = useState("none");
  const user = useSelector((state) => state.user);

  const avatar = "/" + user.avatar;
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [showNotification, setShowNotification] = useState(0);
  const [datanotification, setDataNotification] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownPerfilOpen, setIsDropdownPerfilOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    clearTimeout(dropdownCloseTimeout);
  };
  
  const handleMouseLeave = () => {
    dropdownCloseTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };


  const handleMouseEnterPerfil = () => {
    setIsDropdownPerfilOpen(true);
    clearTimeout(dropdownClosePerfilTimeout);
  };
  
  const handleMouseLeavePerfil = () => {
   // dropdownClosePerfilTimeout = setTimeout(() => {
      setIsDropdownPerfilOpen(false);
   // }, 100);
  };
  let dropdownCloseTimeout;
    let dropdownClosePerfilTimeout;



  const getNotifications = async () => {
    try {
      const response = await axios.post(`/Notifications/all/`, {
        authKey: user.authKey,
        uid: user.id,
      });
      const DadosJson = response.data;
      setDataNotification(DadosJson);
      setShowNotification(DadosJson.length);
      return DadosJson;
    } catch (err) {
      return err.response;
    }
  };

  const HandlerUpdate = async (notification) => {
    try {
      const id = notification.id;
      const authKey = user.authKey;
      const response = await axios.put(`/Notifications/update/`, {
        authKey: user.authKey,
        id: id,
      });

      if (response.status === 200) {
        console.log("Notificação atualizada com sucesso!");
        await getNotifications();
      } else {
        console.error("Falha ao atualizar a notificação.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a notificação:", error);
    }
  };

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

  const handleSubmit = async () => {
    try {
      await axios.post("user/logout", { authKey: user.authKey });
    } catch (err) {
      console.log("erro");
    }
    dispatch(User(null));
  };

  const setAvatar = () => {
    if (user.avatar !== "" && user.avatar !== undefined) {
      setShowAvatarDefaults("none");
      setShowAvatar("block");
    } else {
      setShowAvatar("none");
      setShowAvatarDefaults("block");
    }
  };

  useEffect(() => {
    setAvatar();
    getNotifications();
  }, []);

  useEffect(() => {
    const timer = setInterval(async () => {
      await getNotifications();
    }, 20000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className={`header dashboard${scrolled ? " scroll" : ""}`}>
        <div className="">
          <div className="row">
            <div className="col-xl-12">
              <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between align-items-center">
                {isMobile ? (
                  <Link to="/dashboard">
                    <img
                      src={LogoHeader}
                      style={{
                        width: 80,
                        maxHeight: "70px",
                        float: "left",
                      }}
                      alt="Logo Header"
                    />
                  </Link>
                ) : (
                  <h4 style={{ marginBottom: "0" }}>{props.title}</h4>
                )}

                <div className="header-right d-flex my-2 align-items-center">
                  <div className="notifications-icon"
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}>
                    <Dropdown
                      show={isDropdownOpen}
                      

                    >
                      <Dropdown.Toggle as={ProfileToggleNotificacoes}>
                        <div className="notification-icon">
                          <FontAwesomeIcon
                            icon={faBell}
                            className={
                              showNotification === 0 ? "bell-icon-zero element" : "bell-icon"
                            }
                          />
                          {showNotification > 0 && (
                            <span className="badge badge-notify">
                              {showNotification}
                            </span>
                          )}
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        size="sm"
                        className="notification-menu"
                        title=""
                        style={{ maxHeight: "410px", overflowY: "auto" }}
                      >
                        <div className="header-notifications">
                          <div className="header-notifications-left">
                            {t('Application_Notifications')}
                          </div>
                          <div className="header-notifications-right">
                            <FontAwesomeIcon icon={faCogs} className="cogs-icon" />
                          </div>
                        </div>

                        {showNotification > 0 ? (
                          <>
                            {datanotification.map((notification, index) => (
                              <Link
                                to={notification.link}
                                className="notification-link"
                                key={index}
                                onClick={() => HandlerUpdate(notification)}
                              >
                                <i
                                  className={`notification-icon-notf ${notification.icon}`}
                                ></i>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: notification.message,
                                  }}
                                />
                              </Link>
                            ))}
                            {/* Adicione mais notificações personalizadas aqui */}
                          </>
                        ) : (
                          <div className="notification-link-zero">
                            Sem Notificações&nbsp;<i className="fa fa-smile-o"></i>
                          </div>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="language">
                    <LanguageSelect />
                  </div>
                  <div className="dashboard_log"
                   onMouseLeave={handleMouseLeavePerfil}
                   onMouseEnter={handleMouseEnterPerfil}>
                  
                    <Dropdown className="profile_log"
                    show={isDropdownPerfilOpen}

                    >
                      <Dropdown.Toggle as={ProfileToggle}>
                        <div className="profile_log">
                          <div className="user">
                            <div style={{ display: showAvatar }}>
                              <img
                                src={avatar}
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                }}
                                width="35px"
                                height="35px"
                                alt="User Avatar"
                              />
                            </div>
                            <div style={{ display: showAvatarDefaults }}>
                              <span className="thumb">
                                <i className="mdi mdi-account"></i>
                              </span>
                            </div>
                            <span className="arrow">
                              <i className="la la-angle-down"></i>
                            </span>
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu size="sm" title="">
                        <div className="user-email">
                          <div className="user">
                            <div style={{ display: showAvatar }}>
                              <img
                                src={avatar}
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                }}
                                width="30px"
                                height="30px"
                                alt="User Avatar"
                              />
                            </div>
                            <div style={{ display: showAvatarDefaults }}>
                              <span className="thumb">
                                <i className="mdi mdi-account"></i>
                              </span>
                            </div>
                            <div className="user-info">
                              <h6>
                                {user.firstName} {user.secondName}
                              </h6>
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="user-balance">
                          <div className="available">
                            <p>{t("Balance available")}</p>
                            <span>
                              ${" "}
                              <CurrencyFormat
                                value={props.balanceBRL}
                                decimalScale={2}
                                displayType="text"
                                thousandSeparator={true}
                              />
                            </span>
                          </div>
                        </div>
                        <Link to="/user/editUser" className="dropdown-item">
                          <i className="mdi mdi-human-greeting"></i> {t("Account")}
                        </Link>
                        <Link to="../contratos" className="dropdown-item">
                          <i className="mdi mdi-vector-arrange-above"></i>{" "}
                          {t("Application_Contratos")}
                        </Link>
                        <Link to="/deposit" className="dropdown-item">
                          <i className="mdi mdi-coins"></i> {t("Deposit fiat")}
                        </Link>
                        <Link
                          to="/account-deposit-cripto"
                          className="dropdown-item"
                        >
                          <i className="mdi mdi-coin"></i> {t("Deposit crypto")}
                        </Link>
                        <Link
                          to="/account-withdraw-fiat"
                          className="dropdown-item"
                        >
                          <i className="mdi mdi-cash-multiple"></i>{" "}
                          {t("Withdraw fiat")}
                        </Link>
                        <Link to="/support" className="dropdown-item">
                          <i className="mdi mdi-message-bulleted"></i>{" "}
                          {t("Application_Support")}
                        </Link>
                        <Link
                          to="/"
                          onClick={() => {
                            dispatch(User(null));
                            handleSubmit();
                          }}
                          className="dropdown-item logout"
                        >
                          <i className="mdi mdi-logout"></i> {t("Logout")}
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
