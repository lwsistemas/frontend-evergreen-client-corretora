import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCogs } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../store/User/User.action";
import { useTranslation } from "react-i18next";
import axios from "../../../services/index";
import CurrencyFormat from "react-currency-format";
import LogoHeader from "../../../images/brand/logoHeader.png";
import LanguageSelect from "../../element/languageSelect";
import '../../../css/home/MegaMenu.css'
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import SelectLanguage from "../../element/languageSelectModal";
import ComponentAlerta from '../../../jsx/layout/ComponenteAlerta'
import Moment from "react-moment";
import CountUp from 'react-countup';
import Cookies from 'js-cookie';
import assistentederobo from '../../../images/IconesMenu/assistente-de-robo.png'
import market from '../../../images/IconesMenu/pesquisa-de-mercado.png'
import Stopcksmarket from '../../../images/IconesMenu/stocks.png'
import crypto from '../../../images/IconesMenu/crypto.png'
import depositcrypto from '../../../images/IconesMenu/depositcrypto.png'
import depositfiat from '../../../images/IconesMenu/depositofiat.png'
import sacarcrypto from '../../../images/IconesMenu/sacarbitcoin.png'
import sacarfiat from '../../../images/IconesMenu/sacardinheiro.png'
import emprestimo from '../../../images/IconesMenu/emprestimo.png'

import packageJson from '../../../../package.json'



