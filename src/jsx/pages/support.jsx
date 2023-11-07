import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Nav, Tab, Navbar, NavDropdown } from "react-bootstrap";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from "../layout/sidebar/sidebar";
import axios from "../../services";
import { useTranslation } from "react-i18next";
import ButtonsTickets from "../element/ButtonsTickets";
import Table from "react-bootstrap/Table";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";
import Tickets from "../element/Tickets/TableTickets";
import { User } from '../store/User/User.action'
import BottomBar from "../layout/sidebar/bottom-bar";

function Contratos() {
  const { t } = useTranslation();
  const dispatch = useDispatch()

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
  }, [])

  const [prices, setPrices] = useState([]);
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header2 title={t("Application_Tickets")} />
    

      <div class="content-body">
        <div class="container-fluid">
          <div>
            <ButtonsTickets />
          </div>

          <div class={"row"}>
  
            <div className={"col-md-12"}>
              <div className="card">
                <div class={"card-body"}>
                  <PerfectScrollbar>
                    <div className="card-body">
                      <div className="table-responsive">
                        <Table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Ticket</th>
                              <th>{t("Application_Usuario")}</th>
                              <th>{t("Application_Data")}</th>
                              <th>{t("Application_Assunto")}</th>
                              <th>{t("Application_Status")}</th>
                              <th className={"text-right align-items-right"}>
                                {t("Application_Acoes")}
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <Tickets />
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
     
    </>
  );
}

export default Contratos;
