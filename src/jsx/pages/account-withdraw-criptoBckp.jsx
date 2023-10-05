import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../layout/header2';
import Sidebar from "../layout/sidebar/sidebar";
import Footer2 from '../layout/footer2';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import { useSelector, useDispatch } from 'react-redux'
import OrderModal from '../element/Ordermodal'
import CoinSelect from '../element/coinSelect';
import CurrencyFormat from 'react-currency-format';
import { Tab, Nav, Form, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Loading from '../element/loading'
import CurrencyInput from 'react-currency-input-field';
import GweiSelect from '../element/withdrawCripto/gweiSelect';
import { User } from '../store/User/User.action'
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import globalConfin from '../jsonConfig/globalConfig.json'
import DataGridTransfer from '../element/withdrawCripto/FormPagination'
import Confirm2FA from '../element/general/Confirm2FA'
import GoTo2FA from '../element/general/GoTo2FA'
import BottomBar from '../layout/sidebar/bottom-bar';

function Security() {
    const { t } = useTranslation()
    const user = useSelector(state => state.user)
    const [hash, setHash] = useState()
    const [showHash, setShowHash] = useState('password')
    const [label, setLabel] = useState('Show')
    const [show, setShow] = useState(false);
    const [operationProps] = useState({});
    const [quantity, setquantity] = useState(0.00)
    const [address, setAddress] = useState()
    const [type, setType] = useState(12345)
    // const currencies = globalConfin.coins
    // currencies[0] = 'BRL'
    // currencies[1] = 'BTC'
    // currencies[2] = 'LTC'
    // currencies[825] = 'USDT'
    // currencies[1027] = 'ETH'
    // currencies[12345] = 'IDX'
    const [balance, setBalance] = useState()
    const [balanceBRL, setBalanceBRL] = useState()
    const [lastModifyBRL, setLastModifyBRL] = useState()
    const [lastModify, setLastModify] = useState()
    const [history, setHistory] = useState([])
    const [showLoad, setShowLoad] = useState('none');
    const [disabled, setDisabled] = useState(true)
    const [colorButton, setColorButton] = useState({ backgroundColor: '#bf0202', borderColor: '#bf0202' })
    const [tax, setTax] = useState(0)
    const [gasType, setGasType] = useState('FastGasPrice')
    const [finalValue, setFinalValue] = useState('')
    const [initValue, setInitValue] = useState('')
    const dispatch = useDispatch()
    const [gas, setGas] = useState(0)
    const [displayTranfer, setDisplayTranfer] = useState('block')
    const [displayCheck, setDisplayCheck] = useState('none')
    const [msgErro, setMsgErro] = useState(false)
    const [messageErro, setMessageErro] = useState('')
    const [displaySucess, setDisplaySucess] = useState('none')
    const [open2FA, setOpen2FA] = useState(false)
    const [openGoTo2FA, setOpenGoTo2FA] = useState(false)


    //-----------------API------------------------
    const getWallet = async (currency) => {
        try {
            const wallet = (await axios.put(`/wallet/${currency}`, { authKey: user.authKey })).data
            setHash(wallet.wallet.hash)
            return wallet
        } catch (err) {
            return err.response
        }
    }
    const getGas = async (gasType) => {
        setGasType(gasType)
        try {
            const data = {
                gasType: gasType,
                type: type,
            }
            const gasPrice = (await axios.post(`/price/gas`, data))
            setTax(gasPrice.data.gasPricetype)
            setGas(gasPrice.data.gas)
            if (initValue == undefined) {
                await setFinalValue('')
            } else if (initValue != '') {
                await checkValueInit(initValue)
            }
            return gasPrice.data.gasPricetype
        } catch (err) {
            return err.response
        }
    }
    const getHistory = async () => {
        try {
            const history = (await axios.put(`/withdraw/history`, { authKey: user.authKey }))
            //  console.log(history)
            setHistory(history.data.reverse())
            return history
        } catch (err) {
            return err.response
        }
    }

    const getBalances = async (currency) => {
        try {
            const balance = (await axios.put(`/wallet/${currency}`, { authKey: user.authKey })).data
            setBalance(balance.wallet.balance)
            setBalanceBRL(balance.walletBRL.balance)
            setLastModify(balance.wallet.updatedAt)
            setLastModifyBRL(balance.walletBRL.updatedAt)

            return balance
        } catch (err) {
            return err.response
        }
    }


    const handleWithdraw = async () => {

        const finalQuant = parseFloat(quantity.toString().replace(',', '.')).toFixed(7)
        try {
            // if (type == 1027) {
            //     operationProps.operationStatus = false
            //     operationProps.header = t('Error in withdrawal')
            //     operationProps.body = t('Eth withdraws are not working at moment')
            //     setShow(true)
            //     setTimeout(() => {
            //         setShow(false)
            //     }, 6000)
            //     return false
            // }
            if (finalQuant > 0 && address) {

                const data = {
                    authKey: user.authKey,
                    type: type,
                    status: 1,
                    quantity: parseFloat(quantity.toString().replace(',', '.')).toFixed(7),
                    coinType: type,
                    receiverAddress: address,
                    gas: gas,
                    tax: tax,
                    receiverValue: parseFloat(initValue.toString().replace(',', '.')).toFixed(7)
                }
                setShowLoad('block')
                console.log("quantity", quantity)
                console.log("data", data)
                const withdraw = (await axios.post(`/withdraw`, data))
                setShowLoad('none')
                operationProps.operationStatus = true
                operationProps.header = t('Withdraw placed')
                operationProps.body = `${t('Your Withdraw:')} ${quantity} ${globalConfin.tokenCoins[type]} was required`
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
                setDisplayCheck('none')
                setDisplayTranfer('none')
                setDisplaySucess("block")

                await getBalances(type)
                await getHistory()
                //   console.log(withdraw)

                return withdraw
            } else {
                setShowLoad('none')
                operationProps.operationStatus = false
                operationProps.header = t('Error in withdrawal')
                operationProps.body = t('Withdraw value must be greater than 0 and enter a valid address')
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
                return true
            }
        } catch (err) {
            setShowLoad('none')
            operationProps.operationStatus = false
            operationProps.header = t('Error in withdrawal')
            operationProps.body = t('An error has occurred. Please try again.')
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 6000)
            return err
        }
    }
    const validUser = async () => {
        try {
            const valid = await axios.put('user/validUser', { authKey: user.authKey })
            await getBalances(type)
            await getWallet(type)
            await getHistory()
            await getGas(gasType)
            setFinalValue(finalValue)
            setInitValue(initValue)
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status == 406) {
                    console.log("invalid user")
                    dispatch(User(null))
                } else {
                    console.log("Unexpected error")
                }
            } else {
                console.log("Unexpected error 404")
            }
        }
    }
    const getTwofactor = async () => {
        let newtwofactor = await axios.put(`/user/validTwoFactor`, { authKey: user.authKey })
        if (newtwofactor.data) {
            return true
        } else {
            return false
        }

    }

    //------------functions------------------------

    const handleChange = async (newValue) => {
        reset()
        setType(newValue);
    }

    const disabledButton = async (address, initValue) => {
        // console.log("endereço: ", address, "  inivalue", initValue)
        if (address != undefined && initValue != '' && initValue != undefined) {
            if (address != '' && initValue.toString().replace(',', '.') > 0) {
                setDisabledButton(false)
            } else {
                setDisabledButton(true)
            }
        } else {
            setDisabledButton(true)
        }
    }
    const setDisabledButton = async (value) => {
        if (value) {
            setDisabled(true)
            setColorButton({ backgroundColor: '#bf0202', borderColor: '#bf0202' })
        } else {
            setDisabled(false)
            setColorButton({ backgroundColor: '#10d876', borderColor: '#10d876' })
        }

    }
    const checkValueFinal = async (final) => {
        let finalvalue = parseFloat(final.toString().replace(',', '.'))
        if (balance < finalvalue && balance - tax > 0) {
            setFinalValue(balance)
            setInitValue(balance - tax)
            setquantity(balance)
        } else {
            if (finalvalue - tax < 0) {
                setInitValue("")
                disabledButton(address, 0)
            }
            else {
                setInitValue(finalvalue - tax)
                disabledButton(address, finalvalue - tax)
            }
            setquantity(finalvalue)
        }
    }
    const checkValueInit = async (initValue, newTax) => {
        if (!initValue) {
            return
        }
        let finalvalue = parseFloat(initValue.toString().replace(',', '.')) + newTax
        if (balance < finalvalue || balance - newTax < 0) {
            return false
            // setFinalValue(balance)
            // setInitValue(balance - tax)
            // setquantity(balance)
        } else {
            setFinalValue(finalvalue)
            setquantity(finalvalue)
            return true
        }
    }
    const reset = async () => {
        setInitValue('')
        setFinalValue('')
        setAddress('')
        setDisabledButton(true)
    }
    const goToNext = async () => {
        setMsgErro(false)
        let is2fa = await getTwofactor()
        if (is2fa) {
            setOpenGoTo2FA(false)
        } else {
            setShowLoad('none')
            setOpenGoTo2FA(true)
            return
        }
        let newTax = await getGas(gasType)
        if (!newTax) {
            setMessageErro("Unexpected error")
            setMsgErro(true)
            return false

        }
        let valueCheck = await checkValueInit(initValue, newTax)
        if (valueCheck) {
            setDisplayTranfer('none')
            setDisplayCheck('block')
        } else {
            setDisabledButton(true)
            setMessageErro("Insufficient funds")
            setMsgErro(true)
            console.log("Insufficient funds")
        }

    }
    const cancelTransfer = async () => {
        reset()
        setDisplaySucess('none')
        setDisplayCheck('none')
        setDisplayTranfer('block')
    }

    const test2FA = async () => {
        let is2fa = await getTwofactor()
        if (is2fa) {
            setOpen2FA(true)
        } else {
            setShowLoad('none')
            setOpenGoTo2FA(true)
            return
        }

    }

    //-----------------useEffect---------------------
    useEffect(async () => {
        await validUser()
    }, [type])


    return (
        <>
            <Header2 />
            <Confirm2FA hashUser={user.authKey} sucessNext={handleWithdraw} open2FA={open2FA} setOpen2FA={setOpen2FA} />
            <GoTo2FA openGoTo2FA={openGoTo2FA} setOpenGoTo2FA={setOpenGoTo2FA} />
            <OrderModal show={show} operationProps={operationProps} />
            <Sidebar selectedItem={"account-withdraw-cripto"} />
            <Loading show={showLoad} />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card" disabled={'none'}>
                                <div class="card-header">
                                    <h4 class="card-title">{t('Withdraw crypto')}</h4>
                                </div>
                                <div style={{
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    display: displayTranfer
                                }}>
                                    <CoinSelect onChange={handleChange} />
                                </div>
                                <div class="card-body" style={{ display: displayTranfer }} >
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="phone_verify">
                                                <h4 class="card-title mb-3 text-center">{t('Withdraw')} {globalConfin.tokenCoins[type]}</h4>

                                                <div class="form-row align-items-center" style={{
                                                    display: 'flex',
                                                    alignContent: 'center', justifyContent: 'center'
                                                }}>

                                                    <div class="form-group col-xl-7">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" style={{ color: '#5d78ff' }}>
                                                                    {t('Address')}</span>
                                                            </div>
                                                            <input type="text"
                                                                name="currency_amount"
                                                                autoComplete="off"
                                                                value={address}
                                                                class="form-control text-right"
                                                                placeholder={t('Copy the address of your external wallet')}
                                                                onChange={
                                                                    (text) => {
                                                                        setAddress(text.target.value)
                                                                        disabledButton(text.target.value, initValue)
                                                                    }
                                                                } />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-7">
                                                        <h4 class="card-title mb-3 text-center" >{t('Withdrawal amount')}</h4>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    {globalConfin.tokenCoins[type]}</span>
                                                            </div>
                                                            <CurrencyInput
                                                                type='text'
                                                                class="form-control text-right"
                                                                style={{ width: "260px" }}
                                                                id="input-example"
                                                                name="input-name"
                                                                value={initValue}
                                                                placeholder={t("Enter the withdrawal amount")}
                                                                defaultValue={0.0000000}
                                                                decimalsLimit={7}
                                                                autoComplete="off"
                                                                onChange={(e) => setquantity(e.target.value)}
                                                                onInput={(event) => {
                                                                    event.target.value = event.target.value.replace(/\D/g, "");
                                                                    if (event.target.value.length == 1) {
                                                                      event.target.value = event.target.value.replace(/^(\d)/, "0.0$1");
                                                                    }
                                                                    if (event.target.value.length == 2) {
                                                                      event.target.value = event.target.value.replace(/^(\d)/, "0.$1");
                                                                    } else {
                                                                      event.target.value = event.target.value.replace(/(\d)(\d{2})$/, "$1.$2");
                                                                    }
                                                                    event.target.value = event.target.value.replace(
                                                                      /(?=(\d{3})+(\D))\B/g,
                                                                      ","
                                                                    );
                                                                  }}
                                                                  pattern="[0-9,.]*"
                                                                  inputMode="numeric"
                                                            />

                                                        </div>
                                                        <div class="text-right">
                                                            <div className={"text-danger " + (!msgErro ? "d-none" : "")}>
                                                                {t(messageErro)}
                                                            </div>
                                                        </div>
                                                        <div class="mt-2 text-right">
                                                            {t('Balance')}:   <span class="strong">
                                                                <CurrencyFormat value={(balance)} decimalScale={7} displayType={'text'} thousandSeparator={true} />  {globalConfin.tokenCoins[type]}
                                                            </span>
                                                        </div>

                                                    </div>
                                                    <button
                                                        style={
                                                            colorButton
                                                        }
                                                        disabled={disabled}
                                                        className="btn btn-success btn-block mt-4 col-xl-7" onClick={goToNext}>
                                                        {t('Withdraw now')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" style={{ display: displayCheck }} >
                                    <div class="form-row align-items-center" style={{
                                        display: 'flex',
                                        alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <p style={{ width: "50%" }}>
                                            <text style={{ fontWeight: "bold", fontSize: '20px' }}>
                                                {t("Do you wish to continue?")}
                                            </text>
                                            <br />
                                            {/* <text style={{ fontWeight: "bold", fontSize: '20px' }}> Valor Recebido: </text>
                                            <text style={{ fontWeight: "bold", fontSize: '20px', color: 'white' }}>{initValue} IDX</text><br/> */}
                                            <text style={{ fontWeight: "bold", fontSize: '20px' }}>{t("Withdrawal amount") + ": "}</text>
                                            <text style={{ fontWeight: "bold", fontSize: '20px', color: 'white' }}>{Intl.NumberFormat("en-US", {minimumFractionDigits: 2,}).format(quantity) + " " + globalConfin.tokenCoins[type]}
                                            </text><br />
                                            <text style={{ fontWeight: "bold", fontSize: '20px' }}>{t("Value") + " + " + t("tax") + ": "}</text>
                                            {/* {quantity == "" ? quantityNumber : Intl.NumberFormat("en-US", {
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }).format(quantityNumber)} */}
                                            <text style={{ fontWeight: "bold", fontSize: '20px', color: 'white' }}>{Intl.NumberFormat("en-US", {
                                                currency: "USD",
                                                minimumFractionDigits: 2,
                                            }).format(quantity) + " " + globalConfin.tokenCoins[type]}</text><br />
                                            <text style={{ fontWeight: "bold", fontSize: '20px' }}>{t("Destination Wallet") + ": "}</text>
                                            <text style={{ fontWeight: "bold", fontSize: '20px', color: 'white' }}>{address}</text><br />

                                        </p>
                                    </div>
                                    <div class="form-row align-items-center" style={{
                                        display: 'flex',
                                        alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <button
                                            style={{
                                                backgroundColor: '#10d876', borderColor: '#10d876',
                                                alignContent: 'center', justifyContent: 'center',

                                            }}
                                            className="btn btn-success btn-block mt-4 col-xl-7" onClick={test2FA}>
                                            {t('Continue')}
                                        </button>
                                    </div>

                                    <div class="form-row align-items-center" style={{
                                        display: 'flex',
                                        alignContent: 'center', justifyContent: 'center'
                                    }}>

                                        <button
                                            style={{
                                                backgroundColor: '#bf0202', borderColor: '#bf0202',
                                                alignContent: 'center', justifyContent: 'center',

                                            }}
                                            className="btn btn-success btn-block mt-4 col-xl-7" onClick={cancelTransfer}>
                                            {t('Cancel')}
                                        </button>
                                    </div>

                                </div>
                                <div class="card-body" style={{ display: displaySucess }} >
                                    <div class="form-row align-items-center" style={{
                                        display: 'flex',
                                        alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <div class="text-center">
                                            <h2 class="card-title">{t("Attention")}!</h2>
                                            <Alert style={{ color: "rgb(16 216 118)", backgroundColor: "transparent", fontSize: "15px" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                                {t("Transaction in progress, wait for confirmation in history.")}
                                            </Alert>
                                        </div >

                                    </div>
                                    <div class="form-row align-items-center" style={{
                                        display: 'flex',
                                        alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <button
                                            style={{
                                                backgroundColor: '#10d876', borderColor: '#10d876',
                                                alignContent: 'center', justifyContent: 'center',
                                                width: '200px',

                                            }}
                                            className="btn btn-success btn-block mt-4" onClick={cancelTransfer}>
                                            {t('Back')}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-xxl-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title"> {t('Withdraw History')}</h4>
                            </div>
                            <DataGridTransfer senderHistory={history} />
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar selectedIcon="profile" />

        </>
    )
}
export default Security;