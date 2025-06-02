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
    const [showQRCode, setShowQRCode] = useState(false);
    const [idPedido, setidPedido] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [qrCodeSize, setQrCodeSize] = useState("25%");



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

    const copyToClipboard = (text) => {
        // Função de fallback para dispositivos que não suportam navigator.clipboard
        const copyToClipboardFallback = (textToCopy) => {
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                const successful = document.execCommand('copy');
                const msg = successful ? 'Endereço copiado com sucesso!' : 'Falha ao copiar endereço.';
                setAlertMessage(msg);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000); // Esconde o alerta após 5 segundos
            } catch (err) {
                console.error('Falha ao copiar o texto: ', err);
                setAlertMessage('Erro ao copiar o endereço.');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }
            document.body.removeChild(textarea);
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                setAlertMessage("Endereço copiado com sucesso!");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }, (err) => {
                console.error('Erro ao copiar o texto: ', err);
                setAlertMessage('Erro ao copiar o endereço.');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            });
        } else {
            // Usa o fallback para dispositivos/navegadores não suportados
            copyToClipboardFallback(text);
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            rede: initRede,
            address: address,
            moeda: currencyTrade,
            valor: initValue,
            type: currencyTrade,
            authKey: user.authKey,
        };

        try {
            const response = await axios.post('/payment/deposit/cripto', dataToSend);
            console.log(response.data);
            // Ajusta a condição para verificar o campo 'action' para 'success'
            if (response.data.action === "success") {
                setShowQRCode(true); // Mostra o QRCode somente se a resposta indicar sucesso
                setidPedido(response.data.idPedido); // Supondo que você tenha um estado 'setIdPedido'
            } else {
                setShowQRCode(false); // Esconde o QRCode se a ação não for 'success'
            }
        } catch (error) {
            console.error('Erro ao enviar dados', error.response);
            setShowQRCode(false); // Esconde o QRCode em caso de erro na requisição
        }
    };

    useEffect(() => {
        const updateQrCodeSize = () => {
            // Define o tamanho do QRCode como 100% para telas de até 768px de largura
            const newSize = window.innerWidth <= 768 ? "80%" : "25%";
            setQrCodeSize(newSize);
        };

        // Chama a função imediatamente para definir o tamanho inicial
        updateQrCodeSize();

        // Adiciona o event listener para 'resize'
        window.addEventListener('resize', updateQrCodeSize);

        // Limpeza: remove o event listener quando o componente é desmontado
        return () => window.removeEventListener('resize', updateQrCodeSize);
    }, []); // Array de dependências vazio significa que o efeito roda uma vez após o primeiro render



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
                                        <form method="post" name="myform" className="currency_validate" onSubmit={handleSubmit}>

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
                                                                <option value={"ERC20"}>ERC(ERC20)</option>

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

                                            <>
                                                {showQRCode && mostraQr == "none" &&
                                                    <div className="form-group col-md-12">
                                                        <div className='row justify-content-center'>
                                                            <QRCode
                                                                title="Endereço do Depósito"
                                                                value={`${address}`}
                                                                size={qrCodeSize}
                                                            />

                                                        </div>

                                                        <div className='row justify-content-center mt-2' onClick={() => copyToClipboard(address)} style={{ cursor: 'pointer' }}>
                                                            {address}
                                                        </div>
                                                        <div className='row justify-content-center mt-2'>
                                                            <button onClick={() => copyToClipboard(address)} className="btn btn-primary">
                                                                Copiar Endereço
                                                            </button>
                                                        </div>
                                                    </div>
                                                }

                                                {/* Alerta de sucesso/erro */}
                                                {showAlert &&
                                                    <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }} class="form-group col-md-12">
                                                        {alertMessage}
                                                    </div>
                                                }
                                            </>




                                            <div class="form-group col-md-12">
                                                <div class="input-group">
                                                    <div class="input-group">
                                                        <span class="input-group-text" style={{ color: '#FFC107' }}>
                                                            {t('Valor')}</span>
                                                        <input
                                                            type="text"
                                                            id="input-example"
                                                            name="input-name"
                                                            autoComplete="off"
                                                            value={initValue}
                                                            className="form-control text-right"
                                                            placeholder={t("Application_ValorDeposito")}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/,/g, '.').replace(/[^\d.]/g, '');
                                                                const formattedValue = parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                                                setInitValue(isNaN(formattedValue) ? value : formattedValue);
                                                                disabledButton(address, value); // Atualiza o botão com base no novo valor
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                            </div>


                                            <div class={"form-group col-md-12"} >

                                                {/* <h3><strong className='text-primary'>{currencyTrade}</strong> {t('Application_viaRede')} <span className='text-primary'>{initRede}. </span> </h3> */}
                                                {/* <h3 className='text-primary'>USD <CurrencyFormat value={initValue} decimalScale={7} displayType={'text'} thousandSeparator={true} /> </h3> */}
                                                {/* <p >Válido apenas para depósito em {currencyTrade} da rede . Se você depositar incorretamente, te custará taxas altas e imenso tempo pela recuperação de ativos. Você até poderá perder seus ativos permanentemente pelo erro.</p> */}
                                            </div>

                                            {
                                                showQRCode ? (
                                                    <>
                                                        <div class={"form-group col-md-12"} >
                                                            <div class="alert alert-success">Pedido efetuado com sucesso!</div>
                                                            <h3>Pedido Nº {idPedido}</h3>
                                                            <Link to={`/deposit-detail/${idPedido}`} className="btn btn-primary mt-4">
                                                                {t("Application_IrParaPedidos")} <i className="fa fa-qrcode"></i>
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Button variant="primary mt-4" type="submit" disabled={initValue <= 9.99}>
                                                        {t("Application_ConfirmarDeposito")} <i className="fa fa-thumbs-up"></i>
                                                    </Button>
                                                )
                                            }




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