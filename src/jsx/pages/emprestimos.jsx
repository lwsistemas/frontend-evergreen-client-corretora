import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../store/User/User.action';
import axios from '../../services';
import Header2 from "../pages/home/HeaderMenu";
import HeaderMegaMenu from '../layout/headerMegaMenu';
import Sidebar from '../layout/sidebar/sidebar';
import BottomBar from '../layout/sidebar/bottom-bar';
import CurrencyFormat from 'react-currency-format';
import Moment from 'react-moment';
import { Loader } from './home/components/loader';
import AddFormEmprestimo from './bank/AddFormEmprestimo';
import SliderStickBotoes from '../element/dashboard/sliderStickersBotoes';
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SavingsIcon from '@mui/icons-material/Savings';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});



function Emprestimos() {
    const user = useSelector((state) => state.user);
    const { t } = useTranslation();
    const parametros = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(0);
    const [progress, setProgress] = useState(0);
    const [FormEmprestimo, setFormEmprestimo] = useState(false);
    const [ValorParcela, setValorParcela] = useState(0);
    const [isContratos, setisContrato] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const navigateTo = (url) => {
        history.push(url);
    };

    const handleChamaUrl = (id, urlType) => {
        switch (urlType) {
            case 'payout':
                navigateTo(`/emprestimos/payout/${id}`);
                break;
            case 'history':
                navigateTo(`/emprestimos/history/${id}`);
                break;
            case 'detailsContract':
                navigateTo(`/emprestimos/detailsContract/${id}`);
                break;
            default:
                // Lida com outros tipos de URL, se necessário
                break;
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDataEmprestimos = async () => {
        try {
            const response = await axios.post('/emprestimos/all/', { authKey: user.authKey, id: user.id });

            if (isContratos.status == 'inexistente') {
                setisContrato(response.data);

            } else {
                setisContrato(response.data);
                console.log(isContratos)
                return response.data;

            }

            return response.data;

        } catch (err) {

            return err.response;
        }
    };

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
            await getDataEmprestimos();
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
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
        let emprestimo = userData.ValorEmprestimoLiberado;
        let taxaJurosMensal = userData.TaxaJuros / 100;
        let numeroParcelas = userData.Qtdparcelas;

        if (!isNaN(taxaJurosMensal) && !isNaN(emprestimo) && !isNaN(numeroParcelas) && taxaJurosMensal > 0) {
            const valorParcela = (emprestimo * (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, numeroParcelas))) / (Math.pow(1 + taxaJurosMensal, numeroParcelas) - 1);

            setValorParcela(valorParcela);
        } else {
            const valorParcela = emprestimo / numeroParcelas;
            setValorParcela(valorParcela);
        }
    }, [userData.ValorEmprestimoLiberado, userData.TaxaJuros, userData.Qtdparcelas]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(isContratos.length / itemsPerPage);
    let displayedEmprestimos = []
    let endIndex = 0

    if (isContratos && isContratos.tipo === 'success' && isContratos.status === 'inexistente') {
        // Não há dados, então defina endIndex e displayedEmprestimos como vazios
        endIndex = startIndex;
        displayedEmprestimos = [];
    } else {
        // Dados válidos, defina o endIndex e calcule displayedEmprestimos
        endIndex = startIndex + itemsPerPage;
        displayedEmprestimos = isContratos.slice(startIndex, endIndex);
    }

    const CircularProgressBar = ({ value }) => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const max = 1000;
        const whiteValue = max - value;
        const strokeDashoffset = (whiteValue / max) * circumference;

        const getColorForValue = (value) => {
            if (value >= 0 && value < 300) {
                return 'red';
            } else if (value >= 300 && value < 500) {
                return 'orange';
            } else if (value >= 500 && value < 800) {
                return 'blue';
            } else {
                return 'green';
            }
        };

        const color = getColorForValue(value);

        useEffect(() => {
            const disableZoom = (event) => {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            };

            document.addEventListener('touchmove', disableZoom, { passive: false });

            return () => {
                document.removeEventListener('touchmove', disableZoom);
            };
        }, []);

        return (
            <svg width="100" height="100">
                <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#ccc" strokeWidth="9" />
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
                <text x="50" y="50" textAnchor="middle" dy="-5" fontSize="12" fill="#fff" fontWeight="500">
                    SCORE
                </text>
                <text x="50" y="70" textAnchor="middle" dy="-9" fontSize="14" fill="#fff" fontWeight="500">
                    {value}
                </text>
            </svg>
        );
    };

    function StatusTimeline({ status }) {
        const getStatusText = (status) => {
            switch (status) {
                case 0:
                    return t('Application_AguardandoEmprestimo');
                case 1:
                    return t("Application_Aprovado");
                case 2:
                    return t("Application_Liberado");
                case 3:
                    return t("Application_Cancelado");
                case 4:
                    return t("Application_NaoAprovado");
                default:
                    return "Desconhecido";
            }
        };

        function getStatusStyles(status) {
            switch (status) {
                case 0:
                    return { badgeColor: "warning" };
                case 1:
                    return { badgeColor: "info" };
                case 2:
                    return { badgeColor: "success" };
                case 3:
                    return { badgeColor: "danger" };
                case 4:
                    return { badgeColor: "danger" };

                default:
                    return { badgeColor: "light" };
            }
        }


        return (
            <div className="status-timeline">
                {status !== 3 && status !== 4 && [0, 1, 2].map((index) => (
                    <div key={index} className={`timeline-item ${status >= index ? "active" : ""}`}>
                        <span className={`status-badge ${status >= index ? `active ${status === index ? "find" : ""} ${getStatusStyles(index).badgeColor}` : "inactive"}`}>
                            &nbsp;
                        </span>
                        <span className={`status-description ${status === index ? "active-description" : status >= index ? "text-primary" : ""}`}>
                            {getStatusText(index)}
                        </span>
                    </div>
                ))}

                {status === 3 && (
                    <div className={`timeline-item active`}>
                        <span className={`status-badge active find danger`}>
                            &nbsp;
                        </span>
                        <span className="status-description text-danger active-description">
                            {getStatusText(3)}
                        </span>
                    </div>
                )}
                {status === 4 && (
                    <div className={`timeline-item active`}>
                        <span className={`status-badge active find danger`}>
                            &nbsp;
                        </span>
                        <span className="status-description text-danger active-description">
                            {getStatusText(4)}
                        </span>
                    </div>
                )}
            </div>
        );




    }

    return (
        <>
            <Header2 title={t('Application_Emprestimos')} />
           
            {isLoading ? (
                <Loader />
            ) : (
                <ThemeProvider theme={darkTheme}>
                    <div className="content-body">
                        <div className="container-fluid">
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
                                                prefix={'$ '}
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
                                    <h4 className='text-primary'>

                                        {t("Application_MsgEmprestimo", {
                                            margemEmprestimo: Intl.NumberFormat("en", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(userData.ValorEmprestimoLiberado),
                                            qtdParcel: userData.Qtdparcelas,
                                            ValorParcel: Intl.NumberFormat("en", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(ValorParcela)

                                        })}

                                        {/* Sua margem para solicitação de empréstimo é de até{' '}
                                        <CurrencyFormat
                                            value={userData.ValorEmprestimoLiberado}
                                            displayType={'text'}
                                            decimalSeparator={'.'}
                                            thousandSeparator={''}
                                            decimalScale={2}
                                            prefix={'$ '}
                                            style={{ color: '#FF9800' }}
                                        />{' '}
                                        USD e você poderá efetuar o pagamento em no máximo {userData.Qtdparcelas}x de{' '}
                                        <CurrencyFormat
                                            value={ValorParcela}
                                            displayType={'text'}
                                            decimalSeparator={'.'}
                                            thousandSeparator={''}
                                            decimalScale={2}
                                            prefix={'$ '}
                                            style={{ color: '#FF9800' }}
                                        /> */}
                                    </h4>
                                </div>
                            </div>

                            <div className="card sub-menu">
                                <div className="card-body">
                                    <div className='table-responsive'>
                                        {isContratos && isContratos.tipo === 'success' && isContratos.status === 'inexistente' ? (
                                            <Stack sx={{ width: '100%' }} spacing={1}>
                                                <Alert variant="outlined" severity="info">
                                                    <AlertTitle>{t('Application_informacao')}</AlertTitle>
                                                    {t('Application_DadosInexistentes')}
                                                </Alert>
                                            </Stack>

                                        ) : (
                                            <Table className="table table-hover table-borderless table-striped-columns table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">{t('Application_ContratoN')}</th>
                                                        <th className="text-left">{t('Application_Valor')}</th>
                                                        <th className="text-left">{t('Application_QtdParcelas')}</th>
                                                        <th className="text-center">{t('Application_Status')}</th>
                                                        <th className="text-left">{t('Application_Data')}</th>
                                                        <th className="text-left hide-mobile hide-mobile d-none d-sm-table-cell">{t('Application_Hash')}</th>
                                                        <th>
                                                            {t('Application_Opcoes')}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {displayedEmprestimos.map((data) => (
                                                        <tr key={data.codeUnico}>
                                                            <td className="text-left"><strong>{data.codeUnico}</strong></td>
                                                            <td className="text-left">
                                                                <strong>{Intl.NumberFormat("en", {
                                                                    style: "currency",
                                                                    currency: "USD",
                                                                }).format(data.valor)}
                                                                    {/* {Intl.NumberFormat("en-IN", {
                                                                    maximumSignificantDigits: 4,
                                                                    decimalScale:2
                                                                }).format(data.valor)} */}
                                                                </strong>
                                                            </td>
                                                            <td className="text-left">
                                                                <strong>
                                                                    {data.parcelas}x {Intl.NumberFormat("en-IN", {
                                                                        maximumSignificantDigits: 4,
                                                                    }).format(parseFloat(data.valor / data.parcelas))}
                                                                </strong></td>
                                                            <td className="text-left" style={{ width: "15%" }}>
                                                                <StatusTimeline status={data.status} />

                                                            </td>
                                                            <td className="text-left">
                                                                <Moment format="DD/MM/YYYY - HH:mm">
                                                                    {data.createdAt}
                                                                </Moment>
                                                            </td>
                                                            <td className="text-left hide-mobile hide-mobile d-none d-sm-table-cell">{data.hash}</td>
                                                            <td>
                                                                <div>

                                                                    <Button
                                                                        id="basic-button"
                                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={open ? 'true' : undefined}
                                                                        onClick={() => handleChamaUrl(data.codeUnico, 'payout')}
                                                                    >
                                                                        <SavingsIcon />
                                                                    </Button>
                                                                    {/* <Menu
                                                                        id="basic-menu"
                                                                        anchorEl={anchorEl}
                                                                        open={open}
                                                                        onClose={handleClose}
                                                                        MenuListProps={{
                                                                            'aria-labelledby': 'basic-button',
                                                                        }}
                                                                    >
                                                                        
                                                                        <MenuItem onClick={() => handleChamaUrl(data.codeUnico, 'payout')}>Pagamentos {data.hash}</MenuItem>
                                                                        <MenuItem onClick={() => handleChamaUrl(data.codeUnico, 'history')}>Histórico</MenuItem>
                                                                        <MenuItem onClick={() => handleChamaUrl(data.codeUnico, 'detailsContract')}>Detalhes do contrato</MenuItem>
                                                                    </Menu> */}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}

                                    </div>
                                </div>
                            </div>
                            {totalPages > 1 && (
                                <div className="card sub-menu">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className='btn btn-outline-primary'
                                                    >
                                                        Anterior
                                                    </button>
                                                    {[...Array(totalPages)].map((_, i) => (
                                                        <button
                                                            key={i}
                                                            className={currentPage === i + 1 ? 'active btn btn-outline-primary' : 'btn btn-outline-primary'}
                                                            onClick={() => handlePageChange(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        className='btn btn-outline-primary'
                                                    >
                                                        Próximo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemeProvider>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    );
}

export default Emprestimos;
