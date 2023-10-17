import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../store/User/User.action';
import axios from '../../services';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import BottomBar from '../layout/sidebar/bottom-bar';
import CurrencyFormat from 'react-currency-format';
import bitcoinIcon from '../../images/profile/btc.png';
import { Loader } from './home/components/loader';
import AddFormEmprestimo from './bank/AddFormEmprestimo'

function CircularProgressBar({ value }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const max = 1000;
    const whiteValue = max - value; // Calcula a diferença para a parte branca
    const strokeDashoffset = (whiteValue / max) * circumference; // Calcula o deslocamento da parte branca
    const color = getColorForValue(value);

    function getColorForValue(value) {
        if (value >= 0 && value < 300) {
            return 'red';
        } else if (value >= 300 && value < 500) {
            return 'orange';
        } else if (value >= 500 && value < 800) {
            return 'blue';
        } else {
            return 'green';
        }
    }

    return (
        <svg width="100" height="100">
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#ccc"
                strokeWidth="9"
            />
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
            />
            <text
                x="50"
                y="50"
                textAnchor="middle"
                dy="-5"
                fontSize="12"
                fill="#fff"
                fontWeight="500"
            >
                SCORE
            </text>
            <text
                x="50"
                y="70"
                textAnchor="middle"
                dy="-9"
                fontSize="14"
                fill="#fff"
                fontWeight="500"
            >
                {value}
            </text>
        </svg>
    );
}


function Emprestimos() {
    const user = useSelector(state => state.user);
    const { t } = useTranslation();
    const parametros = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(0);
    const [progress, setProgress] = useState(0);
    const [FormEmprestimo, setFormEmprestimo] = useState(false)
    const [ValorParcela, setValorParcela] = useState(0);


    const getUserData = async () => {
        try {
            const response = await axios.post('/user/view/', { authKey: user.authKey, id: user.id });
            setUserData(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    };

    const validateUser = async () => {
        try {
            const response = await axios.put('user/validUser', { authKey: user.authKey });
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status === 406) {
                    console.log('Usuário inválido');
                    dispatch(User(null));
                } else {
                    console.log('Erro inesperado');
                }
            } else {
                console.log('Erro inesperado 404');
            }
        }
    };

    const handleAdd = (e) => {
        setFormEmprestimo(false);
    
        if (e === 'FormEmprestimo') {
          setFormEmprestimo(true);
    
          // Rolar para a seção "emprestimo"
          const emprestimoSection = document.getElementById('emprestimo');
          if (emprestimoSection) {
            emprestimoSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            await validateUser();
            await getUserData();
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Simule um aumento de progresso ao longo do tempo
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 1);
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [progress]);

    // const emprestimo = userData.ValorEmprestimoLiberado;
    // const taxaJurosMensal = 0.013;
    // const numeroParcelas = 6;

    // const valorParcela = emprestimo / Math.pow(1 + taxaJurosMensal, numeroParcelas);


    useEffect(() => {
        // Simule um aumento de progresso ao longo do tempo
        const interval = setInterval(() => {
          if (progress < 100) {
            setProgress(progress + 1);
          } else {
            clearInterval(interval);
          }
        }, 50);
    
        return () => {
          clearInterval(interval);
        };
      }, [progress]);
    
      useEffect(() => {
        // Cálculo do valor da parcela
        let emprestimo = userData.ValorEmprestimoLiberado;
        let taxaJurosMensal = userData.TaxaJuros / 100;
        let numeroParcelas = userData.Qtdparcelas;
    
        if (!isNaN(taxaJurosMensal) && !isNaN(emprestimo) && !isNaN(numeroParcelas) && taxaJurosMensal > 0) {
          const valorParcela =
            emprestimo * (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, numeroParcelas)) / (Math.pow(1 + taxaJurosMensal, numeroParcelas) - 1);
    
          setValorParcela(valorParcela);
        } else {
          const valorParcela = emprestimo / numeroParcelas;
          setValorParcela(valorParcela);
        }
      }, [userData.ValorEmprestimoLiberado, userData.TaxaJuros, userData.Qtdparcelas]);
    


    return (
        <>
            <Header2 title={t('Application_Emprestimos')} />
            <Sidebar selectedItem="markets" />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="content-body">
                    <div className="container">

                        <div className="card sub-menu">
                            <div className="card-body">
                                <div className='row m-2'>
                                    <div className="col-md-9 d-flex align-items-center">
                                        <div id="text" className="col-md-9">
                                            <h2>{t('Application_Emprestimos')}</h2>
                                        </div>
                                    </div>

                                    <div id="margem" className='col-md-2 text-right' style={{ fontSize: '18px' }}>
                                        <div>{t('Application_MargemEmprestimo')}{' '}</div>
                                        <CurrencyFormat
                                            value={userData.ValorEmprestimoLiberado}
                                            displayType={'text'}
                                            decimalSeparator={'.'}
                                            thousandSeparator={''}
                                            decimalScale={2}
                                            prefix={'$ '} // Aqui você pode alterar o prefixo para "R$ " se estiver trabalhando com reais
                                            style={{ fontSize: '22px', fontWeight: 600, color: 'orange' }}
                                        />



                                    </div>
                                    <div id="score" className='col-md-1'>
                                        <CircularProgressBar value={userData.Score} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card sub-menu">
                            <div className="card-body">
                                <div>
                                    <div className="flex-row" role="group" style={{ display: 'flex', float: 'right' }}>
                                        <button className="btn btn-outline-primary m-1" onClick={() => handleAdd('FormEmprestimo')}>
                                            {t('Application_SolicitarEmprestimo')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '50px' }}></div>
                        <div className="clearfix" style={{ display: !FormEmprestimo ? "none" : "block" }} id="emprestimo">
                            <div className="card sub-menu">
                                <div className="card-body">

                                    <AddFormEmprestimo valorParaAddPix={userData.ValorEmprestimoLiberado} QtdParcelas={userData.Qtdparcelas} taxaJuros={userData.TaxaJuros} />
                                </div>
                            </div>
                        </div>
                        <div className="card sub-menu">
                            <div className="card-body text-justify">
                                <h4>Sua margem para solicitação de empréstimo é de até <CurrencyFormat
                                    value={userData.ValorEmprestimoLiberado}
                                    displayType={'text'}
                                    decimalSeparator={'.'}
                                    thousandSeparator={''}
                                    decimalScale={2}
                                    prefix={'$ '} // Aqui você pode alterar o prefixo para "R$ " se estiver trabalhando com reais
                                    style={{color:'#FF9800'}}
                                /> USD {' '}
                                    e você poderá efetuar o pagamento em no máximo {userData.Qtdparcelas}x de <CurrencyFormat
                                        value={ValorParcela}
                                        displayType={'text'}
                                        decimalSeparator={'.'}
                                        thousandSeparator={''}
                                        decimalScale={2}
                                        prefix={'$ '} // Aqui você pode alterar o prefixo para "R$ " se estiver trabalhando com reais
                                        style={{ color: '#FF9800' }}
                                    /></h4>

                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    );
}

export default Emprestimos;
