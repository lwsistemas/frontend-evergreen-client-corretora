import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import axios from "../../services";
import CurrencyFormat from "react-currency-format";
import Moment from 'react-moment';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { User } from "../store/User/User.action";
import BottomBar from '../layout/sidebar/bottom-bar';
import { Loader } from "./home/components/loader";


function CircularProgressBar({ value }) {
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

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const max = 1000;
  const whiteValue = max - value;
  const strokeDashoffset = (whiteValue / max) * circumference;
  const color = getColorForValue(value);

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
}

function ContractStats({ title, totalContracts, idStatus, setFilterStatus, statusData }) {

  const statusColors = {
    "A Vencer": "info",
    "Pago": "success",
    "Vencido": "danger",
    "Parcialmente Pago": "info"
  };

  const color = statusColors[title];
  const dataLength = statusData ? statusData.length : 0;
  const percentage = (dataLength / totalContracts) * 100;
  const status = idStatus

  return (
    <div className="col-md-3 invoices-stats-unpaid">
      <div className="row">
        <div className="col-md-8 stats-status">

          <h5 className="bold no-margin">{title}</h5>

        </div>
        <div className="col-md-4 text-right bold stats-numbers">{dataLength} / {totalContracts}</div>
        <div className="col-md-12">
          <div className="progress no-margin">
            <div
              className={`progress-bar progress-bar-${color}`}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${percentage}%` }}
              data-percent={percentage.toFixed(2)}
            >
              {percentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractTable({ data, filterStatus }) {
  const dataatual = new Date();
  const formattedDate = dataatual.toISOString().slice(0, 19).replace('T', ' ');
  const [showModal, setShowModal] = useState(false);
  const [selectedContractIndex, setSelectedContractIndex] = useState(0);
  const [modalContractInfo, setModalContractInfo] = useState({
    codeUnico: '',
    ParcelaValor: 0,
  });

  const handleOpenModal = (index) => {
    const selectedContract = data[index]; // Suponha que 'data' seja sua lista de contratos
    setModalContractInfo({
      codeUnico: selectedContract.codeUnico,
      ParcelaValor: selectedContract.ParcelaValor,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log(dataatual);
  // Certifique-se de que data é uma matriz
  if (!Array.isArray(data)) {
    data = [];
  }

  return (
    <div className='table-responsive'>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Data de Criação</th>
            <th>Código Único</th>
            <th>Status</th>
            <th>Valor USD</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contract, index) => {
            if (!filterStatus || contract.status === filterStatus) {
              return (
                <tr key={index}>
                  <td>{contract.codeUnico}</td>
                  <td>
                    <Moment format="DD/MM/YYYY - HH:mm">{contract.createdAt}</Moment>
                  </td>
                  <td>{contract.codeUnico}</td>
                  <td>
                    {contract.DataVencimento < formattedDate ? (
                      <>
                        <span className="badge badge-danger">Vencido</span>
                        <i className="fa fa-barcode m-1" onClick={() => handleOpenModal(index)}></i>
                      </>
                    ) : (
                      <>
                        <span
                          className={`badge badge-${getBadgeClass(contract.status)}`}
                          onClick={() => {
                            if (contract.status != 0) {
                              handleOpenModal(index);
                            }
                          }}
                        >
                          {getStatusText(contract.status)}
                        </span>

                        {contract.status === 0 && formattedDate <= contract.DataVencimento && (
                          <i className="fa fa-barcode m-1" onClick={() => handleOpenModal(index)}></i>
                        )}
                      </>
                    )}

                    <Modal show={showModal} onHide={handleCloseModal} centered>
                      <Modal.Header closeButton className="bg-dark">
                        <Modal.Title>Informações de Pagamento</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="bg-dark">
                        <p>Código Único: {modalContractInfo.codeUnico}</p>
                        <p>Valor da Parcela: {modalContractInfo.ParcelaValor}</p>
                        {/* Outras informações do contrato aqui */}
                      </Modal.Body>
                      <Modal.Footer className="bg-dark">
                        <Button variant="outline-primary" onClick={handleCloseModal}>
                          Fechar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                  <td>${contract.ParcelaValor.toFixed(2)}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{contract.DataVencimento}</Moment>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

function getBadgeClass(status) {

  switch (status) {
    case 0:
      return 'info';
    case 1:
      return 'success';
    case 2:
      return 'danger';
    case 3:
      return 'warning';
    default:
      return 'secondary';
  }
}

function getStatusText(status) {
  switch (status) {
    case 0:
      return 'A Vencer';
    case 1:
      return 'Pago';
    case 2:
      return 'Vencido';
    case 3:
      return 'Parcialmente Pago';
    default:
      return 'Desconhecido';
  }
}

function Mercados() {
  const user = useSelector(state => state.user);
  const { t } = useTranslation();
  const parametros = useParams();
  const dispatch = useDispatch();
  const [isContratos, setisContrato] = useState([]);
  const [isPayouts, setPayouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(0);
  const [EmprestimoData, setEmprestimoData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [totalPago, setTotalPago] = useState(0);
  const [totalAVencer, setTotalAVencer] = useState(0);



  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  console.log(filterStatus)



  const getUserData = async () => {
    try {
      const response = await axios.post('/user/view/', { authKey: user.authKey, id: user.id });
      setUserData(response.data);
      return response.data;
    } catch (err) {
      return err.response;
    }
  };

  const codUnico = parseInt(parametros.id, 10); // Converte parametros.id para um número inteiro.

  const getUniqueLoan = async () => {
    try {
      const response = await axios.post('/emprestimos/code/', {
        authKey: user.authKey,
        id: user.id,
        code: codUnico
      });
      setEmprestimoData(response.data);

      return response.data;
    } catch (err) {
      return err.response;
    }
  };


  const getDataPayouts = async () => {
    try {
      const response = await axios.post('/emprestimos/payouts/', {
        authKey: user.authKey,
        codUnico: codUnico
      });

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

      const filteredContratos = {
        naoPago: response.data.emprestimosDoUsuario.filter(contrato => contrato.status === 0),
        pago: response.data.emprestimosDoUsuario.filter(contrato => contrato.status === 1),
        vencido: response.data.emprestimosDoUsuario.filter(contrato => contrato.status === 2 || contrato.DataVencimento < formattedDate),
        parcialmentePago: response.data.emprestimosDoUsuario.filter(contrato => contrato.status === 3)
      };

      setisContrato(filteredContratos);
      setPayouts(response.data.emprestimosDoUsuario)


      setTotalPago(response.data.ganhoSumP)
      setTotalAVencer(response.data.ganhoSum)



      return response.data;
    } catch (err) {
      return err.response;
    }
  };


  const validUser = async () => {
    try {
      const valid = await axios.put("user/validUser", {
        authKey: user.authKey,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status && error.response.status === 406) {
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
    setIsLoading(true);
    await validUser();
    await getUserData();
    await getDataPayouts();
    await getUniqueLoan()

    // Inicialize as variáveis com 0
    let totalPagoValue = 0;
    let totalAVencerValue = 0;

    // Verifique se isContratos.pago e isContratos.naoPago são arrays válidos antes de usar reduce
    if (isContratos.pago && Array.isArray(isContratos.pago)) {
      totalPagoValue = isContratos.pago.reduce((acc, contrato) => acc + contrato.ParcelaValor, 0);
      setTotalPago(totalPagoValue);
    }

    if (isContratos.naoPago && Array.isArray(isContratos.naoPago)) {
      totalAVencerValue = isContratos.naoPago.reduce((acc, contrato) => acc + contrato.ParcelaValor, 0);
      setTotalAVencer(totalAVencerValue);
    }

    setIsLoading(false);
  }, []);

  const totalContracts =
    (isContratos.naoPago ? isContratos.naoPago.length : 0) +
    (isContratos.pago ? isContratos.pago.length : 0) +
    (isContratos.vencido ? isContratos.vencido.length : 0) +
    (isContratos.parcialmentePago ? isContratos.parcialmentePago.length : 0);

  return (
    <>
      <Header2 title={t('Application_Emprestimos')} />
      <Sidebar selectedItem="loan" />

      {isLoading ? (
        <Loader />
      ) : (


        <div className="content-body">
          <div className="container">
            <div className="card sub-menu">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col-md-9 d-flex align-items-center">
                    <div id="text" className="col-md-6">
                      <h2>{t('Application_Contrato')}{' - '}{parametros.id}</h2>
                      <small>{t('Application_DetalhesPagamentos')} {' '} {parametros.id}</small>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: 'orange' }}>
                        {t('Application_ValorContrato')}{' '}<CurrencyFormat
                          value={EmprestimoData.valor}
                          displayType={'text'}
                          decimalSeparator={'.'}
                          thousandSeparator={','}
                          decimalScale={6}
                          prefix={'USD '}

                        />
                      </div>
                      <div>{t("Application_Data")}{' '}<Moment format='DD/MM/YY : HH:mm'>{EmprestimoData.createdAt}</Moment></div>
                      <div className='text-success'>Total Pago ${totalPago.toFixed(2)}</div>
                      <div style={{ color: '#17a2b8' }}>Total a vencer ${totalAVencer.toFixed(2)}</div>
                    </div>
                  </div>
                  <div id="margem" className='col-md-2 text-right' style={{ fontSize: '18px' }}>
                    <div>{t('Application_MargemEmprestimo')}{' '}</div>
                    <div style={{
                      background: 'linear-gradient(to bottom, orange, white, black)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      fontSize: '28px',
                      fontWeight: 600,
                      color: 'orange'
                    }}>
                      ${userData.ValorEmprestimoLiberado.toFixed(2)}
                    </div>

                  </div>
                  <div id="score" className='col-md-1'>
                    <CircularProgressBar value={userData.Score} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card sub-menu">
              <div className="card-body">
                <div className="">
                  <div className='row'>
                    <div className="col-md-11 row">
                      <ContractStats title="A Vencer" idStatus="0" statusData={isContratos.naoPago} totalContracts={totalContracts} />
                      <ContractStats title="Pago" idStatus="1" statusData={isContratos.pago} totalContracts={totalContracts} />
                      <ContractStats title="Vencido" idStatus="2" statusData={isContratos.vencido} totalContracts={totalContracts} />
                      <ContractStats title="Parcialmente Pago" idStatus="3" statusData={isContratos.parcialmentePago} totalContracts={totalContracts} />
                    </div>

                    <div className="col-md-1 mt-3">
                      <select
                        className="form-control"
                        onChange={handleFilterChange}
                        value={filterStatus || ''}
                      >
                        <option value="">Filtrar por Status</option>
                        <option value="0">A Vencer</option>
                        <option value="1">Pago</option>
                        <option value="2">Vencido</option>
                        <option value="3">Parcialmente Pago</option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="card sub-menu">
              <div className="card-body">
                <ContractTable data={isPayouts} filterStatus={parseInt(filterStatus)} />
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomBar selectedIcon="markets" />
    </>
  );
}

export default Mercados;
