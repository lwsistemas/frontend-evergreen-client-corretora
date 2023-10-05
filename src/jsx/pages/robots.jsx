import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import TradingViewWidget2 from '../element/dashboard/TradingViewWidget';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@mui/material';
import { Button } from 'react-bootstrap';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Header2 from '../layout/header2';
import Sidebar from "../layout/sidebar/sidebar";
import Footer2 from '../layout/footer2';
import axios from '../../services/index'
import "../../css/contrato.css"
import { User } from '../store/User/User.action'
import BottomBar from "../layout/sidebar/bottom-bar";
import { Loader } from "./home/components/loader";


function Exchange() {
    const user = useSelector(state => state.user)
    const { t } = useTranslation()
    const parametros = useParams();
    const [currencyTrade, setCurrencyTrade] = useState("")
    const [coinId, setCoinId] = useState("")
    const [coinSimbolo, setCoinSimbolo] = useState("")
    const [model, setModel] = useState(0)
    const [perfil, setPerfil] = useState(0)
    const [balance, setBalance] = useState(0)
    const [stopType, setStopType] = useState(0)
    const [stopWin, setStopWin] = useState(0)
    const [stopLoss, setStopLoss] = useState(0)
    const [BBS, setBBS] = useState(0)
    const [MACD, setMACD] = useState(0)
    const [RSI, setRSI] = useState(0)
    const [volume, setVolume] = useState(0)
    const [token, setToken] = useState("")
    const [erroModel, setErroModel] = useState(false)
    const [erroBalance, setErroBalance] = useState(false)
    const [erroToken, setErroToken] = useState(false)
    const [messageModel, setMessageModel] = useState("")
    const [messageBalance, setMessageBalance] = useState("")
    const [messageToken, setMessageToken] = useState("")
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()



    //================== Functions =====================
    const validateData = async (e) => {
        e.preventDefault();
        const modelValid = handleModel()
        const tokenValid = handleToken()
        const balanceValid = await handleBalance()

        if (modelValid == true && tokenValid == true && balanceValid == true) {
            await handleSubmitData()
        } else {
            return
        }

    }
    const handleSubmitData = async (e) => {
        const request = {
            authKey: user.authKey,
            modelodeordem: model,
            perfilinvestidor: perfil,
            valor: balance,
            tipoparada: stopType,
            stopwin: stopWin,
            stoploss: stopLoss,
            bbs: BBS,
            rsi: RSI,
            macd: MACD,
            volume: volume,
            token: token,
            moedaUID: coinId,
            moedaSimbolo: coinSimbolo

        }
        try {
            const response = await axios.post("marketinvestment", request)
            openDialog()
        } catch (error) {
            setErroToken(true)
            setMessageToken(t('Message_Invalide_Token'))
            console.log(error)
        }
    }

    const handleModel = () => {
        if (model == 0) {
            setErroModel(true)
            setMessageModel(t('Message_Select_Option'))
            return false
        } else {
            setErroModel(false)
            return true
        }
    }

    const handleBalance = async () => {
        const response = await axios.put("wallet/0", { authKey: user.authKey })
        const defaultBalance = response.data["wallet"].balance

        if (balance > defaultBalance) {
            setErroBalance(true)
            setMessageBalance(t('Unavailable_Balance'))
            return false
        } else {
            setErroBalance(false)
            return true
        }
    }

    const handleToken = () => {
        if (token == "") {
            setErroToken(true)
            setMessageToken(t('Message_Invalide_Token'))
            return false
        } else {
            setErroToken(false)
            return true
        }
    }

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        window.location.href = '/robos';
    };

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

    //==========================Effect=====================================

    useEffect(async () => {
        await validUser()
    }, [])

    useEffect(() => {
        setIsLoading(true)
        let splitCoin = parametros.Strid.split("&")
        setCoinSimbolo(splitCoin[0])
        setCoinId(splitCoin[1])
        setCurrencyTrade(splitCoin[0] + "USDT")
        setIsLoading(false)
    },);

    useEffect(() => { }, [model]);

    useEffect(() => { }, [perfil]);

    useEffect(() => { handleBalance() }, [balance]);

    useEffect(() => { }, [stopType]);

    useEffect(() => { }, [stopWin]);

    useEffect(() => { }, [stopLoss]);

    useEffect(() => { }, [BBS]);

    useEffect(() => { }, [RSI]);

    useEffect(() => { }, [MACD]);

    useEffect(() => { }, [volume]);

    useEffect(() => { }, [token]);

    useEffect(() => { }, [isDialogOpen]);

    return (
        <>
            <Header2 />
            <Sidebar selectedItem={"markets"} />
            {isLoading ? (
                <Loader />
            ) : (<div className="content-body">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">{currencyTrade}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="buy-sell-widget">
                                        <form method="post" name="myform" className="currency_validate" onSubmit={validateData}>
                                            <div className="form-group">
                                                <label className="mr-sm-2">{t('Application_Modelo')}</label>
                                                <select name='currency' className="form-control" onChange={e => setModel(e.target.value)}>
                                                    <option data-display="Selecionar" value={0}>{t('Application_Selecionar')}</option>
                                                    <option value={1}>{t('Application_OrdemPendente')}</option>
                                                    <option value={2}>{t('Application_ExecucaoInstantanea')}</option>
                                                </select>
                                                <div className={"text-danger " + (!erroModel ? "d-none" : "")}>
                                                    {messageModel}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="mr-sm-2">{t('Application_Perfil')}</label>
                                                <div className="input-group mb-3">
                                                    <select name='currency' className="form-control" onChange={e => setPerfil(e.target.value)}>
                                                        <option data-display={t('Application_Agressivo')} value={0} >{t('Application_Agressivo')}</option>
                                                        <option data-display={t('Application_Moderador')} value={1}>{t('Application_Moderador')}</option>
                                                        <option data-display={t('Application_Convservador')} value={2}>{t('Application_Convservador')}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div class='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_Saldo')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setBalance(e.target.value)} />
                                                        <div className={"text-danger " + (!erroBalance ? "d-none" : "")}>
                                                            {messageBalance}
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_TipoStop')}</label>
                                                        <select name='currency' className="form-control" onChange={e => setStopType(e.target.value)}>
                                                            <option data-display={t('Application_Valor')} value={0}>{t('Application_Valor')}</option>
                                                            <option data-display={t('Application_Porcentagem')} value={1}>{t('Application_Porcentagem')}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_StopWin')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setStopWin(e.target.value)} />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_StopLoss')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setStopLoss(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_BBS')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setBBS(e.target.value)} />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_RSI')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setRSI(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_MACD')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setMACD(e.target.value)} />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label className="mr-sm-2">{t('Application_Volume')}</label>
                                                        <input
                                                            type="text"
                                                            name="currency_amount"
                                                            className="form-control"
                                                            placeholder="0"
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setVolume(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label>Token</label>
                                                    <input type="text" name="currency_amount"
                                                        className="form-control" placeholder={t('Application_DigiteToken')} onChange={e => setToken(e.target.value)} />
                                                    <div className={"text-danger " + (!erroToken ? "d-none" : "")}>
                                                        {messageToken}
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="submit" className="btn btn-success" value={t('Button_Success_Confirure_Robot')} />
                                            <Dialog className='dialog' open={isDialogOpen} onClose={closeDialog}>
                                                <div className='dialog-content'>
                                                    <DialogTitle> {
                                                        <div >
                                                            <h2 className='text-success'>PARABÉNS</h2>
                                                            <div>Mercado configurado com sucesso !</div>
                                                        </div>}
                                                    </DialogTitle>
                                                    <DialogActions>

                                                        <Button onClick={closeDialog}
                                                            color="primary" autoFocus>
                                                            Fechar
                                                        </Button>
                                                    </DialogActions>
                                                </div>
                                            </Dialog>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">{t('Application_SetupMercados')}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="tradingview-widget-container card"
                                        style={
                                            { "height": "635px" }
                                        }>
                                        {
                                            < TradingViewWidget2 symbol={currencyTrade}
                                            />
                                        } </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <BottomBar selectedIcon={"markets"} />
        </>
    )
}

export default Exchange;