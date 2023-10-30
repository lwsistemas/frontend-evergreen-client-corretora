
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
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

function Header2(props) {
    // const imageDefault = 'https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?ssl=1'
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showAvatar, setShowAvatar] = useState("none");
    const [showAvatarDefaults, setShowAvatarDefaults] = useState("none");
    const user = useSelector((state) => state.user);

    const avatar = user.avatar;
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    const [showNotification, setShowNotification] = useState(0);
    const [datanotification, setDataNotification] = useState([]);

    const getNotifications = async () => {
        try {
            const response = await axios.post(`/Notifications/all/`,
                {
                    authKey: user.authKey,
                    uid: user.id
                });
            const DadosJson = response.data; // Acessando a propriedade data
            setDataNotification(DadosJson);
            setShowNotification(DadosJson.length); // Corrigindo "lenght" para "length"
            console.log(DadosJson);
            return DadosJson;
        } catch (err) {
            return err.response;
        }
    };


    const HandlerUpdate = async (notification) => {
        try {
            const id = notification.id; // Suponha que a notificação tenha uma propriedade "id"
            const authKey = user.authKey; // Suponha que você tenha o valor de authKey disponível
            const response = await axios.put(`/Notifications/update/`, {
                authKey: user.authKey,
                id: id

            });

            if (response.status === 200) {
                console.log("Notificação atualizada com sucesso!");
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

    useEffect(() => {
        const timer = setInterval(async () => {
            await getNotifications();
        }, 2000);

        return () => {
            clearInterval(timer);
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
            <div className={`header exchanged${scrolled ? " scroll" : ""}`}>
                <div class="">
                    <div class="row">
                        <div class="col-xl-12">

                            <nav class="navbar navbar-expand-lg navbar-light px-0 justify-content-between align-items-center">

                                {isMobile ? (
                                    <Link to={"/dashboard"}>
                                        <img
                                            src={LogoHeader}
                                            style={{
                                                marginTop: "-18px",
                                                height: "50px",
                                                float: "left",
                                                padding: "5px",
                                            }}
                                        ></img>
                                    </Link>
                                ) : (

                                    <div>
                                        <Link to={"/dashboard"}>
                                            <img
                                                src={LogoHeader}
                                                style={{
                                                    marginTop:"-15px",
                                                    height: "35px",
                                                    float: "left",
                                                }}
                                            ></img>
                                        </Link>
                                        <h4
                                            style={{
                                                marginBottom: "0",
                                                float: "left",
                                                padding: '8px',
                                                marginTop:"-20px"
                                            }}
                                        >
                                            <span style={{ backgroundColor: "#7D8695", padding: '4px', borderRadius: '4px' }}>
                                                {props.title.charAt(0)}
                                            </span>
                                            {props.title.substring(1)}
                                        </h4>

                                    </div>



                                )}

                                <div class="header-right d-flex my-2 align-items-center" style={{marginTop:"0px"}}>
                                    <div className="notifications-icon" style={{marginTop:"-12px"}}>
                                        <Dropdown>
                                            <Dropdown.Toggle as={ProfileToggle}>
                                                <div className="notification-icon">
                                                    <FontAwesomeIcon
                                                        icon={faBell}
                                                        className={showNotification === 0 ? "bell-icon-zero" : "bell-icon"}
                                                    />
                                                    {showNotification > 0 && (
                                                        <span className="badge badge-notify">{showNotification}</span>
                                                    )}
                                                </div>
                                            </Dropdown.Toggle>
                                            
                                                <Dropdown.Menu size="sm" className="notification-menu" title="" style={{ maxHeight: '410px', overflowY: 'auto' }}>
                                                    {showNotification > 0 ? (
                                                        <>
                                                            {datanotification.map((notification, index) => (
                                                                <Link
                                                                    to={notification.link}
                                                                    className="notification-link"
                                                                    key={index}
                                                                    onClick={() => HandlerUpdate(notification)} // Chame a função HandlerUpdate com a notificação como argumento
                                                                >
                                                                    <i className={`notification-icon-notf ${notification.icon}`}></i>
                                                                    <span dangerouslySetInnerHTML={{ __html: notification.message }} />
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
                                    <div class="language" style={{marginTop:"-20px"}}>
                                        <LanguageSelect />
                                    </div>
                                    <div class="dashboard_log" style={{marginTop:"-20px"}}>
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
