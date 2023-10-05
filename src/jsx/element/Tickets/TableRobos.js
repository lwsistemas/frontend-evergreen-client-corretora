import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "../../../services";
import index from "react-select";
import Moment from "react-moment";
import bitcoinIcon from "../../../images/profile/btc.png";
import globalConfig from "../../jsonConfig/globalConfig.json";
import { Dialog } from '@mui/material';
import { Button } from 'react-bootstrap';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

function TableTickets() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [Tickets, setTickets] = useState([]);
  const [prices, setPrices] = useState([]);
  const [messageModel, setMessageModel] = useState("")
  const [messageBalance, setMessageBalance] = useState("")
  const [messageToken, setMessageToken] = useState("")
  const [isDialogOpen, setDialogOpen] = useState(false)

  const getTickets = async () => {
    try {
      const Tickets = (
        await axios.get(`/marketinvestment/robos/user/${user.id}`)
      ).data;
      setTickets(Tickets.reverse());
      return Tickets;
    } catch (err) {
      return err.response;
    }
  };

  const getPrices = async () => {
    const prices = (await axios.get(`/price/prices`)).data;
    setPrices(prices);
    return prices;
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    window.location.href = '/robos';
  };

  useEffect(async () => {
    await getTickets();
    await getPrices();
  }, []);



  useEffect(() => { }, [isDialogOpen]);

  return Tickets.map((data) => {
    const matchingPrice = prices.find(
      (price) => price.code === data.moedaSimbolo
    );
    const coinImage = matchingPrice ? matchingPrice.img : "";
    const estado = data.statusStr
    return (




      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">

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
                />
              </span>
              <div
                className="flex-md-grow-2"
                style={{
                  marginLeft: "5px",
                  fontSize: "20px",
                }}
              >
                <div>{data.moedaSimbolo}/USD</div>
                <div style={{ fontSize: "12px", color: "#cfcfcf" }}>
                  {data.hashTransaction}
                </div>
                <div style={{ fontSize: "12px" }}>
                  {" "}

                  
                  criado em:&nbsp;
                  <Moment format={"DD/MM/YYYY - HH:mm"}>
                    {data.createdAt}
                  </Moment>

                  {(() => {
                    if (estado == 0) {
                      return (
                        <span className="badge badge-info">
                          {t("Application_Ativos")}
                        </span>
                      );
                    } else if (estado == 1) {
                      return (
                        <span className="badge badge-success">
                          {t("Application_Aguardando")}
                        </span>
                      );
                    } else if (estado == 2) {
                      return (
                        <span className="badge badge-warning">
                          {t("Application_Finalizado")}
                        </span>
                      );
                    } else if (estado == 3) {
                    } else {
                      return (
                        <span className="badge badge-info">
                          {t("Application_Outros")}
                        </span>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h4>
              {t("Application_Investimento")}{" "}
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(data.valor)}
            </h4>
            <h5>
              {t("Application_Lucros")}{" "}
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(data.ganho)}
            </h5>
            <h5>
              {(() => {
                if (data.disponivel == null) {
                  return (
                    <span>
                      {t("Application_Disponivel")}{" "}
                      {Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "USD",
                      }).format(0.0)}
                    </span>
                  );
                } else {
                  return (
                    <span>
                      {t("Application_Disponivel")}{" "}
                      {Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.disponivel)}
                    </span>
                  );
                }
              })()}
            </h5>
            <div style={{ float: "right", margin: "10px 10px 10px 10px" }}>
              <Link
                class="btn btn-outline-success btn-xxs m-1"
                to={`/robo/contract/${data.hashTransaction}/${data.id}`}
              >
                {t("Application_Visualizar")}&nbsp;<i className="fa fa-eye"></i>{" "}
              </Link>

              {(() => {
                if (estado == 0) {
                  return (
                    <Link
                      class="btn btn-outline-danger btn-xxs"
                      to={`/robo/stop/${data.hashTransaction}/${data.id}`}
                    >
                      {t("Application_stop")}&nbsp;<i className="fa fa-stop"></i>{" "}
                    </Link>
                  );
                } else {
                  return (
                    <span className="text-danger">
                      {/* <Link
                        class="btn btn-danger btn-xxs"

                      >
                        {t("Application_stop")}&nbsp;<i className="fa fa-stop"></i>{" "}
                      </Link> */}
                    </span>
                  );
                }
              })()}



            </div>


          </div>
        </div>

      </div>


    );
  });
}
export default TableTickets;
