import React, {useState, useEffect} from "react";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from "../layout/sidebar/sidebar";
import ButtonsUser from "../element/ButtonsUser";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import CurrencyFormat from "react-currency-format";
import axios from "../../services/index";
import "../../css/account/account-wallet.css";
import {Loader} from "./home/components/loader";
import {Link} from "react-router-dom";
import {User} from '../store/User/User.action'
import BottomBar from "../layout/sidebar/bottom-bar";

const currencies = [];
currencies[0] = "BRL";
currencies[1] = "BTC";
currencies[2] = "LTC";
currencies[825] = "USD";
currencies[1027] = "ETH";
currencies[12345] = "IDSUEX";

function MyWallet() {
    const user = useSelector((state) => state.user);
    const {t} = useTranslation();
    const [history, setHistory] = useState([]);
    const [balance, setBalance] = useState([]);
    const [coinsByUser, setCoinsByUser] = useState();
    const [balanceCriptomoeda, setbalanceCriptomoeda] = useState();
    const [dataCriptomoeda, setdataCriptomoeda] = useState();
    const [balanceBRL, setBalanceBRL] = useState();
    const [lastModifyBRL, setLastModifyBRL] = useState();
    const [lastModify, setLastModify] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

    const [considerarSaldosZero, setConsiderarSaldosZero] = useState(false);

    const handleCheckboxChange = () => {
        setConsiderarSaldosZero(!considerarSaldosZero);
    };


    const getBalanceAll = async () => {
        try {
            const balanceAtivos = (await axios.post(`/wallet/all`, {authKey: user.authKey})).data;
            setbalanceCriptomoeda(balanceAtivos.totalBalanceUSD)
            setdataCriptomoeda(balanceAtivos.wallets)
            return balanceAtivos;
        } catch (err) {

            return err.response;
        }
    };

    const getBalances = async (currency) => {
        try {
            const balance = (await axios.put(`/wallet/0`, {authKey: user.authKey})).data;
            setBalance(balance.wallet.balance);
            return balance;
        } catch (err) {
            //console.log("aqui");
            return err.response;
        }
    };


    function formatNumberWithTwoDecimalPlaces(numberString) {
        let number = parseFloat(numberString);
        let magnitude = Math.pow(10, Math.floor(Math.log10(number)) + 1);

        if (magnitude > 1) {
            return number.toFixed(2);
        } else {
            let decimalPlaces = Math.max(2, Math.abs(Math.floor(Math.log10(number))));
            return number.toFixed(decimalPlaces);
        }
    }

    const validUser = async () => {
        try {
            const valid = await axios.put("user/validUser", {
                authKey: user.authKey,
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status == 406) {
                    console.log("invalid user");
                    dispatch(User(null));
                } else {
                    console.log("Unexpected error");
                }
            } else {
                console.log("Unexpected error 404");
            }
        }
    };

    useEffect(() => {
        // Montando o componente
        const intervalId = setInterval(async () => {
            await getBalanceAll();
            await getBalances();
        }, 5000);

        return () => {
            // Desmontando o componente
            clearInterval(intervalId);
        };
    }, [considerarSaldosZero]); // A dependência vazia garante que este efeito seja executado apenas uma vez ao montar o componente


    useEffect(async () => {
        setIsLoading(true);
        await validUser();
        await getBalanceAll();
        await getBalances();
        setIsLoading(false);
    }, []);


    return (<>
            {isLoading ? (<Loader/>) : (<>
                <Header2 title={t("Your wallet")}/>

                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card acc_balance">

                                            <div className="card-body">
                                                <ButtonsUser/>
                                            </div>
                                            <div className="d-flex flex-column card-body py-4 align-items-center">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={considerarSaldosZero}
                                                        onChange={handleCheckboxChange}
                                                    /> {" "}
                                                    {t("Application_NaoMostrarSaldoZero")}
                                                </label>
                                                <span className="text-center text-uppercase">
                            {t("Total wallet")}
                          </span>
                                                <h3 className="text-center mt-1">
                                                    {Intl.NumberFormat("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                        minimumFractionDigits: 2,
                                                    }).format(balance + balanceCriptomoeda)}
                                                </h3>
                                                {/* <div className="d-flex mt-3" style={{ gap: "8px" }}>
                            <Link to="/exchangePro">
                              <button className="btn btn-success">{t("Application_exchangePro")}</button>
                            </Link>
                            <Link to="/deposit">
                              <button className="btn btn-primary">{t("Deposit fiat")}</button>
                            </Link>
                          </div> */}
                                            </div>
                                            <div className="card-body">
                                                <div className="balance-list">


                                                    {dataCriptomoeda
                                                        .filter(data => !considerarSaldosZero || data.balance !== 0)
                                                        .filter(data => ![12341, 12342, 123413, 123414, 12345, 12343].includes(data.type))
                                                        .sort((a, b) => b.balance - a.balance) // Agora ordena do menor para o maior
                                                        .map((data) => (<div
                                                            className="card-body balance-card"
                                                            style={{background: "#191e2b"}}
                                                            key={data.name}
                                                        >
                                                            <div className="balance-row">
                                                                <div className="d-flex content-icon">
                                                                    <img
                                                                        src={`https://evergreenbroker.co.uk/${data.walletImg}`}
                                                                        alt={data.name}/>
                                                                    <h4 className="coin">{data.name}</h4>
                                                                </div>

                                                                <div
                                                                    className="d-flex flex-column content-prices"
                                                                    style={{alignItems: "end"}}
                                                                >
                                      <span className="balance" style={{fontSize: "18px"}}>
                                        {data.balance.toFixed(6)}
                                      </span>
                                                                    <span className="text-bold text-white">
                                        ≅ {" "}
                                                                        <CurrencyFormat
                                                                            value={data.balanceUSD.toFixed(2)}
                                                                            decimalScale={2}
                                                                            displayType={"text"}
                                                                            thousandSeparator={true}
                                                                        /> {" "} USD
                                      </span>
                                                                </div>
                                                            </div>
                                                        </div>))}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomBar selectedIcon="wallet"/>
            </>)}
        </>

    )
}

export default MyWallet;
