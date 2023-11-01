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
            
                <div className="header-notifications"
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}>
                    <Dropdown show={isDropdownOpen}>
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
                            className="notification-menu"
                            title=""
                            style={{ maxHeight: "410px", overflowY: "auto" }}
                        >
                            {/* <div className="header-notifications">
                                <div className="header-notifications-left">
                                    {t('Application_Notifications')}
                                </div>
                                <div className="header-notifications-right">
                                    <FontAwesomeIcon icon={faCogs} className="cogs-icon" />
                                </div>
                            </div> */}

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
            
        </>
    );
}

export default Header2;
