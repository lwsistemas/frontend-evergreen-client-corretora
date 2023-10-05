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
import { Tab, Nav, Form, Row, Col, Button } from 'react-bootstrap';
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
import { Dialog } from '@mui/material';
import PropTypes from "prop-types";
import { render } from "react-dom";
import ReactTable from "react-table";


import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

function Security() {
    const { t } = useTranslation()
    const user = useSelector(state => state.user)
    const [hash, setHash] = useState()
    const [showHash, setShowHash] = useState('password')
    const [label, setLabel] = useState('Show')
    const [show, setShow] = useState(false);
    const [operationProps] = useState({});
    const [quantity, setquantity] = useState()
    const [address, setAddress] = useState()
    const [type, setType] = useState(0)
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
    const [RoboStop, setRoboStop] = useState(false);
    const dispatch = useDispatch()
    const [gas, setGas] = useState(0)
    const [displayTranfer, setDisplayTranfer] = useState('block')
    const [displayCheck, setDisplayCheck] = useState('none')
    const [msgErro, setMsgErro] = useState(false)
    const [messageErro, setMessageErro] = useState('')
    const [displaySucess, setDisplaySucess] = useState('none')
    const [open2FA, setOpen2FA] = useState(false)
    const [openGoTo2FA, setOpenGoTo2FA] = useState(false)
    const [Redechain, setRedeChain] = useState('block')
    const [Ideredechain, setIdredeChain] = useState(0)
    const [selectRedeChain, setSelectRedeChain] = useState(0)
    const [erroModel, setErroModel] = useState(false)
    const [erroBalance, setErroBalance] = useState(false)
    const [model, setModel] = useState(0)
    const [messageModel, setMessageModel] = useState("")
    const [isDialogOpen, setDialogOpen] = useState(false);


    //-----------------API------------------------

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        window.location.href = '/account-withdraw-cripto';
    };

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


    const getWallet = async (currency) => {
        try {
            const wallet = (await axios.put(`/wallet/${currency}`, { authKey: user.authKey })).data
            setHash(wallet.wallet.hash)
            return wallet
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

    const handleCheckSaldo = async (e) => {
        if (initValue > balance) {
            console.log(balance)
            setMessageErro("Insufficient funds")
            setMsgErro(true)
            disabledButton()
            // return false
        } else {

            setMsgErro(false)
            disabledButton()
            //return true

        }
    }

    const validateData = async (e) => {
        e.preventDefault();
        const modelValid = handleModel()


        console.log(balance)
        let valueCheck = await checkValueInit(initValue)
        if (initValue > balance) {
            console.log(balance)
            setMessageErro("Insufficient funds")
            setMsgErro(true)
            // return false
        } else {
            await handleWithdraw()
            setMsgErro(false)
            //return true

        }


        // if (valueCheck) {
        //     setDisplayTranfer('none')
        //     setDisplayCheck('block')
        //     await handleWithdraw()
        // } else {
        //     setDisabledButton(true)
        //     setMessageErro("Insufficient funds")
        //     setMsgErro(true)
        //     console.log("Insufficient funds")
        // }



    }


    const handleWithdraw = async (e) => {
        //setInitValue(initValue)
        //const initValue = parseFloat(quantity.toString().replace(',', '.')).toFixed(7)

        const data = {
            authKey: user.authKey,
            type: type,
            idRede: Ideredechain,
            quantity: parseFloat(initValue.toString().replace(',', '.')).toFixed(7),
            receiverAddress: address,
            

        }

        try {
            const withdraw = (await axios.post(`/withdraw`, data))
            openDialog(true)

        } catch {
            return false

        }


    }


    const validUser = async () => {
        try {
            const valid = await axios.put('user/validUser', { authKey: user.authKey })
            await getBalances(type)
            await getWallet(type)
            await getHistory()
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

        if (newValue == 825) {
            setRedeChain("none")
        } else {
            setRedeChain("block")
        }


        //console.log(newValue)

    }

    const disabledButton = async (address, initValue) => {
        console.log("endereço: ", address, "  inivalue", initValue)
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
        setErroModel(false)
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

    useEffect(() => { }, [model]);


    return (
        <>
            <Header2 />
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
                                        <div class="col-md-12">

                                            <form method="post" name="myform" className="currency_validate" onSubmit={validateData}>
                                                <Dialog className='dialog' open={isDialogOpen} onClose={closeDialog}>
                                                    <div className='dialog-content'>
                                                        <DialogTitle> {
                                                            <div >
                                                                <h2 className='text-success'>Saque realizado com sucesso</h2>
                                                                <div>{t("Transaction in progress, wait for confirmation in history.")}</div>
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


                                                <div class="form-row align-items-center" style={{
                                                    display: 'flex',
                                                    alignContent: 'center', justifyContent: 'center'
                                                }}>


                                                    {Redechain == "none" &&
                                                        <div class={"form-group col-md-12"} >
                                                            <div class="input-group">
                                                                <div class="input-group">
                                                                    <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                                        {t('Application_redeChain')}</span>
                                                                    <select name='rede' className='form-control' required onChange={e => {
                                                                        setIdredeChain(e.target.value)
                                                                        disabledButton(e.target.value, initValue)
                                                                        setModel(e.target.value)
                                                                        reset()

                                                                    }
                                                                    } >
                                                                        <option data-display="Selecionar" value={0}>{t('Application_Selecionar')}</option>
                                                                        <option value={"BEP20"}>BNB Smart Chain(BEP20)</option>
                                                                        <option value={"TRC20"}>Tron(TRC20)</option>

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"text-danger " + (!erroModel ? "d-none" : "")}>
                                                                {messageModel}
                                                            </div>
                                                        </div>
                                                    }

                                                    <div class="form-group col-md-12">
                                                        <div class="input-group">
                                                            <div class="input-group">
                                                                <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                                    {t('Address')}</span>
                                                                <input type="text"
                                                                    name="currency_amount"
                                                                    autoComplete="off"
                                                                    value={address}
                                                                    class="form-control text-right"
                                                                    placeholder={t('Copy the address of your external wallet')}
                                                                    onChange={
                                                                        (text) => {
                                                                            setAddress(text.target.value)

                                                                        }
                                                                    }


                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

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
                                                                    placeholder={t("Enter the withdrawal amount")}
                                                                    onChange={(text) => {
                                                                        setInitValue(text.target.value)
                                                                        disabledButton(text.target.value, initValue)
                                                                        handleCheckSaldo(text.target.value)
                                                                    }}

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="mt-2 text-right" style={{ fontSize: "22px" }}>
                                                        {t('Balance')}:   <span className="strong">
                                                            <CurrencyFormat value={(balance)} decimalScale={7} displayType={'text'} thousandSeparator={true} />  {globalConfin.tokenCoins[type]}
                                                        </span>
                                                    </div>


                                                </div>

                                                <div class="text-right">
                                                    <div className={"text-danger " + (!msgErro ? "d-none" : "")}>
                                                        <span className='alert alert-danger'>
                                                            {t(messageErro)} <i className='fa fa-exclamation'></i>
                                                        </span>
                                                    </div>
                                                </div>



                                                <Button variant="success mt-4" type="submit" disabled={false}>
                                                    {t("Application_EfetuarSaque")} <i className="fa fa-bitcoin"></i>
                                                </Button>
                                            </form>

                                        </div>
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