import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Nav, Tab } from "react-bootstrap";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from "../layout/sidebar/sidebar";
import axios from "../../services";
import { useTranslation } from "react-i18next";
import ButtonsTickets from "../element/ButtonsContratos";
import Table from "react-bootstrap/Table";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";
import HistContratos from "../element/contracts/TableContracts";
import ButtonsMarkets from "../element/ButtonsMarkets";
import { User } from '../store/User/User.action'
import BottomBar from "../layout/sidebar/bottom-bar";
import { Loader } from "./home/components/loader";



function Contratos() {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  const getPrices = async () => {
    try {
      const prices = (await axios.get(`/price`)).data;
      setPrices(prices.reverse());
      return prices;
    } catch (err) {
      return err.message;
    }
  };

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
    setIsLoading(true)
    await validUser()
    await getPrices();
    setIsLoading(false)
  }, []);

  return (
    <>
      <Header2 title={t("Application_Seuscontratos")} />
      
      <div class="content-body">
        <div class="container-fluid h-100">
          <div style={{ paddingBottom: "15px;" }}>
            <ButtonsMarkets />
          </div>
          <div class={"row mt-3"}>

            {isLoading ? (
              <Loader />
            ) : (
              <div className={"col-md-12"}>
                <div className="card">
                  <div class={"card-body"}>
                    <PerfectScrollbar>
                      <div className="card-body">
                        <div className="table-responsive">
                          <Table className="table table-hover">
                            <thead>
                              <tr>
                                <th></th>
                                <th>{t("Application_Usuario")}</th>
                                <th>{t("Application_Data")}</th>
                                <th>{t("Application_Valor")}</th>
                                <th>{t("Application_Assinatura")}</th>
                                <th>{t("")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <HistContratos />
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomBar selectedIcon="markets" />

    </>
  );
}

export default Contratos;
