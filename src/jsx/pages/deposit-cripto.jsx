import React, { useEffect, useState, comp } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header2 from "../pages/home/HeaderMenu";
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import { useSelector, useDispatch } from 'react-redux'
import OrderModal from '../element/Ordermodal'
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';
import QRCode from "react-qr-code";
import { Tab, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

function Security() {
    const { t } = useTranslation()
    const user = useSelector(state => state.user)
    const parametros = useParams();
    const [currencyTrade, setCurrencyTrade] = useState(parametros.Strid)
    const [Redechain, setRedeChain] = useState('block')
    const [mostraQr, setmostraQR] = useState('block')
    const [Ideredechain, setIdredeChain] = useState(0)
    const [selectRedeChain, setSelectRedeChain] = useState(0)
    const [show, setShow] = useState(false);
    const [operationProps] = useState({});
    const [direction, setDirection] = useState();
    const [matches, setMatches] = useState(window.matchMedia("(min-width: 500px)").matches)
    const [walletAll, setwalletAll] = useState([]);
    const [walletRede, setwalletRede] = useState([]);
    const [initValue, setInitValue] = useState(0)
    const [initRede, setinitRede] = useState([])
    const [address, setAddress] = useState()
    const [confirmations, setconfirmations] = useState()
    const [valorMin, setvalorMin] = useState()
    const [disabled, setDisabled] = useState('true')
    const [colorButton, setColorButton] = useState({ backgroundColor: '#bf0202', borderColor: '#bf0202' })
    const dispatch = useDispatch()

    const validateData = async (e) => {
        e.preventDefault();
    }

    const handleChange = async (e) => {
       reset()
        
        if (e == '0') {
            setmostraQR('block')
        }

        setinitRede(e)
        await getWalletRede(e, currencyTrade)
    }

    const reset = async () => {
        setAddress('')
    }

    const disabledButton = async (address, initValue) => {
        console.log("endereço: ", address, "  inivalue", initValue)
        if (initValue > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }

    }


    const setDisabledButton = async (value) => {
        if (value) {
            setDisabled('true')
            setColorButton({ backgroundColor: '#bf0202', borderColor: '#bf0202' })
            console.log(value)
        } else {
            setDisabled('false')
            setColorButton({ backgroundColor: '#10d876', borderColor: '#10d876' })
            console.log(value)
        }

    }

    const getWalletBusiness = async () => {
        try {
            const walletAll = await axios.post(`/payment/walletBusiness/${currencyTrade}`, { authKey: user.authKey })
            setwalletAll(walletAll.data);
            return walletAll;
        } catch (err) {
            return err.response;
        }
    };

    const getWalletRede = async (rede, cripto) => {
        try {
            const walletRede = await axios.post(`/payment/walletRede/${cripto}/${rede}`, { authKey: user.authKey })
            setwalletRede(walletRede.data);
            setAddress(walletRede.data.Hash)
            setinitRede(walletRede.data.Rede)
            setconfirmations(walletRede.data.confirmatiions)
            setvalorMin(walletRede.data.depositMin)
            setmostraQR('none')
            return walletRede;

        } catch (err) {
            return err.response;
        }
    };



    useEffect(async () => {
        await getWalletBusiness()
    }, [])

    useEffect(async () => {
        if (currencyTrade == 'USDT' && currencyTrade == 'BTC') {
            setRedeChain("none")

        } else {

            setRedeChain("none")


        }

    }, [])


    return (
        <>
            <Header2 title={t('Deposit crypto')} />
            <OrderModal show={show} operationProps={operationProps} />
            
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='card-title'>
                                        <div className='card-header'>
                                            <a href='/account-deposit-cripto' >
                                                <span style={{ fontSize: '32px;' }}>
                                                    <i className='fa fa-arrow-left'></i> {t('Application_Deposit')}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <form method="post" name="myform" className="currency_validate" onSubmit={validateData}>
                                            {Redechain == "none" && currencyTrade == 'USDT' &&

                                                <div class={"form-group col-md-12"} >
                                                    <div class="input-group">
                                                        <div class="input-group">
                                                            <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                                {t('Application_redeChain')}</span>
                                                            <select name='rede' className='form-control' required onChange={e => {
                                                                handleChange(e.target.value)
                                                                setinitRede(e.target.value)
                                                            }
                                                            } >
                                                                <option data-display="Selecionar" value={0}>{t('Application_Selecionar')}</option>
                                                                <option value={"BEP20"}>BNB Smart Chain(BEP20)</option>
                                                                <option value={"TRC20"}>Tron(TRC20)</option>

                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>


                                            }

                                            {Redechain == "none" && currencyTrade == 'BTC' &&

                                                <div class={"form-group col-md-12"} >
                                                    <div class="input-group">
                                                        <div class="input-group">
                                                            <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                                {t('Application_redeChain')}</span>
                                                            <select name='rede' className='form-control' required onChange={e => {
                                                                handleChange(e.target.value)
                                                                setinitRede(e.target.value)
                                                            }
                                                            } >
                                                                <option data-display="Selecionar" value={0}>{t('Application_Selecionar')}</option>
                                                                <option value={"BTC"}>BITCOIN(BTC)</option>


                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>


                                            }

                                            {Redechain == "none" && currencyTrade == 'ETH' &&

                                                <div class={"form-group col-md-12"} >
                                                    <div class="input-group">
                                                        <div class="input-group">
                                                            <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                                {t('Application_redeChain')}</span>
                                                            <select name='rede' className='form-control' required onChange={e => {
                                                                handleChange(e.target.value)
                                                                setinitRede(e.target.value)
                                                            }
                                                            } >
                                                                <option data-display="Selecionar" value={0}>{t('Application_Selecionar')}</option>
                                                                <option value={"ETH"}>Etherium(ETH)</option>


                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>


                                            }

                                            {mostraQr == "none" &&
                                                <div class="form-group col-md-12">

                                                    <div className='row justify-content-md-center'>
                                                        <QRCode
                                                            title="GeeksForGeeks"
                                                            value={`${address}`}
                                                            size={"25%"}
                                                        />
                                                    </div>

                                                    <div className=' row justify-content-md-center mt-2'>
                                                        {address}
                                                    </div>



                                                    {/* <div class="input-group">
                                                    <div class="input-group">
                                                        <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                            {t('Address')}</span>
                                                        <input type="text"
                                                            name="currency_amount"
                                                            autoComplete="off"
                                                            value={address}
                                                            class="form-control text-right"
                                                            placeholder={t('Application_SelecionaUmaRede')}
                                                            


                                                        />
                                                    </div>
                                                </div> */}


                                                    <div className='m-2'>
                                                        <p>{t('Application_ValorMinimo')} {' '} {valorMin}</p>

                                                        <p>{t('Application_Confirmacoes')} {' '} {confirmations}</p>
                                                    </div>



                                                </div>

                                            }

                                            <div class="form-group col-md-12">
                                                <div class="input-group">
                                                    <div class="input-group">
                                                        <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                            {t('Valor')}</span>
                                                        <input type="text"
                                                            id="input-example"
                                                            name="input-name"
                                                            autoComplete="off"
                                                            value={initValue}
                                                            class="form-control text-right"
                                                            placeholder={t("Application_ValorDeposito")}
                                                            onChange={(text) => {
                                                                setInitValue(text.target.value)
                                                                disabledButton(text.target.value, initValue)
                                                                //handleCheckSaldo(text.target.value)
                                                            }}



                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div class={"form-group col-md-12"} >

                                                <h3>{t('Application_euquerodepositar')} <strong className='text-primary'>{currencyTrade}</strong> {t('Application_viaRede')} <span className='text-primary'>{initRede}. </span> </h3>
                                                <h3 className='text-primary'>USD <CurrencyFormat value={initValue} decimalScale={7} displayType={'text'} thousandSeparator={true} /> </h3>
                                                <p >Válido apenas para depósito em {currencyTrade} da rede . Se você depositar incorretamente, te custará taxas altas e imenso tempo pela recuperação de ativos. Você até poderá perder seus ativos permanentemente pelo erro.</p>
                                            </div>

                                            <Button variant="primary mt-4" type="submit" disabled={
                                                initValue <= 9.99 ? true : false
                                            }>
                                                {t("Application_ConfirmarDeposito")} <i className="fa fa-thumbs-up"></i>
                                            </Button>


                                        </form>




                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar />

        </>
    )
}
export default Security;