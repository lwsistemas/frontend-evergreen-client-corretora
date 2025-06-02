import React, { useEffect, useState, comp } from 'react';
import { Link } from 'react-router-dom';
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import { useSelector, useDispatch } from 'react-redux'
import OrderModal from '../element/Ordermodal'
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';
import Cookies from 'js-cookie'

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
    const [walletAll, setwalletAll] = useState([]);
    const dispatch = useDispatch()
    const [isAlertVisible, setIsAlertVisible] = useState(true); // Modal visível na inicialização


    useEffect(async () => {
        // Lógicas no carregamento do componente...
        setIsAlertVisible(true); // Garantir que o modal esteja visível após carregamento
    }, []);

    // Função para fechar o modal
    const hideAlertModal = () => {
        setIsAlertVisible(false);
    };

    const handler = (e) => {
        setMatches(e.matches);
    }



    const getWalletBusiness = async () => {
        try {
            const walletAll = await axios.post(`/payment/walletBusiness/type/all/`, { authKey: user.authKey })
            setwalletAll(walletAll.data.reverse());
            return walletAll;
        } catch (err) {
            return err.response;
        }
    };



    useEffect(async () => {
        window.matchMedia("(min-width: 500px)").addListener(handler)
        await getWalletBusiness()
    }, [])

    return (
        <>
            <Header2 title={t('Deposit crypto')} />
            <OrderModal show={show} operationProps={operationProps} />
            {isAlertVisible && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <p>
                            <strong>
                                Atenção aos Métodos de Pagamento com Criptomoedas na EVER GREEN BROKER
                            </strong>
                            É crucial destacar que todos os depósitos realizados em criptomoedas devem ser
                            efetuados exclusivamente para os endereços de carteiras digitais registrados
                            na EVER GREEN BROKER. Ressaltamos que nenhum dos nossos analistas está autorizado a
                            fornecer endereços de carteiras digitais por e-mail, WhatsApp ou qualquer outro
                            meio de comunicação externo.
                        </p>
                        <p>
                            Para garantir a segurança e a autenticidade de suas transações com criptomoedas,
                            pedimos que realize o pagamento do seu depósito seguindo apenas as instruções e
                            os dados de carteiras digitais fornecidos diretamente na plataforma. Esta medida
                            é fundamental para prevenir fraudes e manter a integridade de suas operações
                            financeiras conosco no mercado de criptoativos.
                        </p>
                        <div className="alert alert-info">
                            <p>Prazo de até 48 horas para efetivação do aporte.</p>
                            <p>Para agilizar o processo de rentabilização, encaminhe o comprovante do pagamento para seu gerente de contas.</p>
                        </div>
                        <button onClick={hideAlertModal}>Fechar</button>
                    </div>
                </div>
            )}

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card acc_balance">
                                <div className="card-header">
                                    <div className='card-title text-left'>
                                        {t('Application_msgDepositarCrip')}
                                    </div>
                                </div>

                                <div className="card-body ">


                                    <h4 className="m-3">{t('Application_SelecioneCarteira')} <i className='fa fa-bitcoin'></i> </h4>

                                    <div class="balance-list">
                                        {walletAll.map((wallet) => (

                                            <div className="card-body balance-card"
                                                style={{ background: "#191e2b" }}>
                                                <Link to={{ pathname: `/deposit-cripto/receive/${wallet.coinSimbolo}`, }}>
                                                    <span><img src={wallet.img} style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        margin: '10px'
                                                    }} /></span>
                                                    {" "} {wallet.coinSimbolo} - {wallet.CoinString}
                                                </Link>

                                            </div>
                                        ))}



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