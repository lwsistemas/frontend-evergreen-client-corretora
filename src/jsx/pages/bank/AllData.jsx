import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CurrencyFormat from "react-currency-format";
import axios from "../../../services/index";
import { Tab, Nav } from "react-bootstrap";
import Moment from "react-moment";
import PerfectScrollbar from "react-perfect-scrollbar";
const currencies = [];
currencies[0] = "BRL";
currencies[1] = "BTC";
currencies[2] = "LTC";
currencies[825] = "USD";
currencies[1027] = "ETH";
currencies[12345] = "IDSUEX";

function AllData({ refresh, historyBank, historyPix }) {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Tab.Container defaultActiveKey="open-position" size="sm">
          <div class="card">
            <div class="card-header">
              <Nav variant="pills">
                <Nav.Link eventKey="open-position">Bancos</Nav.Link>
              </Nav>
            </div>
            <PerfectScrollbar>
              <div class="card-body open-position-table">
                <div class="market-history market-order">
                  <Tab.Content>
                    <Tab.Pane eventKey="open-position">
                      <div class="table-responsive">
                        <table class="table table-striped" id="tbUser">
                          <thead>
                            <tr>
                              <th scope="col">{t("Bank")}</th>
                              <th scope="col">{t("Agency")}</th>
                              <th scope="col">{t("Account number")}</th>
                              <th scope="col">{t("Digit")}</th>
                              <th scope="col">{t("Type of account")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {historyBank.map((account) => (
                              <tr>
                                <td>{account.bank}</td>
                                <td>{account.agency}</td>
                                <td>{account.account}</td>
                                <td>{account.digit} </td>
                                <td>{account.accountType}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </Tab.Container>
        <Tab.Container defaultActiveKey="open-position" size="sm">
          <div class="card">
            <div class="card-header">
              <Nav variant="pills">
                <Nav.Link eventKey="open-position">Pix</Nav.Link>
              </Nav>
            </div>
            <PerfectScrollbar>
              <div class="card-body open-position-table">
                <div class="market-history market-order">
                  <Tab.Content>
                    <Tab.Pane eventKey="open-position">
                      <div class="table-responsive">
                        <table class="table table-striped" id="tbUser">
                          <thead>
                            <tr>
                              <th scope="col">{t("Name")}</th>
                              <th scope="col">{t("Type")}</th>
                              <th scope="col">{t("Pix Key")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {historyPix.map((pix) => (
                              <tr>
                                <td>{pix.name}</td>
                                <td>{pix.typePix}</td>
                                <td>{pix.pix}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </Tab.Container>
      </div>
    </>
  );
}

export default AllData;
