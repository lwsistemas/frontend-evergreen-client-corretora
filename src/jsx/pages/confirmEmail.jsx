import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../services/index'
import { User } from '../store/User/User.action'
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from '../element/languageSelect'
import Header3 from '../layout/header3';


function ConfirmEmail() {

    const { t } = useTranslation()
    const [token, setToken] = useState('')
    const user = useSelector(state => state.create)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(async () => {
        try {
            // await axios.post('/validateEmail', { email: user.email })
            // await axios.post('/whatsapp/validate', { mobile: user.mobile })
        } catch (err) {
            console.log(err)
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = (await axios.post('/confirmEmail', { authKey: user.authKey, token })).data
            if (result.sucess) {
                dispatch(User(result.responseUser))
                history.push('/sucess')
            }
        } catch (err) {
            history.push('/failed')
        }
    }
    return (
        <>
            <Header3 />
            <div class="authincation section-padding">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-xl-5 col-md-6">
                            <div class="auth-form card">
                                <div class="card-header justify-content-center">
                                    <h4 class="card-title">{t("Confirm Email")}</h4>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <p class="mb-1">{t("Enter the code sent to the email")+" "}<strong>{user.email}</strong> </p>
                                            <input type="text" class="form-control" placeholder={t("Confirmation code.")} value={token} onChange={e => setToken(e.target.value)} />
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" className="btn btn-success btn-block">{t("Confirm")}</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p class="mb-1">{t("Don't Received?")} </p>
                                        <Link class="text-primary" to={"./confirmEmail"}>{t("Resend")}</Link>
                                    </div>
                                    <div class="new-account mt-3">
                                        <Link class="text-primary" to={"./signin"}>{t("Back to login")} </Link>
                                        <div class="text-center">
                                            <LanguageSelect />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmEmail;