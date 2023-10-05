import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "../../../services";
import Moment from "react-moment";

function TableContracts() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [Contracts, setContracts] = useState([]);

  const getContracts = async () => {
    try {
      const Contracts = await axios.put(`/contract/all`, {
        authKey: user.authKey,
      });
      setContracts(Contracts.data.reverse());
      return Contracts;
    } catch (err) {
      return err.response;
    }
  };

  useEffect(async () => {
    await getContracts();
  }, []);

  function Botao(dados, id) {
    if (dados == 1) {
      return (
        <Link className={"btn btn-success btn-sm"} to={"/contrato/id/" + id} target="_blank" style={{width: "91px", marginRight: "8px"}} >
          <i className={"fa fa-check"}></i>
        </Link>
      );
    } else {
      return (
        <Link className={"btn btn-primary btn-sm"} to={"/contrato/id/" + id} target="_blank" style={{width: "91px", marginRight: "8px"}}>
          {t("Application_Assinatura")} <i className="fa fa-pencil-square"></i>
        </Link>
      );
    }
  }

  function BotaoRobo(dados, id) {
    return (
      <Link className={"btn btn-warning btn-sm"} to={"/robo/contract/" + id}>
        <i className={"fa fa-android"}></i>
      </Link>
    );
  }

  function BotaoRoboStop(dados, id) {
    return (
      <button
        className={"btn btn-danger btn-sm"}
        to={"#"}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Hello world!"
      >
        <i className={"fa fa-stop"}></i>
      </button>
    );
  }

  const display = Contracts.map((data) => (
    <tr>
      <td>{data.id}</td>
      <td>{user.firstName + " " + user.secondName}</td>
      <td>
        <Moment format="DD/MM/YYYY">{data.dataInicial}</Moment>
      </td>
      <td>
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "symbol",
        }).format(data.contract_value)}
      </td>
      <td>{data.signed == 1 ? "Confirmado" : "Não Confirmado"} </td>
      <td className="d-flex" gap="8px">
        {Botao(data.signed, data.hash)} {BotaoRoboStop(data.signed, data.hash)}
      </td>
    </tr>
  ));

  return display;
}

export default TableContracts;
