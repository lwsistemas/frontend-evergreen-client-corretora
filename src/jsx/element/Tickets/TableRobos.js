import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "../../../services";
import Moment from "react-moment";
import Pagination from 'react-bootstrap/Pagination';
import moment from 'moment-timezone';
import { orange } from "@mui/material/colors";

function TicketCard({ data, prices, stocks, t }) {
  let coinImage;
  const matchingPrice = prices.find((price) => price.code === data.moedaSimbolo);
  coinImage = matchingPrice ? matchingPrice.img : "";
  
  // Verifica se TipoCoin é igual a 1 e busca a imagem em stocks
  if (data.TipoCoin === 1) {
    const matchingStock = stocks.find((stock) => stock.ticker === data.moedaSimbolo);
    coinImage = matchingStock ? matchingStock.img : "";
  }

  const estado = data.statusStr;

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={data.id}>
      <div className="card">
        <div className="card-header">
          <div className="d-flex flex-lg-row flex-column w-100">
            <span>
              <img
                src={coinImage}
                style={{
                  width: "25px",
                  height: "25px",
                  margin: "10px",
                }}
                alt={data.moedaSimbolo}
              />
            </span>
            <div className="flex-md-grow-2" style={{ marginLeft: "5px", fontSize: "20px" }}>
              <div>{data.moedaSimbolo}/USD</div>
              <div style={{ fontSize: "12px", color: "#cfcfcf" }}>{data.hashTransaction}</div>
              <div style={{ fontSize: "12px" }}>
                criado em:&nbsp;{moment(data.createdAt).tz('America/Sao_Paulo').format('DD/MM/YY - HH:mm:ss')} {" "}
                <span className={`badge badge-${estado === 0 ? 'info' : (estado === 1 ? 'success' : 'warning')}`}>
                  {estado === 0 ? t("Application_Ativos") : (estado === 1 ? t("Application_Aguardando") : t("Application_Finalizado"))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h4>{t("Application_Investimento")} ${parseFloat(data.valor).toFixed(2)}</h4>
          <h5>{t("Application_Lucros")} ${parseFloat(data.ganho).toFixed(2)}</h5>
          <h5>
            {t("Application_Disponivel")}{" "}
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
            }).format(data.disponivel || 0.0)}
          </h5>
          <div style={{ float: "right", margin: "10px 10px 10px 10px" }}>
            <Link
              className="btn btn-outline-success btn-xxs m-1"
              to={`/robo/contract/${data.hashTransaction}/${data.id}`}
            >
              {t("Application_Visualizar")}&nbsp;<i className="fa fa-eye"></i>{" "}
            </Link>

            <Link class="btn btn-outline-primary  btn-xxs m-2"
              to={`/withdrawal-report-boot/${data.hashTransaction}/${data.id}`}>
              {t('Application_RelatorioSaqueRobo')}&nbsp;<i className="fa fa-history"></i> </Link>

            {estado === 0 && (
              <Link
                className="btn btn-outline-danger btn-xxs"
                to={`/robo/stop/${data.hashTransaction}/${data.id}`}
              >
                {t("Application_stop")}&nbsp;<i className="fa fa-stop"></i>{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



function TableTickets() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [prices, setPrices] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao alterar o filtro
  };

  const somaValores = tickets.reduce((acumulador, item) => {
    // Adiciona a condição para somar apenas quando statusStr é igual a 0
    if (item.statusStr === 0) {
      return acumulador + item.valor;
    } else {
      return acumulador;
    }
  }, 0);



  const getTickets = async () => {
    try {
      const response = await axios.post(`/marketinvestment/robos/user`, { authKey: user.authKey });
      setTickets(response.data.reverse());
      return response.data;
    } catch (err) {
      console.error(err);
      return err.response;
    }
  };

  const getPrices = async () => {
    try {
      const response = await axios.get(`/price/prices`);
      setPrices(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return err.response;
    }
  };

  const getPricesStocks = async () => {
    try {
      const response = await axios.get(`/price/Stocks`);
      setStocks(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return err.response;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTickets();
      await getPrices();
      await getPricesStocks();
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTickets = tickets
    .filter((ticket) => {
      if (filtro === "ativos") {
        return ticket.statusStr === 0;
      } else if (filtro === "naoativos") {
        return ticket.statusStr === 1 || ticket.statusStr === 2;
      }
      return true;
    })
    .slice(startIndex, endIndex);

  return (
    <>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body text-primary ' style={{ fontSize: "28px", float: "right", height: "102px", display: "flex", alignItems: "center" }}>
            {t("Application_SaldoAtivos")} --{Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(somaValores)}
          </div>

        </div>
      </div>


      <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">
            <label htmlFor="filtroSelect" className="form-label">Filtrar por:</label>
            <select
              id="filtroSelect"
              className="form-control"
              value={filtro}
              onChange={handleFiltroChange}
            >
              <option value="todos">{t('Application_Todos')}</option>
              <option value="ativos">{t('Application_Ativos')}</option>
              <option value="naoativos">{t("Application_Finalizado")}</option>
            </select>
          </div>
        </div>

      </div>

      {displayedTickets.map((data) => (
        <TicketCard key={data.id} data={data} prices={prices} stocks={stocks} t={t} />
      ))}

      <div className="col-md-12">
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {Array.from({ length: Math.ceil(tickets.length / itemsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= tickets.length}
          />
        </Pagination>
      </div>
    </>
  );
}

export default TableTickets;
