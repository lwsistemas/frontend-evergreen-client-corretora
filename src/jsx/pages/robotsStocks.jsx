import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TradingViewWidget2 from '../element/dashboard/TradingViewWidget';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import Footer2 from '../layout/footer2';
import axios from '../../services/index';
import '../../css/contrato.css';
import { User } from '../store/User/User.action';
import BottomBar from '../layout/sidebar/bottom-bar';
import { Loader } from './home/components/loader';

function Exchange() {
    const history = useHistory();
    const user = useSelector(state => state.user);
    const { t } = useTranslation();
    const parametros = useParams();
    const [currencyTrade, setCurrencyTrade] = useState('');
    const [Compositefigi, setCompositefigi] = useState('');
    const [coinId, setCoinId] = useState('');
    const [coinSimbolo, setCoinSimbolo] = useState('');
    const [model, setModel] = useState(0);
    const [perfil, setPerfil] = useState(0);
    const [balance, setBalance] = useState(0);
    const [saldoRemanecente, setsaldoRemanecente] = useState(0);
    const [Posicao, setPosicao] = useState(0);
    const [MediaMoveis, setMediaMoveis] = useState(0);
    const [stopLoss, setStopLoss] = useState(0);
    const [BBS, setBBS] = useState(0);
    const [volumeStock, setVolumeStock] = useState(0); // Corrigido o nome do estado
    const [RSI, setRSI] = useState(0);
    const [RsiStock, setRsiStock] = useState(0);
    const [token, setToken] = useState('');
    const [erroModel, setErroModel] = useState(false);
    const [erroBalance, setErroBalance] = useState(false);
    const [erroToken, setErroToken] = useState(false);
    const [messageModel, setMessageModel] = useState('');
    const [messageBalance, setMessageBalance] = useState('');
    const [messageToken, setMessageToken] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [StockData, setStockData] = useState(true);
    const [ValorCompraTotal, setValorCompraTotal] = useState(0.0);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [shares, setShares] = useState(0);
    const [saldoInsuficiente, setSaldoInsuficiente] = useState(false);
    const [sharesError, setSharesError] = useState('');
    const [volumeError, setVolumeError] = useState('');
    const [rsiError, setRsiError] = useState('');
    const [mediasMoveisError, setMediasMoveisError] = useState('');
    const [codBankError, setCodBankError] = useState('');
    const [passcodError, setPasscodError] = useState('');
    const [isButtonDisabled, setisButtonDisabled] = useState(false)
    const dispatch = useDispatch();
    const handleSharesChange = (e) => {
        const newShares = e.target.value;
        setShares(newShares);

        const total = StockData.last_price * newShares;
        setValorCompraTotal(total);
        setsaldoRemanecente(balance - total);

        if (total && newShares && balance) {
            if (total > balance) {
                setSaldoInsuficiente(true);
                setShares(0); // Zere o campo Shares
            } else {
                setSaldoInsuficiente(false);
            }
        }
    };

    const validateShares = (value) => {
        if (!value) {
            setSharesError('Campo obrigatório');
            return false;
        } else if (!/^[0-9]+$/.test(value)) {
            setSharesError('Apenas números são permitidos');
            return false;
        } else {
            setSharesError('');
            return true;
        }
    };

    // Função de validação para o campo de volume
    const validateVolume = (value) => {
        if (!value) {
            setVolumeError('Campo obrigatório');
            return false;
        } else if (!/^[0-9.,]+$/.test(value)) {
            setVolumeError('Apenas números, pontos e vírgulas são permitidos');
            return false;
        } else {
            setVolumeError('');
            return true;
        }
    };

    // Função de validação para o campo de RSI
    const validateRSI = (value) => {
        if (!value) {
            setRsiError('Campo obrigatório');
            return false;
        } else if (!/^[a-zA-Z0-9.,]+$/.test(value)) {
            setRsiError('Apenas números, pontos e vírgulas são permitidos');
            return false;
        } else {
            setRsiError('');
            return true;
        }
    };

    // Função de validação para o campo de médias móveis
    const validateMediasMoveis = (value) => {
        if (!value) {
            setMediasMoveisError('Campo obrigatório');
            return false;
        } else if (!/^[0-9.,]+$/.test(value)) {
            setMediasMoveisError('Apenas números, pontos e vírgulas são permitidos');
            return false;
        } else {
            setMediasMoveisError('');
            return true;
        }
    };

    // Função de validação para o campo de codBank
    const validateCodBank = (value) => {
        if (!value) {
            setCodBankError('Campo obrigatório');
            return false;
        } else if (!/^[a-zA-Z0-9.,]+$/.test(value)) {
            setCodBankError('Apenas números, pontos e vírgulas são permitidos');
            return false;
        } else {
            setCodBankError('');
            return true;
        }
    };

    // Função de validação para o campo de passcod
    const validatePasscod = (value) => {
        if (!value) {
            setPasscodError('Campo obrigatório');
            return false;
        } else if (!/^[0-9]+$/.test(value)) {
            setPasscodError('Apenas números, pontos e vírgulas são permitidos');
            return false;
        } else {
            setPasscodError('');
            return true;
        }
    };


    const validUser = async () => {
        try {
            const valid = await axios.put('user/validUser', {
                authKey: user.authKey,
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status == 406) {
                    console.log('invalid user');
                    dispatch(User(null));
                } else {
                    console.log('Unexpected error');
                }
            } else {
                console.log('Unexpected error 404');
            }
        }
    };

    const getStock = async () => {
        try {
            const stockData = await axios.get(`/price/Stocks/${parametros.id}`);
            setStockData(stockData.data);
        } catch (err) {
            return err.response;
        }
    };

    const validateData = (e) => {
        e.preventDefault();
        const sharesValid = validateShares(shares);
        const volumeValid = validateVolume(volumeStock);
        const rsiValid = validateRSI(RsiStock);
        const mediasMoveisValid = validateMediasMoveis(MediaMoveis);
        const codBankValid = validateCodBank(Compositefigi);
        const passcodValid = validatePasscod(token);
        const posicaoValid = handleModel(Posicao)

        if (sharesValid && volumeValid && rsiValid && mediasMoveisValid && codBankValid && passcodValid && posicaoValid) {
            setisButtonDisabled(true)
            handleSubmitData();
        }
    };

    const handleSubmitData = async () => {
        const requestForm = {
            authKey: user.authKey,
            posicao: Posicao,
            valorCompra: ValorCompraTotal,
            mediaMoveis: MediaMoveis,
            shares: shares,
            codbank: Compositefigi,
            volumeStock: volumeStock,
            rsiStock: RsiStock,
            passCod: token,
            moedaUID: StockData.id,
            moedaSimbolo: StockData.ticker,
            checkOperarDM: isCheckboxChecked
        };
        try {
            const response = (await axios.post('marketinvestment/Stocks', requestForm)).data;
            if (response.success === true) {
                openDialog();
                console.log(response.success)
            }

        } catch (error) {
            setErroToken(true);
            setMessageToken(t('Message_Invalide_Token'));
            console.log(error);
            setisButtonDisabled(false)
        }
    };

    const handleModel = () => {
        if (Posicao === 0) {
            setErroModel(true);
            setMessageModel(t('Message_Select_Option'));
            return false;
        } else {
            setErroModel(false);
            return true;
        }
    };

    const handleBalance = async () => {
        const response = await axios.put("wallet/0", { authKey: user.authKey });
        const defaultBalance = response.data["wallet"].balance;
        setsaldoRemanecente(defaultBalance);
        setBalance(defaultBalance);

        if (balance > defaultBalance) {
            setErroBalance(true);
            setMessageBalance(t('Unavailable_Balance'));
            return false;
        } else {
            setErroBalance(false);
            return true;
        }
    };

    const handleToken = () => {
        if (token === '') {
            setErroToken(true);
            setMessageToken(t('Message_Invalide_Token'));
            return false;
        } else {
            setErroToken(false);
            return true;
        }
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        history.push('/robos');
    };


    useEffect(async () => {
        await validUser();
        await getStock();
        await handleBalance();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        let splitCoin = parametros.Strid.split('&');
        let splitCoinID = parametros.id.split('&');
        setCoinSimbolo(splitCoin[0]);
        setCoinId(splitCoin[1]);
        setCurrencyTrade(splitCoin[0]);
        setCompositefigi(splitCoinID);
        setIsLoading(false);
    }, []);


    return (
        <>
            <Header2 />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">
                                            {t('Application_SetupStocks')} / {currencyTrade} - FIGI: {Compositefigi}
                                        </h4>
                                        <span style={{ fontSize: '26px', color: 'gray', fontWeight: '800' }}>
                                            Lotes: {Intl.NumberFormat('en', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(StockData.last_price * StockData.QtdLote)}
                                        </span>
                                        <span style={{ fontSize: '16px', color: 'gray', fontWeight: '800' }}>
                                            Qtd ações por Lote: {StockData.QtdLote}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <div
                                            className="tradingview-widget-container card"
                                            style={{ height: '635px' }}
                                        >
                                            <TradingViewWidget2 symbol={currencyTrade} id="robots" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">{currencyTrade} / {StockData.msh_id}</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="buy-sell-widget">
                                            <form method="post" name="myform" className="currency_validate" onSubmit={validateData}>
                                                <div className="row mt-3">
                                                    <div className="col-md-4">
                                                        <label className="mr-sm-2">{t('Application_Shares')}</label>
                                                        <input
                                                            type="text"
                                                            name="shares"
                                                            className="form-control"
                                                            inputMode="number" // Define o modo de entrada como decimal
                                                            pattern="[0-9]*" // Aceita números, pontos e vírgulas
                                                            onKeyPress={(e) => {
                                                                // Verifica se o caractere não é um número, ponto ou vírgula
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);

                                                                if (!/^[0-9]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={handleSharesChange}
                                                        />

                                                        {saldoInsuficiente && (
                                                            <div className="text-danger">Saldo insuficiente para essa compra.</div>
                                                        )}

                                                        <div className={'text-danger ' + (validateShares ? '' : 'd-none')}>
                                                            {sharesError}
                                                        </div>



                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="mr-sm-2">{t('Application_VolumeStock')}</label>
                                                        <input
                                                            type="text"
                                                            name="volumestock"
                                                            className="form-control"

                                                            inputMode="decimal" // Define o modo de entrada como decimal
                                                            pattern="[0-9]*" // Aceita números, pontos e vírgulas
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setVolumeStock(e.target.value)}
                                                        />
                                                        <div className={'text-danger ' + (validateVolume ? '' : 'd-none')}>
                                                            {volumeError}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="mr-sm-2">{t('Application_SaldoStock')}</label>
                                                        <input
                                                            type="text"
                                                            name="balance"
                                                            className="form-control"

                                                            readOnly={false}
                                                            value={Intl.NumberFormat('en', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(parseFloat(saldoRemanecente).toFixed(2))}
                                                            onKeyPress={e => {
                                                                const keyCode = e.which || e.keyCode;
                                                                const keyValue = String.fromCharCode(keyCode);
                                                                if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={e => setBalance(e.target.value)}
                                                        />
                                                        <div className={'text-danger ' + (!erroBalance ? 'd-none' : '')}>
                                                            {messageBalance}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row mt-3">
                                                        <div class="col-md-4">
                                                            <label className="mr-sm-2">{t('Application_RSIStock')}</label>
                                                            <input
                                                                type="text"
                                                                name="rsistock"
                                                                className="form-control"

                                                                inputMode="decimal" // Define o modo de entrada como decimal
                                                                pattern="[0-9]*" // Aceita números, pontos e vírgulas
                                                                onKeyPress={e => {
                                                                    const keyCode = e.which || e.keyCode;
                                                                    const keyValue = String.fromCharCode(keyCode);
                                                                    if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                onChange={e => setRsiStock(e.target.value)}
                                                            />
                                                            <div className={'text-danger ' + (validateRSI ? '' : 'd-none')}>
                                                                {rsiError}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="mr-sm-2">{t('Application_MediasMoveis')}</label>
                                                            <input
                                                                type="text"
                                                                name="mediamoveis"
                                                                className="form-control"

                                                                onKeyPress={e => {
                                                                    const keyCode = e.which || e.keyCode;
                                                                    const keyValue = String.fromCharCode(keyCode);
                                                                    if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                onChange={e => setMediaMoveis(e.target.value)}
                                                            />
                                                            <div className={'text-danger ' + (validateMediasMoveis ? '' : 'd-none')}>
                                                                {mediasMoveisError}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="mr-sm-2">{t('Application_Posicao')}</label>
                                                            <select name="posicao" className="form-control" onChange={e => setPosicao(e.target.value)}>
                                                                <option data-display="Selecionar" value={0}>{t('Application_Selecionar')}</option>
                                                                <option data-display={t('Application_Comprada')} value={0}>
                                                                    {t('Application_Comprada')}
                                                                </option>
                                                                <option data-display={t('Application_Vendedora')} value={1}>
                                                                    {t('Application_Vendedora')}
                                                                </option>
                                                                <option data-display={t('Application_CFDS')} value={1}>
                                                                    {t('Application_CFDS')}
                                                                </option>
                                                            </select>
                                                            <div className={"text-danger " + (!erroModel ? "d-none" : "")}>
                                                                {messageModel}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-4">
                                                            <label className="mr-sm-2">{t('Application_CodBank')}</label>
                                                            <input
                                                                type="text"
                                                                name="CodBank"
                                                                className="form-control"

                                                                value={Compositefigi}
                                                                readOnly={false}
                                                                onKeyPress={e => {
                                                                    const keyCode = e.which || e.keyCode;
                                                                    const keyValue = String.fromCharCode(keyCode);
                                                                    if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                onChange={e => setCompositefigi(e.target.value)}
                                                            />
                                                            <div className={'text-danger ' + (validateCodBank ? '' : 'd-none')}>
                                                                {codBankError}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="mr-sm-2">{t('Application_PassCod')}</label>
                                                            <input
                                                                type="text"
                                                                name="token"
                                                                className="form-control"

                                                                onKeyPress={e => {
                                                                    const keyCode = e.which || e.keyCode;
                                                                    const keyValue = String.fromCharCode(keyCode);
                                                                    if (!/^[0-9.,]+$/.test(keyValue)) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                onChange={e => setToken(e.target.value)}
                                                            />
                                                            <div className={'text-danger ' + (validatePasscod ? '' : 'd-none')}>
                                                                {passcodError}
                                                            </div>
                                                            <div className={"text-danger " + (!erroToken ? "d-none" : "")}>
                                                                {messageToken}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div style={{ marginTop: '36px' }}>
                                                                <button
                                                                    type="submit"
                                                                    disabled={isButtonDisabled}
                                                                    className={`btn btn-success ${isCheckboxChecked ? '' : 'disabled'}`}
                                                                    onClick={(e) => {
                                                                        if (!isCheckboxChecked) {
                                                                            e.preventDefault(); // Impede o envio da solicitação se a caixa de seleção não estiver marcada
                                                                        }
                                                                    }}
                                                                >
                                                                    {t('Application_IniciarOperacao')} <i className="fa fa-play"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="confirmOperation"
                                                        checked={isCheckboxChecked}
                                                        onChange={e => setIsCheckboxChecked(e.target.checked)}
                                                    />
                                                    <label className="form-check-label" htmlFor="confirmOperation">
                                                        {t('Application_ConfirmarOperarStock')}
                                                    </label>
                                                </div>
                                                <div className="m-3 col-md-12">
                                                    <div className={`text-right m-4 ${saldoInsuficiente ? 'text-danger' : 'text-success'}`} style={{ fontSize: '22px' }}>
                                                        {t('Application_ValorTotal')}{' '}
                                                        {Intl.NumberFormat('en', {
                                                            currency: 'USD',
                                                        }).format(ValorCompraTotal)}
                                                    </div>
                                                </div>
                                                <Dialog className="dialog" open={isDialogOpen} onClose={closeDialog}>
                                                    <div className="dialog-content">
                                                        <DialogTitle>
                                                            <div>
                                                                <h2 className="text-success">PARABÉNS</h2>
                                                                <div>Mercado configurado com sucesso !</div>
                                                            </div>
                                                        </DialogTitle>
                                                        <DialogActions>
                                                            <Button onClick={closeDialog} color="primary" autoFocus>
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
                        </div>
                    </div>
                </div>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    );
}

export default Exchange;
