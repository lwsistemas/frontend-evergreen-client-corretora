import React, { useEffect, useState, comp } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import { useSelector, useDispatch } from 'react-redux'
import OrderModal from '../element/Ordermodal'
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';

function Security() {
    const idETH = 1027
    const idBTC = 1
    const { t } = useTranslation()
    const user = useSelector(state => state.user)
    const [hashETH, setHashETH] = useState('')
    const [hashBTC, setHashBTC] = useState('')
    const [hashUSDT, setHashUSDT] = useState('')
    const [showHashETH, setShowHashETH] = useState('password')
    const [showHashUSDT, setShowHashUSDT] = useState('password')
    const [showHashBTC, setShowHashBTC] = useState('password')
    const [labelETH, setLabelETH] = useState('Show')
    const [labelUSDT, setLabelUSDT] = useState('Show')
    const [labelBTC, setLabelBTC] = useState('Show')
    const [generateBTC, setGenerateBTC] = useState('none')
    const [buttonBTC, setButtonBTC] = useState('block')
    const [buttonUSDT, setButtonUSDT] = useState('block')
    const [generateETH, setGenerateETH] = useState('none')
    const [sucessETH, setSucessETH] = useState('none')
    const [sucessUSDT, setSucessUSDT] = useState('none')
    const [sucessBTC, setSucessBTC] = useState('none')
    const [buttonETH, setButtonETH] = useState('block')
    const [show, setShow] = useState(false);
    const [operationProps] = useState({});
    const [direction, setDirection] = useState();
    const [matches, setMatches] = useState(window.matchMedia("(min-width: 500px)").matches)
    const dispatch = useDispatch()
    
    const handler = (e) => {
        setMatches(e.matches);
    }
    const getWallet = async (currencyEth, currencyBtc) => {
        try {
            const walletEth = (await axios.put(`/wallet/${currencyEth}`, { authKey: user.authKey })).data
            const walletBtc = (await axios.put(`/wallet/${currencyBtc}`, { authKey: user.authKey })).data
            if (walletEth.wallet.hash) {
                setButtonETH('block')
                setGenerateETH('none')
                setHashETH(walletEth.wallet.hash)
            } else {
                setButtonETH('none')
                setGenerateETH('block')
            }
            if (walletBtc.wallet.hash) {
                setButtonBTC('block')
                setGenerateBTC('none')
                setHashBTC(walletBtc.wallet.hash)
            } else {
                setButtonBTC('none')
                setGenerateBTC('block')
            }
            return true
        } catch (err) {
            return err.response
        }
    }
    const generateWallet = async (currencyCoin) => {
        try {
            const wallet = (await axios.put(`/wallet/Create/${currencyCoin}`, { authKey: user.authKey })).data
            if (currencyCoin == 1027) {
                setButtonETH('block')
                setGenerateETH('none')
                setHashETH(wallet.wallet.hash)
                setSucessETH('block')
                setTimeout(() => {
                    setSucessETH('none')
                }, 10000)
              
            } else{
                setButtonBTC('block')
                setGenerateBTC('none')
                setHashBTC(wallet.wallet.hash)
                setSucessBTC('block')
                setTimeout(() => {
                    setSucessBTC('none')
                }, 10000)
            }
    } catch (err) {
            return err.response
        }
    }
    const generateWalletBTC = async () => {
        generateWallet(idBTC)
        
    }
    const generateWalletETH = async () => {
        generateWallet(idBTC)
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

    useEffect(async () => {
        await validUser()
        await getWallet(idETH, idBTC)
    }, [])

    useEffect(async () => {
        window.matchMedia("(min-width: 500px)").addListener(handler)
    }, [])

    return (
        <>
            <Header2 title={t('Deposit crypto')} />
            <OrderModal show={show} operationProps={operationProps} />
            <Sidebar selectedItem="deposito-crypto" />
            <div className="content-body">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                               
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="phone_verify">
                                                <h4 className="card-title mb-3">{t('Your Ethereum wallet')}</h4>
                                                <div className="form-row align-items-center">
                                                    <div className="form-group col-xl-9">
                                                        <div className="" style={{
                                                            display: 'flex',
                                                            flexDirection: matches ? 'row' : 'column',
                                                        }}>
                                                            <input type={showHashETH}
                                                                name="currency_amount"
                                                                value={hashETH}
                                                                className="form-control"
                                                                autoComplete="off"
                                                            />
                                                            <div className="input-group-append" style={{
                                                                marginTop: matches ? 0 : 20
                                                            }}>
                                                                <div style={{ display: buttonETH }}>
                                                                    <a className="btn input-group-text bg-primary text-white"
                                                                        onClick={() => {
                                                                            showHashETH === 'text' ? setShowHashETH('password') : setShowHashETH('text')
                                                                            labelETH === 'Show' ? setLabelETH('Hide') : setLabelETH('Show')
                                                                        }}
                                                                    >
                                                                        {t(labelETH)}
                                                                    </a>
                                                                </div>
                                                                <div style={{ display: generateETH }}>
                                                                    <button
                                                                        className="btn input-group-text bg-primary text-white" > {t("Generate Wallet") + ' ETH'}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"text-danger col-xl-11"} style={{ display: generateETH }} >
                                            {t("Don't have a wallet")+' ETH'}
                                            </div>
                                            <div className={"text-success col-xl-11"} style={{ display: sucessETH }} >
                                              {t("Successfully created wallet!")}
                                            </div>
                                        </div>

                                        <div className="col-xl-12">
                                            <div className="phone_verified">
                                                <h5><span><i className="mdi mdi-database-plus"></i></span>{t('Use this wallet to receive') + ' ETH'}</h5>
                                                <div className="verify">
                                                    <div className="verified">
                                                        <span><i className="la la-check"></i></span>
                                                        <a href={`https://etherscan.io/address/${hashETH}`} target="_blank">{t('Verify on blockchain')}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* BITCOIn */}
                                        <div className="col-xl-12">
                                            <div className="phone_verify">
                                                <h4 className="card-title mb-3">{t('Your Bitcoin wallet')}</h4>
                                                <div className="form-row align-items-center">
                                                    <div className="form-group col-xl-9">
                                                        <div className="" style={{
                                                            display: 'flex',
                                                            flexDirection: matches ? 'row' : 'column',
                                                        }}>
                                                            <input type={showHashBTC}
                                                                name="currency_amount"
                                                                value={hashBTC}
                                                                className="form-control"
                                                                autoComplete="off"
                                                            />
                                                            <div className="input-group-append" style={{
                                                                marginTop: matches ? 0 : 20
                                                            }}>
                                                                <div style={{ display: buttonBTC }}>
                                                                    <a className="btn input-group-text bg-primary text-white"
                                                                        onClick={() => {
                                                                            showHashBTC === 'text' ? setShowHashBTC('password') : setShowHashBTC('text')
                                                                            labelBTC === 'Show' ? setLabelBTC('Hide') : setLabelBTC('Show')
                                                                        }}

                                                                    >
                                                                        {t(labelBTC)}
                                                                    </a>
                                                                </div>
                                                                <div style={{ display: generateBTC }}>
                                                                    <button
                                                                        className="btn input-group-text bg-primary text-white" onClick={generateWalletBTC} > {t("Generate Wallet") + ' BTC'}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"text-danger col-xl-11"} style={{ display: generateBTC }} >
                                                {t("Don't have a wallet")+' BTC'}
                                            </div>
                                            <div className={"text-success col-xl-11"} style={{ display: sucessBTC }} >
                                            {t("Successfully created wallet!")}
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="phone_verified">
                                                <h5><span><i className="mdi mdi-database-plus"></i></span>{t('Use this wallet to receive') + ' BTC'}</h5>
                                                <div className="verify">
                                                    <div className="verified">
                                                        <span><i className="la la-check"></i></span>
                                                        <a href={`https://www.blockchain.com/btc/address/${hashBTC}`} target="_blank">{t('Verify on blockchain')}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-12">
                                            <div className="phone_verify">
                                                <h4 className="card-title mb-3">{t('Application_USDT')}</h4>
                                                <div className="form-row align-items-center">
                                                    <div className="form-group col-xl-9">
                                                        <div className="" style={{
                                                            display: 'flex',
                                                            flexDirection: matches ? 'row' : 'column',
                                                        }}>
                                                            <input type={showHashUSDT}
                                                                name="currency_amount"
                                                                value={hashUSDT}
                                                                className="form-control"
                                                                autoComplete="off"
                                                            />
                                                            <div className="input-group-append" style={{
                                                                marginTop: matches ? 0 : 20
                                                            }}>
                                                                <div style={{ display: buttonUSDT }}>
                                                                    <a className="btn input-group-text bg-primary text-white"
                                                                        onClick={() => {
                                                                            showHashUSDT === 'text' ? setShowHashUSDT('password') : setShowHashUSDT('text')
                                                                            labelUSDT === 'Show' ? setLabelUSDT('Hide') : setLabelUSDT('Show')
                                                                        }}

                                                                    >
                                                                        {t(labelUSDT)}
                                                                    </a>
                                                                </div>
                                                                <div style={{ display: generateBTC }}>
                                                                    <button
                                                                        className="btn input-group-text bg-primary text-white" onClick={generateWalletBTC} > {t("Generate Wallet") + ' USDT'}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"text-danger col-xl-11"} style={{ display: generateBTC }} >
                                                {t("Don't have a wallet")+' BTC'}
                                            </div>
                                            <div className={"text-success col-xl-11"} style={{ display: sucessBTC }} >
                                            {t("Successfully created wallet!")}
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="phone_verified">
                                                <h5><span><i className="mdi mdi-database-plus"></i></span>{t('Use this wallet to receive') + '  USDT'}</h5>
                                                <div className="verify">
                                                    <div className="verified">
                                                        <span><i className="la la-check"></i></span>
                                                        <a href={`https://www.blockchain.com/btc/address/${hashBTC}`} target="_blank">{t('Verify on blockchain')}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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