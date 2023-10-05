import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import {useTranslation} from "react-i18next";
import axios from '../../services/index'
import {useSelector, useDispatch} from 'react-redux'
import OrderModal from '../element/Ordermodal'
import BottomBar from '../layout/sidebar/bottom-bar';

function Security() {
    const {t} = useTranslation()
    const user = useSelector(state => state.user)
    const [hash, setHash] = useState()
    const [showHash, setShowHash] = useState('password')
    const [label, setLabel] = useState('Show')
    const [show, setShow] = useState(false);
    const [operationProps] = useState({});
    const [quantity, setQuantity] = useState(0)

    const getWallet = async (currency) => {
        try {
            const wallet = (await axios.put(`/wallet/${currency}`,{authKey:user.authKey})).data
            setHash(wallet.wallet.hash)
            return wallet
        } catch (err) {
            return err.response
        }
    }

    const refreshBalance = async (currency) => {
        try {
            const data =  {
                address: hash
            }
            const ethereumBalance = (await axios.post(`/ethereum/refreshBalance`, data)).data
            if(ethereumBalance > 0) {
                operationProps.operationStatus = true
                operationProps.header = t(`Your ETH balance is ${ethereumBalance}`)
                operationProps.body = t('This value was added to your founds')
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
            } else {
                operationProps.operationStatus = false
                operationProps.header = t('Your ETH balance is 0')
                operationProps.body = t('Deposit value must be greater than 0')
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
            }
            console.log(ethereumBalance == 0)
            return ethereumBalance
        } catch (err) {
            return err.response
        }
    }

    useEffect(async () => {
        await getWallet(1027)
    }, [])

    return (
        <>
            <Header2 />
            <OrderModal show={show}  operationProps={operationProps} /> 
            <Sidebar />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">{t('UNDER DEVELOPMENT')}</h4>
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