const Header = (props) => {
    const user = useSelector((state) => state.user);
    const [showAvatar, setShowAvatar] = useState("none");
    const [showAvatarDefaults, setShowAvatarDefaults] = useState("none");
    const avatar = user ? "/" + user.avatar : "";
    const { t } = useTranslation();
    const parametros = useParams();
    const [ContratoAtual] = useState(parametros.IdSponser);
    const [contract, setContract] = useState([]);
    const [headerScrolled, setHeaderScrolled] = useState(false);
    const [headerTransparent, setHeaderTransparent] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    const [isSmall, setIsSmall] = useState(window.innerWidth <= 980);
    const [isFocusedDeposit, setIsFocusedDeposit] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedEmprestimo, setIsFocusedEmprestimo] = useState(false);
    const [isFocusedPerfil, setIsFocusedPerfil] = useState(false);
    const [isFocusedSupport, setIsFocusedSupport] = useState(false);
    const [isFocusedSaque, setIsFocusedSaque] = useState(false);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [countUpActive, setCountUpActive] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [Data, setData] = useState({ CelularAtendimento: "" }); // Initialize data as an object
    const dispatch = useDispatch();
    const email = user ? user.email : "";
    const atIndex = email.indexOf("@"); // Encontra a posição do "@" no e-mail
    const domain = email.slice(atIndex); // Mantém o domínio após o "@"
    const hiddenPart = email.slice(0, atIndex - 3) + "@***"; // Oculta tudo antes do "@" exceto os 3 últimos caracteres
    const lastThreeDomainCharacters = domain.slice(-3); // Mantém apenas os últimos 3 caracteres do domínio
    const Tamanho = 480
    const partiallyHiddenEmail = hiddenPart + lastThreeDomainCharacters;
    

    const currentDate = new Date();
    function generateRandomNumberWithDatePrefix() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    const datePrefix = `${year}${month}${day}`;
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000); // Generate 8 random digits
    
    const protocolNumber = `${datePrefix}${randomDigits}`;
    return protocolNumber;
  }

  const NomeGerente = Data.AtendidoPor;
  const FirstName = user ? user.firstName : "";
  const SecondName = user ? user.secondName : "";
  const Email = user ? user.email : "";
  const Mobile = user ? user.mobile : "";
  
  const NumeroAleatorio = generateRandomNumberWithDatePrefix();  
  const Msg = `
  %0DOlá Sr(a) ${NomeGerente}, tudo bem?
  %0DEu preciso de atendimento na plataforma *Infinity Capital*
  %0D*Usuário: ${FirstName + " " + SecondName}*
  %0D*E-mail: ${Email}*
  %0D*Atendimento iniciado: ${currentDate}*
  %0D*Protocolo N: ${NumeroAleatorio}*`;
  
  const getUser = async () => {
    try {
      const response = await axios.post(`/user/view/`, { authKey: user.authKey });
      setData(response.data); // Set data with the response data
    } catch (err) {
      console.log("Erro ao buscar os dados do usuário:", err);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getUser();
    }
  }, [user]);


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isBottomBarVisible, setIsBottomBarVisible] = useState(
        window.innerWidth <= Tamanho
    );




    useEffect(() => {
        const storedShowBalance = Cookies.get('showBalance');

        if (storedShowBalance !== undefined) {
            setShowBalance(storedShowBalance === 'true');
        }
    }, []);

    const toggleBalanceVisibility = () => {
        const newShowBalance = !showBalance;
        setShowBalance(newShowBalance);
        Cookies.set('showBalance', newShowBalance, { expires: 365 }); // Armazene a visibilidade do saldo nos cookies por um ano
    };


    const handleSubmit = async () => {
        try {
            await axios.post("user/logout", { authKey: user.authKey });
        } catch (err) {
            console.log("erro");
        }
        dispatch(User(null));
    };


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (menuOpen) {
            // Ative o CountUp quando o menu for aberto
            setCountUpActive(true);
        } else {
            // Desative o CountUp quando o menu for fechado
            setCountUpActive(false);
        }

        // Adicione um event listener para fechar o menu quando se clica fora dele
        const closeMenuOnClickOutside = (e) => {
            if (menuOpen && !e.target.closest('.menu-lateral')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', closeMenuOnClickOutside);

        return () => {
            document.removeEventListener('click', closeMenuOnClickOutside);
        };
    }, [menuOpen]);

    //console.log("user: " + user)

    const handleLanguageIconClick = () => {
        setIsLanguageModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLanguageModalOpen(false);
    };


    const handleResize = () => {
        setIsMobile(window.innerWidth <= 480);
        setIsSmall(window.innerWidth <= 980);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (<>

        <div className="navMenu">
            <div className="wrapper">
                <div className="logo">
                    {isMobile ? (
                        <Link to="/">
                            <img
                                src={LogoHeader}
                                style={{
                                    width: 65,
                                    maxHeight: 40,
                                    float: "left",
                                    left: "-40px",
                                }}
                                alt="Logo Header"
                            />
                        </Link>
                    ) : (
                        <Link to="/">
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
                    )}

                </div>
                {user == null ? (
                    <div className="nav-links">
                        <ul className="nav-links">
                            <li>
                                <Link to={"./"}>{t("Home")}</Link>
                            </li>
                            <li>
                                <Link to="/ourhistory">{t('Our story')}</Link>
                            </li>
                            <li
                                onMouseEnter={() => setIsFocused(true)}
                                onMouseLeave={() => setIsFocused(false)}
                            >
                                <a
                                    href="#"
                                    className={`desktop-item ${isFocused ? "focused" : ""}`}
                                >
                                    {t("Application_Mercados")}{" "}
                                    <i className={`mdi mdi-${isFocused ? "chevron-up" : "chevron-down"}`}></i>
                                </a>
                                <ul className="drop-menu">
                                    <li>
                                        <Link to="/actives">{t('Active')}
                                            <p>Compre e venda ativos a qualquer momento</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/historic">
                                            {t('Historic')}
                                            <p>Conheça todo nosso histórico em nosso Book</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/news">
                                            {t('Noticias')}
                                            <p>Saiba tudo sobre o mercado financeiro</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/Contact">{t("Contact")}</Link>
                            </li>
                        </ul>
                        <div className="nav-links-direito">
                            <Link to="/signin">Login</Link>
                            <Link className="btn-cadastrar" to="/signup/createUser">{t('Application_Cadastro')}</Link>
                            <SelectLanguage onClose={handleCloseModal} />
                        </div>
                    </div>
                ) : (
                    <>

                        {isSmall ? (
                            <div></div>
                        ) : (
                            <ul className="nav-links" >
                                <li>
                                    <Link to={"./dashboard"}>
                                        <i className="mdi mdi-view-dashboard mdi-24px"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/exchangePro">{t('Application_exchangePro')}</Link>
                                </li>
                                <li
                                    onMouseEnter={() => setIsFocused(true)}
                                    onMouseLeave={() => setIsFocused(false)}
                                >
                                    <a
                                        href="#"
                                        className={`desktop-item ${isFocused ? "focused" : ""}`}
                                    >
                                        {t("Application_Mercados")}{" "}
                                        <i className={`mdi mdi-${isFocused ? "chevron-up" : "chevron-down"}`}></i>
                                    </a>
                                    <ul className="drop-menu">
                                        <li><img src={market}/>
                                            <Link to="/mercados">{t('Application_Mercados')}
                                               
                                                <p>{t("Application_TextoMercados")}</p>
                                            </Link>
                                        </li>
                                        <li>
                                        <img src={assistentederobo}/>
                                        <Link to="/robos">{t('Application_Robo')}
                                            <p>{t("Application_TextoMercados")}</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <img src={Stopcksmarket} alt="" />
                                            <Link to="/Stocks">
                                                {t('Application_Stock')}
                                                <p>{t("Application_TextStocks")}</p>
                                            </Link>
                                        </li>
                                        <li>
                                        <img src={crypto} alt="" />
                                            <Link to="/mercados">
                                                {t('Application_Cryptos')}
                                                <p>{t("Application_TextCrypto")}</p>
                                            </Link>
                                        </li>
                                    </ul>


                                </li>
                                <li
                                    onMouseEnter={() => setIsFocusedDeposit(true)}
                                    onMouseLeave={() => setIsFocusedDeposit(false)}
                                >
                                    <a
                                        href="#"
                                        className={`desktop-item ${isFocusedDeposit ? "focused" : ""}`}
                                    >
                                        {t('Application_Deposito')}{" "}
                                        <i className={`mdi mdi-${isFocusedDeposit ? "chevron-up" : "chevron-down"}`}></i>
                                    </a>
                                    <ul className="drop-menu">
                                        <li><img src={depositfiat}/>
                                            <Link to="/deposit">{t('Application_euquerodepositar')}
                                                <p>{t("Application_TextoDepositar")}</p>
                                            </Link>
                                        </li>
                                        <li><img src={depositcrypto}/>
                                            <Link to="/account-deposit-cripto">
                                                {t('Application_DepositCrypto')}
                                                <p>{t("Application_TextoDepositarCrypto")}</p>
                                            </Link>
                                        </li>

                                    </ul>


                                </li>

                                <li
                                    onMouseEnter={() => setIsFocusedSaque(true)}
                                    onMouseLeave={() => setIsFocusedSaque(false)}
                                >
                                    <a
                                        href="#"
                                        className={`desktop-item ${isFocusedSaque ? "focused" : ""}`}
                                    >
                                        {t('Application_Saque')}{" "}
                                        <i className={`mdi mdi-${isFocusedSaque ? "chevron-up" : "chevron-down"}`}></i>
                                    </a>
                                    <ul className="drop-menu">
                                        <li><img src={sacarfiat}/>
                                            <Link to="/account-withdraw-fiat">{t('Application_Saque')}
                                                <p>{t("Application_TextoSaqueFiat")}</p>
                                            </Link>
                                        </li>
                                        <li><img src={sacarcrypto}/>
                                            <Link to="/account-withdraw-cripto">
                                                {t('Withdraw crypto')}
                                                <p>{t("Application_TextoSaqueCrypto")}</p>
                                            </Link>
                                        </li>

                                    </ul>


                                </li>

                                <li
                                    onMouseEnter={() => setIsFocusedEmprestimo(true)}
                                    onMouseLeave={() => setIsFocusedEmprestimo(false)}
                                >
                                    <a
                                        href="#"
                                        className={`desktop-item ${isFocusedEmprestimo ? "focused" : ""}`}
                                    >
                                        {t('Application_Emprestimos')}{" "}
                                        <i className={`mdi mdi-${isFocusedEmprestimo ? "chevron-up" : "chevron-down"}`}></i>
                                    </a>
                                    <ul className="drop-menu">
                                        <li><img src={emprestimo}/>
                                            <Link to="/emprestimos">{t('Application_Emprestimos')}
                                                <p>{t("Application_TextoEmprestimo")}</p>
                                            </Link>
                                        </li>


                                    </ul>


                                </li>

                                <li
                                    onMouseEnter={() => setIsFocusedSupport(true)}
                                    onMouseLeave={() => setIsFocusedSupport(false)}
                                >
                                    <a
                                        href="#"
                                        className={`desktop-item ${isFocusedSupport ? "focused" : ""}`}
                                    >
                                        {t('Application_MaisOpcoes')}{" "}
                                        <i className={`mdi mdi-${isFocusedSupport ? "chevron-up" : "chevron-down"}`}></i>
                                    </a>
                                    <ul className="drop-menu">
                                        <li>
                                            <Link to="/support">{t('Application_Supporte')}
                                                <p>{t("Application_TextoSuporte")}</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/ticket/add">
                                                {t('Application_AbrirChamado')}
                                                <p>{t("Application_TextoAbrirChamado")}</p>
                                            </Link>
                                        </li>
                                        <divider></divider>
                                        <li>
                                            <Link to="/notifications">
                                                {t('Application_Notifications')}
                                                <p>{t("Application_TextoNotifications")}</p>
                                            </Link>
                                        </li>
                                        <divider></divider>
                                        <li>
                                            <Link to="/inbox">
                                                {t('Application_Inbox')}
                                                <p>{t("Application_TextoInbox")}</p>
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <Link to="/referal">
                                                {t('Application_Referal')}
                                                <p>{t("Application_TextoReferal")}</p>
                                            </Link>
                                        </li>
                                    </ul>


                                </li>


                            </ul>
                        )
                        }


                        <div className="nav-links-direito-logado">

                            <SelectLanguage onClose={handleCloseModal} />
                            <ComponentAlerta />

                            <ul className="nav-links"

                                onClick={() => {
                                    setIsFocusedPerfil(true);
                                    toggleMenu()
                                }}
                            >
                                <li
                                    onClick={() => setIsFocusedPerfil(true)}

                                >
                                    <a

                                        className={`desktop-item ${isFocusedPerfil ? "focused" : ""}`}
                                    >
                                        <i className="mdi mdi-infinity mdi-24px"></i>
                                        <i className={`mdi mdi-${isFocusedPerfil ? "chevron-up" : "chevron-down"}`}></i>
                                    </a>



                                </li>
                            </ul>



                            </div>


                            <div className={`menu-lateral ${menuOpen ? 'active' : ''}`}
                                onMouseLeave={() => {
                                    toggleMenu();
                                    setIsFocusedPerfil(false);
                                }}>
                                <div className="header-perfil">
                                    <div className="avatar">
                                        <img src={user.avatar} alt="Avatar" />
                                    </div>
                                    <div className="user-info">
                                        <h2>{user.firstName + " " + user.secondName}</h2>
                                        <p>{partiallyHiddenEmail}</p>
                                        <p>{t("Application_CadastradoEm")}: <Moment format="DD/MM/YYYY HH:mm">{user.createdAt}</Moment></p>
                                    </div>

                                    

                                </div>
                                <div className="BtnMenuWhats">
                                    <a
                                        href={`https://wa.me/${Data.CelularAtendimento.replace(/[-()\s]/g, "")}?text=${Msg}`}
                                        className="btn-atendimentoMenu"
                                        target="_blank"
                                    >
                                        <i className="mdi mdi-message-text-outline"></i> {t("Application_FalarComSeugerente")}
                                    </a>

                                    
                                </div>

                                <div className="balance-menu">
                                    {t("Application_Saldo")}{' '}
                                    <div className="usd">
                                        {showBalance ? (
                                            <>
                                                <span>
                                                    <CountUp
                                                        start={0}
                                                        end={props.balanceBRL}
                                                        duration={countUpActive ? 1 : 0}
                                                        separator=","
                                                        decimals={2}
                                                        prefix="$ "
                                                    />
                                                </span>
                                                <i
                                                    className="mdi mdi-eye-off"
                                                    onClick={toggleBalanceVisibility}
                                                    style={{ cursor: 'pointer', marginLeft: '10px' }} // Adicione um espaço à esquerda
                                                ></i>
                                            </>
                                        ) : (
                                            <>
                                                <span>***********</span>
                                                <i
                                                    className="mdi mdi-eye"
                                                    onClick={toggleBalanceVisibility}
                                                    style={{ cursor: 'pointer', marginLeft: '10px' }} // Adicione um espaço à esquerda
                                                ></i>
                                            </>
                                        )}
                                    </div>
                                </div>


                                <ul className="menu-list">
                                    <Link to="/user/editUser" className="menu-link">
                                        <i className="mdi mdi-human-greeting"></i> {t("Account")}
                                    </Link>
                                    <Link to="../contratos" className="menu-link">
                                        <i className="mdi mdi-vector-arrange-above"></i>{" "}
                                        {t("Application_Contratos")}
                                    </Link>
                                    <Link to="/deposit" className="menu-link">
                                        <i className="mdi mdi-coins"></i> {t("Deposit fiat")}
                                    </Link>
                                    <Link
                                        to="/account-deposit-cripto"
                                        className="menu-link"
                                    >
                                        <i className="mdi mdi-coin"></i> {t("Deposit crypto")}
                                    </Link>
                                    <Link
                                        to="/account-withdraw-fiat"
                                        className="menu-link"
                                    >
                                        <i className="mdi mdi-cash-multiple"></i>{" "}
                                        {t("Withdraw fiat")}
                                    </Link>
                                    <Link to="/support" className="menu-link">
                                        <i className="mdi mdi-message-bulleted"></i>{" "}
                                        {t("Application_Support")}
                                    </Link>

                                    <Link to="/user/setup" className="menu-link">
                                        <i className="mdi mdi-cogs"></i>{" "}
                                        {t("Application_Configurations")}
                                    </Link>
                                    
                                </ul>
                                <div className="footerMenu">
                                    <Link
                                        to="/signin"
                                        onClick={() => {
                                            dispatch(User(null));
                                            handleSubmit();
                                        }}
                                        className="btn-logout"
                                    >
                                        <i className="mdi mdi-logout"></i> {t("Logout")}
                                    </Link>

                                    <div>versão build <Moment format="YYYY"></Moment>.{packageJson.version}</div>
                                </div>
                            </div>
                       
                    </>

                )}






            </div>
            
        </div>
        
        
    </>);
}

export default Header;