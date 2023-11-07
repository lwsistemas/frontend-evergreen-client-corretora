import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion, Button, Form, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../services/index'
import { User } from '../store/User/User.action'
import { useHistory } from "react-router-dom";
import { createUser } from '../store/Create/Create.action'
import { useTranslation } from "react-i18next";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import ButtonsUser from '../element/ButtonsUser'
import Create2FA from '../element/user/security/Create2FA';
import Confirm2FA from '../element/Confirm2FA';
import ConfirmEmail from '../element/ConfirmEmail';

import OrderModal from '../element/Ordermodal'
import Loading from '../element/loading'
import BottomBar from '../layout/sidebar/bottom-bar';
function Secutiry() {
    const user = useSelector(state => state.user)

    const { t } = useTranslation()

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [erroPassword, setErrorPassword] = useState(false)
    const [errorNewPassword, setErrorNewPassword] = useState(false)
    const [messagePassword, setMessagePassword] = useState('')
    const [messageNewPassword, setNewMessagePassword] = useState('')

    const [showCancel, setShowCancel] = useState('none');
    const [showQrcode, setShowQrcode] = useState('block');
    const [showPopupComfirm, setShowPopupComfirm] = useState(false)
    const [showEmailComfirm, setShowEmailComfirm] = useState(false)
    const [operationProps] = useState({});
    const [show, setShow] = useState(false);
    const [showLoad, setShowLoad] = useState('none')

    const [disabled, setDisabled] = useState(true)
    const [erroOldPassword, setErrorOldPassword] = useState(false)
    const [erroOldPasswordMS, setErrorOldPasswordMS] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    
    const submitPassword = async (e) => {
        e.preventDefault()
        setShowLoad('block')
        setDisabled(true)
        setErrorOldPassword(false)
        if (!newPassword || !confirmPassword) {
            setNewMessagePassword('Enter new password and / or password confirmation')
            setErrorNewPassword(true)
            setShowLoad('none')
            return
        } else {
            setErrorNewPassword(false)
        }
        if (!password) {
            setMessagePassword('Enter password')
            setErrorPassword(true)
            setShowLoad('none')
            return
        } else {
            if (password.length < 6 || password.length > 21) {
                setMessagePassword('Enter password with 6 to 21 characters')
                setErrorPassword(true)
                setShowLoad('none')
                return
            } else {
                setErrorPassword(false)
            }
        }
        if ((newPassword === confirmPassword) && (newPassword !== '')) {
            if (newPassword.length >= 6 && newPassword.length <= 21) {
                setErrorNewPassword(false)
            } else {
                setNewMessagePassword('Enter password with 6 to 21 characters')
                setErrorNewPassword(true)
                setShowLoad('none')
                return
            }

        } else {
            setNewMessagePassword('Passwords do not match')
            setShowLoad('none')
            setErrorNewPassword(true)
            return
        }
        if (password === newPassword) {
            setMessagePassword(t("Password must be different from the current one."))
            setErrorPassword(true)

        } else {
            console.log(erroPassword, errorNewPassword)
            try {
                const pass = {authKey:user.authKey, password, newPassword, confirmPassword }
                const emailConfirm = (await axios.put(`/user/password`, pass)).data
                await axios.post('/validateEmail', { email: user.email })
                setShowEmailComfirm(true)
                setDisabled(false)

            } catch (err) {
                setShowLoad('none')
                if (err.response != undefined) {
                    operationProps.operationStatus = false
                    operationProps.header = t('Error changing password')
                    operationProps.body = t(err.response.data.error.mensagen)
                    setShowError(err.response.data.error)
                } else {
                    operationProps.operationStatus = false
                    operationProps.header = t('Error changing password')
                    operationProps.body = t('Error changing password, please try later.')
                    setDisabled(false)

                }
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
            }

        }
        setShowLoad('none')
    }
    const setShowError = async (error) => {
        if (error.flag == 'oldPass') {
            setMessagePassword(t(error.mensagen))
            setErrorPassword(true)
        }



    }
    const getTwofactor = async () => {
        let newtwofactor = await axios.put(`/user/validTwoFactor`,{authKey:user.authKey})
        if (newtwofactor.data) {
            setShowQrcode('none')
            setShowCancel('block')
        } else {
            setShowQrcode('block')
            setShowCancel('none')
        }

    }
    const disabledButton = async (password, newPassword, confirmPassword) => {
        setPassword(password)
        setNewPassword(newPassword)
        setConfirmPassword(confirmPassword)
        if (password != undefined && newPassword != undefined && confirmPassword != undefined && password != '' && newPassword != '' && confirmPassword != '') {
            if (password.length >= 6 && confirmPassword.length >= 6 && newPassword.length >= 6 &&
                (newPassword === confirmPassword)) {
                setDisabled(false)
            }
        } else {
            setDisabled(true)
        }

    }
    const validUser = async () => {
        try {
            const valid=  await axios.put('user/validUser',{authKey:user.authKey})
            await getTwofactor()
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
    useEffect(async () => {
        await validUser() 
    }, [])

    return (
        <>
            <Header2 title={t('Security')} />
            <Loading show={showLoad} />
            <OrderModal show={show} operationProps={operationProps} />
            <Confirm2FA user={user} showPopupComfirm={showPopupComfirm} setShowPopupComfirm={setShowPopupComfirm}
                setShowQrcode={setShowQrcode} setShowCancel={setShowCancel} />
            <ConfirmEmail user={user} showPopupComfirm={showEmailComfirm} setShowPopupComfirm={setShowEmailComfirm} newPassword={newPassword} />
            <div class="content-body">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-xl-12 col-lg-12 col-xxl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">{t('Security')}</h4>
                                </div>
                                <div className="card-body">
                                    <ButtonsUser />
                                </div>
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">{t("Second Authentication Factor")}</h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row align-items-start mt-4">
                                                <div class="col-md-3"><p>{t("2nd Authentication Factor")}</p>
                                                </div>
                                                <div class="col-md-9">
                                                    <Create2FA
                                                        user={user} showQrcode={showQrcode} showCancel={showCancel}
                                                        setShowQrcode={setShowQrcode} setShowCancel={setShowCancel}
                                                        setShowPopupComfirm={setShowPopupComfirm} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-header">
                                    <h4 class="card-title">{t("Change Password")}</h4>
                                </div>
                                <div className={"card-body"}>
                                    <Card.Body><Form onSubmit={submitPassword}>
                                        <Form.Row>
                                            <Form.Group as={Col} md={4} controlId="formGridFirsName">
                                                <Form.Label>{t('Current password')}</Form.Label>
                                                <Form.Control type="password" value={password} maxLength="32" onChange={e => disabledButton(e.target.value.replace(' ', ''), newPassword, confirmPassword)} />
                                            </Form.Group>
                                        </Form.Row>
                                        <div className={"text-danger " + (!erroPassword ? "d-none" : "")}>
                                            {t(messagePassword)}
                                        </div>
                                        <Form.Row>
                                            <Form.Group as={Col} md={4} controlId="formGridFirsName">
                                                <Form.Label>{t("New password")}</Form.Label>
                                                <Form.Control type="password" value={newPassword} maxLength="32" onChange={e => disabledButton(password, e.target.value.replace(' ', ''), confirmPassword)} />
                                            </Form.Group>
                                            <Form.Group as={Col} md={4} controlId="formGridSecondName">
                                                <Form.Label>{t('Confirm new password')}</Form.Label>
                                                <Form.Control type="password" value={confirmPassword} maxLength="32" onChange={e => disabledButton(password, newPassword, e.target.value.replace(' ', ''))} />
                                            </Form.Group>
                                        </Form.Row>
                                        <div className={"text-danger " + (!errorNewPassword ? "d-none" : "")}>
                                            {t(messageNewPassword)}
                                        </div>
                                        <Button disabled={disabled} variant="primary" type="submit">
                                            {t('Save modifies')}
                                        </Button>
                                    </Form></Card.Body>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar selectedIcon="profile" />
            
        </>

    )
}

export default Secutiry;
